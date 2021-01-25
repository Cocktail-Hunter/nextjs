import React, { FC, useCallback, useContext } from "react";
import { useHistory } from "react-router-dom";
import Delete from "../../../assets/Icons/Trash";
import { InventoryContext, InventoryContextProps } from "../../../Contexts/Inventory";
import { IIngredient, IInventoryPayload } from "../../../interfaces";

interface Props {
  data: IIngredient,
  setWarn: React.Dispatch<React.SetStateAction<string>>,
  editMode: boolean
};

const InventoryIngredient: FC<Props> = (
  {data, setWarn, editMode}
) => {
  const {ingredientsList, setIngredientsList, setInventory} = useContext(InventoryContext) as InventoryContextProps;

  const history = useHistory();

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
      const req = await fetch(`${process.env.REACT_APP_API}/v1/user/inventory/`, body);

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
  }, [history, ingredientsList, setIngredientsList, setInventory, setWarn]);

  return (
    <div className="ingredient">
      {data.name}
      {editMode && (
        <div className="delete" onClick={() => removeIngredient(data.id)}>
          <Delete/>
        </div>
      )}
    </div>
  );
}

export default InventoryIngredient;
