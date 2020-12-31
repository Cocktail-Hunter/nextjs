import { FC, useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { IIngredient, ESector, ICocktail } from "../../interfaces";

interface Props {
  sector: ESector,
  setSector: React.Dispatch<React.SetStateAction<ESector>>,
  ingredientsList: IIngredient[],
  setIngredientsList: React.Dispatch<React.SetStateAction<IIngredient[]>>,
  cocktailsList: ICocktail[],
  setCocktailsList: React.Dispatch<React.SetStateAction<ICocktail[]>>,
  inventory: IIngredient[],
  setInventory: React.Dispatch<React.SetStateAction<IIngredient[]>>
};

const Cocktails: FC<Props> = (
  {sector, setSector, cocktailsList, setCocktailsList, inventory}
) => {
  const history = useHistory();

  // TODO: flexibility input

  // TODO: convert to onlyAlcoholic, onlyNonAlcoholic -> optional else both
  const [ alcoholic, setAlcoholic ] = useState(false);
  const [ warn, setWarn ] = useState("");

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");

    const IDs: Array<number> = inventory.map(ingredient => ingredient.id);

    if (IDs.length === 0) return;

    (async () => {
      const body: RequestInit = {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${accessToken}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ingredients: IDs,
          flexibility: 0,
          alcohol: alcoholic
        })
      };

      try {
        const req = await fetch(`${process.env.REACT_APP_API}/v1/cocktails/?state=approved&public=${sector}`, body);

        if (req.status === 401) {
          const { pathname, search } = history.location;
          const redirect = encodeURIComponent(pathname + search);

          history.push(`/refresh?redirect=${redirect}`);
          return;
        }

        if (req.status === 200) {
          const payload = await req.json() as Array<ICocktail>;
          const inventoryIDS = inventory.map(({id}) => id);

          console.log("PAYLOAD", payload)

          // hide ingredients already in inventory.
          const filtered = payload.filter(ingredient => (
            !inventoryIDS.includes(ingredient.id)
          ));

          setCocktailsList(filtered);
          return;
        }

        const payload = await req.json();
        setWarn(JSON.stringify(payload));
      } catch (e) {
        setWarn(`Internal error: ${JSON.stringify(e)}`);
      }
    })();
  }, [alcoholic, history, inventory, sector, setCocktailsList]);

  const handleSector = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSector(e.target.id as ESector);
  }, [setSector]);

  return (
    <div className="cocktails">
      {warn && <p>{warn}</p>}
      <div>
        <input type="radio" id={ESector.PUBLIC} onChange={handleSector} checked={sector === ESector.PUBLIC}/>
        <label htmlFor={ESector.PUBLIC}>Show public cocktails</label>
      </div>
      <div>
        <input type="radio" id={ESector.PRIVATE} onChange={handleSector} checked={sector === ESector.PRIVATE}/>
        <label htmlFor={ESector.PRIVATE}>Show private cocktails</label>
      </div>
      <div>
        <input type="checkbox" id="alcohol" onChange={e => setAlcoholic(e.target.checked)} checked={alcoholic}/>
        <label htmlFor="alcohol">Alcoholic</label>
      </div>
      <p>Showing {cocktailsList.length} cocktails:</p>
      <div className="list">
        {cocktailsList.map((cocktail, i) => (
          <div key={i} className="cocktail">
            <img src={cocktail.picture} alt="cocktail_picture"/>
            <p>{cocktail.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Cocktails;
