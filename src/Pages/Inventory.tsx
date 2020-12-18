import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Ingredient, InventoryPayload } from "../interfaces";

function Inventory() {
  const history = useHistory();

  const [ingredients, setIngredients] = useState<Array<Ingredient>>([]);
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
        const req = await fetch("/v1/user/inventory", body);

        if (req.status === 401) {
          const { pathname, search } = history.location;
          const redirect = encodeURIComponent(pathname + search);

          history.push(`/refresh?redirect=${redirect}`);
          return;
        }

        if (req.status === 200) {
          const payload = await req.json() as InventoryPayload;
          setIngredients(payload.inventory);
          return;
        }

        const payload = await req.json();
        setWarnIngredients(JSON.stringify(payload));
      } catch (e) {
        setWarnIngredients(`Internal error: ${JSON.stringify(e)}`);
      }
    })();
  }, [history]);

  return (
    <div className="page inventory">
      <h1>Cocktail Hunter</h1>
      <p>Find cocktails you can make based on your inventory.</p>
      <h2>Inventory</h2>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
        </ul>
      </nav>
      <section>
        <h3>Inventory</h3>
        {warnIngredients && <p>{warnIngredients}</p>}
        {ingredients.length === 0 && <p>Your inventory is currently empty, time to stock up!</p>}
        {ingredients.map(ingredient => (
          <p>{ingredient.name}</p>
        ))}
      </section>
      <section>
        <h3>Cocktails you can make</h3>
      </section>
    </div>
  );
}

export default Inventory;
