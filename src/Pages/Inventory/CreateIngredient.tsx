import { FC, useCallback, useState } from "react";
import { useHistory } from "react-router-dom";
import { ESector, IIngredient } from "../../interfaces";

interface Props {
  sector: ESector,
  setIngredientsList: React.Dispatch<React.SetStateAction<IIngredient[]>>
};

const CreateIngredient: FC<Props> = ({sector, setIngredientsList}) => {
  const history = useHistory();

  const [ name, setName ] = useState("");
  const [ isPublic, setIsPublic ] = useState(false);
  const [ warn, setWarn ] = useState("");

  const create = useCallback(() => {
    const accessToken = localStorage.getItem("accessToken");

    if (name.length <= 2) {
      setWarn("Name too short.");
      return;
    }

    (async () => {
      const body: RequestInit = {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${accessToken}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name,
          public: isPublic
        })
      };

      try {
        const req = await fetch(`/v1/ingredients/`, body);

        if (req.status === 401) {
          const { pathname, search } = history.location;
          const redirect = encodeURIComponent(pathname + search);

          history.push(`/refresh?redirect=${redirect}`);
          return;
        }

        if (req.status === 201) {
          const payload = await req.json() as IIngredient;
          const sectorIsTrue = sector === "true";

          /*
            Add new ingredient to list
            if added to the same sector
          */
          if (isPublic === sectorIsTrue) {
            setIngredientsList(state => ([
              ...state,
              payload
            ]));
          }

          setName("");

          return;
        }

        const payload = await req.json();
        setWarn(JSON.stringify(payload));
      } catch (e) {
        setWarn(`Internal error: ${JSON.stringify(e)}`);
      }
    })();
  }, [history, isPublic, name, sector, setIngredientsList]);

  return (
    <div className="createIngredient">
      <div>
        <input type="checkbox" id="public" onChange={e => setIsPublic(e.target.checked)} checked={isPublic}/>
        <label htmlFor="public">Public</label>
      </div>
      <label>
        <p>Name:</p>
        <input value={name} onChange={e => setName(e.target.value)}/>
      </label>
      <button onClick={create}>Create ingredient</button>
      {warn && <p>{warn}</p>}
    </div>
  );
}

export default CreateIngredient;
