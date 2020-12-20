import { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Ingredient, Sector } from "../../interfaces";

function Ingredients() {
  const history = useHistory();

  const [ sector, setSector ] = useState<Sector>(Sector.PUBLIC);

  const [ ingredientsList, setIngredientsList ] = useState<Array<Ingredient>>([]);
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
        const req = await fetch(`/v1/ingredients?state=approved&sector=${sector}`, body);

        if (req.status === 401) {
          const { pathname, search } = history.location;
          const redirect = encodeURIComponent(pathname + search);

          history.push(`/refresh?redirect=${redirect}`);
          return;
        }

        if (req.status === 200) {
          const payload = await req.json() as Array<Ingredient>;
          setIngredientsList(payload);
          return;
        }

        const payload = await req.json();
        setWarn(JSON.stringify(payload));
      } catch (e) {
        setWarn(`Internal error: ${JSON.stringify(e)}`);
      }
    })();
  }, [history, sector]);

  const handleSector = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSector(e.target.id as Sector);
  }, []);

  return (
    <div className="ingredients">
      <h4>Add ingredient to inventory</h4>
      {warn && <p>{warn}</p>}
      <div>
        <input type="radio" id={Sector.PUBLIC} onChange={handleSector} checked={sector === Sector.PUBLIC}/>
        <label htmlFor={Sector.PUBLIC}>Show public ingredients</label>
      </div>
      <div>
        <input type="radio" id={Sector.PRIVATE} onChange={handleSector} checked={sector === Sector.PRIVATE}/>
        <label htmlFor={Sector.PRIVATE}>Show private ingredients</label>
      </div>
      <select>
        <option>Select ingredient</option>
        {ingredientsList.map((ingredient, i) => (
          <option key={i} value={ingredient.id}>{ingredient.name}</option>
        ))}
      </select>
      <button>Add to inventory</button>
    </div>
  );
}

export default Ingredients;
