import React, { FC, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { IInventoryPayload } from "../../../interfaces";
import InventoryIngredient from "./Ingredient";
import { InventoryContext, InventoryContextProps } from "../../../Contexts/Inventory";

interface Props {
  setWarn: React.Dispatch<React.SetStateAction<string>>,
  editMode: boolean
}

const IngredientList: FC<Props> = ({setWarn, editMode}) => {
  const {inventory, setInventory} = useContext(InventoryContext) as InventoryContextProps;

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
        const req = await fetch(`${process.env.REACT_APP_API}/v1/user/inventory/`, body);

        if (req.status === 401) {
          const redirect = encodeURIComponent("/inventory");
          history.push(`/refresh?redirect=${redirect}`);
          return;
        }

        if (req.status === 200) {
          const payload = await req.json() as IInventoryPayload;
          setInventory(payload.inventory);
          return;
        }

        const payload = await req.json();
        setWarn(JSON.stringify(payload));
      } catch (e) {
        setWarn(`Internal error: ${JSON.stringify(e)}`);
      }
    })();
  }, [history, setInventory, setWarn]);

  return (
    <div className="ingredientList">
      {inventory.map((ingredient, i) => (
        <InventoryIngredient
          setWarn={setWarn}
          key={i}
          data={ingredient}
          editMode={editMode}
        />
      ))}
    </div>
  );
}

export default IngredientList;
