import React, { FC, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { IIngredient, IInventoryPayload } from "../../interfaces";
import InventoryIngredient from "./InventoryIngredient";

import "./Index.scss";

interface Props {
  ingredientsList: Array<IIngredient>,
  setIngredientsList: React.Dispatch<React.SetStateAction<IIngredient[]>>,
  inventory: IIngredient[],
  setInventory: React.Dispatch<React.SetStateAction<IIngredient[]>>,
};

const InventoryIngredients: FC<Props> = (
  { ingredientsList, setIngredientsList, inventory, setInventory }
) => {
  const history = useHistory();

  const [warnIngredients, setWarnIngredients] = useState("");

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
        setWarnIngredients(JSON.stringify(payload));
      } catch (e) {
        setWarnIngredients(`Internal error: ${JSON.stringify(e)}`);
      }
    })();
  }, [history, setInventory]);

  return (
    <div className="inventoryIngredients">
      <h3>Your inventory</h3>
      {warnIngredients && <p>{warnIngredients}</p>}
      {inventory.length === 0 && <p>Your inventory is empty, time to stock up!</p>}
      <div className="inventoryList">
        {inventory.map((ingredient, i) => (
          <InventoryIngredient
            key={i}
            data={ingredient}
            ingredientsList={ingredientsList}
            setIngredientsList={setIngredientsList}
            setInventory={setInventory}
          />
        ))}
      </div>
    </div>
  );
}

export default InventoryIngredients;
