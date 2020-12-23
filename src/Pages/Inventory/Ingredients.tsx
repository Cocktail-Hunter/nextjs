import { FC, useCallback, useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { IIngredient, ESector } from "../../interfaces";
import AddIngredient from "./AddIngredient";

interface Props {
  sector: ESector,
  setSector: React.Dispatch<React.SetStateAction<ESector>>,
  ingredientsList: IIngredient[],
  setIngredientsList: React.Dispatch<React.SetStateAction<IIngredient[]>>,
  inventory: IIngredient[],
  setInventory: React.Dispatch<React.SetStateAction<IIngredient[]>>
};

const Ingredients: FC<Props> = (
  {sector, setSector, ingredientsList, setIngredientsList, inventory, setInventory}
) => {
  const dropdown = useRef<HTMLSelectElement | null>(null);
  const history = useHistory();

  const [ warn, setWarn ] = useState("");

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");

    (async () => {
      const body: RequestInit = {
        headers: {
          "Authorization": `Bearer ${accessToken}`
        }
      };

      try {
        const req = await fetch(`/v1/ingredients?state=approved&public=${sector}`, body);

        if (req.status === 401) {
          const { pathname, search } = history.location;
          const redirect = encodeURIComponent(pathname + search);

          history.push(`/refresh?redirect=${redirect}`);
          return;
        }

        if (req.status === 200) {
          const payload = await req.json() as Array<IIngredient>;
          const inventoryIDS = inventory.map(({id}) => id);

          // hide ingredients already in inventory.
          const filtered = payload.filter(ingredient => (
            !inventoryIDS.includes(ingredient.id)
          ));

          setIngredientsList(filtered);
          return;
        }

        const payload = await req.json();
        setWarn(JSON.stringify(payload));
      } catch (e) {
        setWarn(`Internal error: ${JSON.stringify(e)}`);
      }
    })();
  }, [history, inventory, sector, setIngredientsList]);

  const handleSector = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSector(e.target.id as ESector);
  }, [setSector]);

  return (
    <div className="ingredients">
      <h4>Add ingredient to inventory</h4>
      {warn && <p>{warn}</p>}
      <div>
        <input type="radio" id={ESector.PUBLIC} onChange={handleSector} checked={sector === ESector.PUBLIC}/>
        <label htmlFor={ESector.PUBLIC}>Show public ingredients</label>
      </div>
      <div>
        <input type="radio" id={ESector.PRIVATE} onChange={handleSector} checked={sector === ESector.PRIVATE}/>
        <label htmlFor={ESector.PRIVATE}>Show private ingredients</label>
      </div>
      <p>Showing {ingredientsList.length} ingredients:</p>
      <select ref={dropdown}>
        <option>Select ingredient</option>
        {ingredientsList.map((ingredient, i) => (
          <option key={i} value={ingredient.id}>{ingredient.name}</option>
        ))}
      </select>
      <AddIngredient dropdown={dropdown} setInventory={setInventory}/>
    </div>
  );
}

export default Ingredients;
