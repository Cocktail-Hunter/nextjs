import React, { FC, useCallback, useState } from "react";
import { useHistory } from "react-router-dom";
import { IIngredient, IInventoryPayload } from "../../interfaces";

interface Props {
  data: IIngredient,
  ingredientsList: IIngredient[],
  setIngredientsList: React.Dispatch<React.SetStateAction<IIngredient[]>>,
  inventory: IIngredient[],
  setInventory: React.Dispatch<React.SetStateAction<IIngredient[]>>
};

const Ingredient: FC<Props> = (
  {inventory, setInventory, ingredientsList, setIngredientsList, data}
) => {
  const history = useHistory();

  const [warn, setWarn] = useState("");

  const removeIngredient = useCallback(async (id: number) => {
    const accessToken = localStorage.getItem("accessToken");

    const body: RequestInit = {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({id})
    };

    try {
      const req = await fetch(`/v1/user/inventory/`, body);

      if (req.status === 401) {
        const redirect = encodeURIComponent("/inventory");
        history.push(`/refresh?redirect=${redirect}`);
        return;
      }

      if (req.status === 202) {
        const payload = await req.json() as IInventoryPayload;

        const inventoryIDS = payload.inventory.map(({id}) => id);

        // hide ingredients already in inventory.
        const filtered = ingredientsList.filter(ingredient => (
          !inventoryIDS.includes(ingredient.id)
        ));

        setIngredientsList(filtered);
        setInventory(payload.inventory);
        return;
      }

      const payload = await req.json();
      setWarn(JSON.stringify(payload));
    } catch (e) {
      setWarn(`Internal error: ${JSON.stringify(e)}`);
    }
  }, [history, ingredientsList, setIngredientsList, setInventory]);

  return (
    <div className="ingredient">
      <button onClick={() => removeIngredient(data.id)}>Remove</button> {data.name}
      {warn && <p>{warn}</p>}
    </div>
  );
}

export default Ingredient;
