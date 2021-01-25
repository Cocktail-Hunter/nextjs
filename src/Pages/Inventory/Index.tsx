import React, { useState } from "react";
import { ESector, ICocktail, IIngredient } from "../../interfaces";
import Cocktails from "./Cocktails";
import AddNewIngredient from "./AddNewIngredient/Index";
import InventoryIngredients from "./InventoryIngredients";
import { InventoryContext } from "../../Contexts/Inventory";

import "./Index.scss";

function Inventory() {
  const [sector, setSector] = useState<ESector>(ESector.PUBLIC);
  const [ingredientsList, setIngredientsList] = useState<Array<IIngredient>>([]);
  const [cocktailsList, setCocktailsList] = useState<Array<ICocktail>>([]);
  const [inventory, setInventory] = useState<Array<IIngredient>>([]);

  return (
    <InventoryContext.Provider value={{sector, setSector, ingredientsList, setIngredientsList, inventory, setInventory}}>
      <div className="page inventory">
        <section className="inventorySection">
          <h1>You have <span className="highlight">{inventory.length}</span> ingredients</h1>
          <AddNewIngredient/>
          <InventoryIngredients/>
        </section>
        {/* <div className="separator"/>
        <section>
          <h1>Cocktails you can make</h1>
          <Cocktails
            cocktailsList={cocktailsList}
            setCocktailsList={setCocktailsList}
            ingredientsList={ingredientsList}
            setIngredientsList={setIngredientsList}
            inventory={inventory}
            setInventory={setInventory}
          />
        </section> */}
      </div>
    </InventoryContext.Provider>
  );
}

export default Inventory;
