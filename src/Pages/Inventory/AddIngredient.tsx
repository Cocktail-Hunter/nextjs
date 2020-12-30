import { FC, useCallback, useState } from "react";
import { useHistory } from "react-router-dom";
import { IIngredient, IInventoryPayload } from "../../interfaces";

interface Props {
  dropdown: React.MutableRefObject<HTMLSelectElement | null>,
  setInventory: React.Dispatch<React.SetStateAction<IIngredient[]>>
};

const AddIngredient: FC<Props> = ({dropdown, setInventory}) => {
  const history = useHistory();

  const [ warn, setWarn ] = useState("");

  const addToInventory = useCallback(() => {
    if (!dropdown.current) return;

    const id = parseInt(dropdown.current.value);

    if (isNaN(id)) return;

    const accessToken = localStorage.getItem("accessToken");

    (async () => {
      const body: RequestInit = {
        method: "PUT",
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

        if (req.status === 200) {
          const payload = await req.json() as IInventoryPayload;

          setInventory(payload.inventory);

          if (dropdown.current) {
            dropdown.current.value = "";
          }

          return;
        }

        const payload = await req.json();
        setWarn(JSON.stringify(payload));
      } catch (e) {
        setWarn(`Internal error: ${JSON.stringify(e)}`);
      }
    })();
  }, [dropdown, history, setInventory]);

  return (
    <>
      <button onClick={addToInventory}>Add to inventory</button>
      {warn && <p>{warn}</p>}
    </>
  );
}

export default AddIngredient;
