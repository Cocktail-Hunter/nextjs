import { FC, useCallback, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { InventoryContext, InventoryContextProps } from "../../../Contexts/Inventory";
import { IIngredient } from "../../../interfaces";

interface Props {
  selectedID: number | null,
  setSelectedID: React.Dispatch<React.SetStateAction<number | null>>,
  setSelected: React.Dispatch<React.SetStateAction<string>>,
  setWarn: React.Dispatch<React.SetStateAction<string>>
};

const IngredientsList: FC<Props> = (
  {setWarn, selectedID, setSelectedID, setSelected}
) => {
  const {inventory, ingredientsList, setIngredientsList, sector} = useContext(InventoryContext) as InventoryContextProps;

  const history = useHistory();

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
  }, [history, inventory, sector, setIngredientsList, setWarn]);

  const select = useCallback((ingredient: IIngredient) => {
    setSelected(ingredient.name);
    setSelectedID(ingredient.id);
  }, [setSelected, setSelectedID]);

  return (
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
  );
}

export default IngredientsList;
