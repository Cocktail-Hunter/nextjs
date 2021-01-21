import { FC, useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Check from "../../assets/Icons/Check";
import Cross from "../../assets/Icons/Cross";
import { IIngredient, ESector } from "../../interfaces";
import AddIngredient from "./AddIngredient";

import "./Ingredients.scss";

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
  const history = useHistory();

  const [ selected, setSelected ] = useState("Select ingredient");
  const [ selectedID, setSelectedID ] = useState<number | null>(null);
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
        const req = await fetch(`${process.env.REACT_APP_API}/v1/ingredients/?state=approved&public=${sector}`, body);

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

  const handleSector = useCallback(() => {
    const selectedSector: ESector = (
      sector === ESector.PUBLIC ? ESector.PRIVATE : ESector.PUBLIC
    );

    setSector(selectedSector);
  }, [sector, setSector]);

  const select = useCallback((ingredient: IIngredient) => {
    setSelected(ingredient.name);
    setSelectedID(ingredient.id);
  }, []);

  const clear = useCallback(() => {
    setSelected("Select ingredient");
    setSelectedID(null);
  }, []);

  return (
    <div className="ingredients">
      <h4>Add a new ingredient</h4>
      {warn && <p>{warn}</p>}
      <div className="showPrivateOnly">
        <div
          className={`checkbox checked-${sector === ESector.PRIVATE}`}
          onClick={handleSector}
        >
          <Check/>
        </div>
        <p>Show private ingredients only</p>
      </div>
      <div className="selectIngredient">
        <div className="ingredientsListWrapper">
          <div className="ingredientsList">
            {ingredientsList.map((ingredient, i) => (
              <div
                key={i}
                className={`ingredient${ingredient.id === selectedID ? " active" : ""}`}
                onClick={() => select(ingredient)}
              >
                <p>{ingredient.name}</p>
              </div>
            ))}
            {ingredientsList.length === 0 && (
              <p className="empty">No ingredients</p>
            )}
          </div>
        </div>
        <div className={`selected ${!!selectedID}`}>
          <p>{selected}</p>
          {!!selectedID && (
            <div className="unselect" onClick={clear}>
              <Cross/>
            </div>
          )}
        </div>
        <AddIngredient clear={clear} selectedID={selectedID} setInventory={setInventory}/>
      </div>
    </div>
  );
}

export default Ingredients;
