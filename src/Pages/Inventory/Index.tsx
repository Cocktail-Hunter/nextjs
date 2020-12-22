import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Ingredient, InventoryPayload } from "../../interfaces";
import CreateIngredient from "./CreateIngredient";
import Ingredients from "./Ingredients";

function Inventory() {
  const history = useHistory();

  const [ ingredientsList, setIngredientsList ] = useState<Array<Ingredient>>([]);
  const [inventory, setInventory] = useState<Array<Ingredient>>([]);
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
          const redirect = encodeURIComponent("/inventory");
          history.push(`/refresh?redirect=${redirect}`);
          return;
        }

        if (req.status === 200) {
          const payload = await req.json() as InventoryPayload;
          setInventory(payload.inventory);
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
        <h3>Inventory ({inventory.length})</h3>
        <Ingredients list={ingredientsList} setList={setIngredientsList}/>
        <h4>What you have currently:</h4>
        {warnIngredients && <p>{warnIngredients}</p>}
        {inventory.length === 0 && <p>Your inventory is empty, time to stock up!</p>}
        {inventory.map(ingredient => (
          <p>{ingredient.name}</p>
        ))}
      </section>
      <section>
        <h3>Cocktails you can make</h3>
      </section>
      <section>
        <h3>Create Ingredient</h3>
        <CreateIngredient setList={setIngredientsList}/>
      </section>
    </div>
  );
}

export default Inventory;
