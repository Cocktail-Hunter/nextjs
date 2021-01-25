import { FC, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { InventoryContext, InventoryContextProps } from "../../../Contexts/Inventory";
import { ICocktail, EAlcoholic } from "../../../interfaces";

interface Props {
  alcoholic: EAlcoholic,
  flexibility: number,
  setWarn: React.Dispatch<React.SetStateAction<string>>
}

const CocktailList: FC<Props> = ({
  alcoholic, flexibility, setWarn
}) => {
  const {cocktailSector, inventory, cocktailsList, setCocktailsList} = useContext(InventoryContext) as InventoryContextProps;

  const history = useHistory();

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
          flexibility,
          alcohol: alcoholic
        })
      };

      try {
        const req = await fetch(`${process.env.REACT_APP_API}/v1/cocktails/?state=approved&public=${cocktailSector}`, body);

        if (req.status === 401) {
          const { pathname, search } = history.location;
          const redirect = encodeURIComponent(pathname + search);

          history.push(`/refresh?redirect=${redirect}`);
          return;
        }

        if (req.status === 200) {
          const payload = await req.json() as Array<ICocktail>;
          setCocktailsList(payload);

          return;
        }

        const payload = await req.json();
        setWarn(JSON.stringify(payload));
      } catch (e) {
        setWarn(`Internal error: ${JSON.stringify(e)}`);
      }
    })();
  }, [alcoholic, cocktailSector, flexibility, history, inventory, setCocktailsList, setWarn]);

  return (
    <div className="cocktailListWrapper">
      <div className="cocktailList">
        {cocktailsList.map((cocktail, i) => (
          <div key={i} className="cocktail">
            <img src={cocktail.picture} alt="cocktail_picture"/>
            <p>{cocktail.name}</p>
          </div>
        ))}
      </div>
      {cocktailsList.length === 0 && <p>Empty</p>}
    </div>
  );
}

export default CocktailList;
