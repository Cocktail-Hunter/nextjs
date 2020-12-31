import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { ESector, ICocktail, IIngredient, IInventoryPayload } from "../../interfaces";
import Cocktails from "./Cocktails";
import CreateIngredient from "./CreateIngredient";
import Ingredient from "./Ingredient";
import Ingredients from "./Ingredients";

function Inventory() {
  const history = useHistory();

  const [ sector, setSector ] = useState<ESector>(ESector.PUBLIC);
  const [ingredientsList, setIngredientsList] = useState<Array<IIngredient>>([]);
  const [cocktailsList, setCocktailsList] = useState<Array<ICocktail>>([]);
  const [inventory, setInventory] = useState<Array<IIngredient>>([]);
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
        console.log("E", e);
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
        <Ingredients
          sector={sector}
          setSector={setSector}
          ingredientsList={ingredientsList}
          setIngredientsList={setIngredientsList}
          inventory={inventory}
          setInventory={setInventory}
        />
        <h4>What you have currently:</h4>
        {warnIngredients && <p>{warnIngredients}</p>}
        {inventory.length === 0 && <p>Your inventory is empty, time to stock up!</p>}
        {inventory.map(ingredient => (
          <Ingredient
            data={ingredient}
            ingredientsList={ingredientsList}
            setIngredientsList={setIngredientsList}
            inventory={inventory}
            setInventory={setInventory}
          />
        ))}
      </section>
      <section>
        <h3>Cocktails you can make</h3>
        <Cocktails
          sector={sector}
          setSector={setSector}
          cocktailsList={cocktailsList}
          setCocktailsList={setCocktailsList}
          ingredientsList={ingredientsList}
          setIngredientsList={setIngredientsList}
          inventory={inventory}
          setInventory={setInventory}
        />
      </section>
      <section>
        <h3>Create Ingredient</h3>
        <CreateIngredient
          sector={sector}
          setIngredientsList={setIngredientsList}
        />
      </section>
    </div>
  );
}

export default Inventory;
