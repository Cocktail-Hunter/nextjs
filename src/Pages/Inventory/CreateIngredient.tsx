import { useCallback, useState } from "react";
import { useHistory } from "react-router-dom";
import { Ingredient } from "../../interfaces";

function CreateIngredient() {
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

        if (req.status === 200) {
          const payload = await req.json() as Array<Ingredient>;
          console.log("PAYLOAD", payload)
          return;
        }

        const payload = await req.json();
        setWarn(JSON.stringify(payload));
      } catch (e) {
        setWarn(`Internal error: ${JSON.stringify(e)}`);
      }
    })();
  }, [history, isPublic, name]);

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
