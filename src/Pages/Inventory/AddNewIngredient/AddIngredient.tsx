import { FC, useCallback, useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { InventoryContext, InventoryContextProps } from "../../../Contexts/Inventory";
import { IInventoryPayload } from "../../../interfaces";

interface Props {
  clear: () => void,
  selectedID: number | null
};

const AddIngredient: FC<Props> = ({selectedID, clear}) => {
  const {setInventory} = useContext(InventoryContext) as InventoryContextProps;

  const history = useHistory();

  const [ warn, setWarn ] = useState("");

  const addToInventory = useCallback(() => {
    if (!selectedID || isNaN(selectedID)) return;

    const accessToken = localStorage.getItem("accessToken");

    (async () => {
      const body: RequestInit = {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${accessToken}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          id: selectedID
        })
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
          clear();
          return;
        }

        const payload = await req.json();
        setWarn(JSON.stringify(payload));
      } catch (e) {
        setWarn(`Internal error: ${JSON.stringify(e)}`);
      }
    })();
  }, [clear, history, selectedID, setInventory]);

  return (
    <>
      <button className={`disabled-${!selectedID}`} onClick={addToInventory}>Add to inventory</button>
      {warn && <p>{warn}</p>}
    </>
  );
}

export default AddIngredient;
