import React, { useState } from "react";
import { ESector, ICocktail, IIngredient } from "../../interfaces";
import Cocktails from "./Cocktails/Index";
import AddNewIngredient from "./AddNewIngredient/Index";
import InventoryIngredients from "./InventoryIngredients";
import { InventoryContext } from "../../Contexts/Inventory";

import "./Index.scss";

function Inventory() {
  const [ingredientSector, setIngredientSector] = useState<ESector>(ESector.PUBLIC);
  const [cocktailSector, setCocktailSector] = useState<ESector>(ESector.PUBLIC);
  const [ingredientsList, setIngredientsList] = useState<Array<IIngredient>>([]);
  const [cocktailsList, setCocktailsList] = useState<Array<ICocktail>>([]);
  const [inventory, setInventory] = useState<Array<IIngredient>>([]);

  const initialValues = {
    ingredientSector, setIngredientSector,
    cocktailSector, setCocktailSector,
    ingredientsList, setIngredientsList,
    inventory, setInventory,
    cocktailsList, setCocktailsList
  };

  return (
    <InventoryContext.Provider value={initialValues}>
      <div className="page inventory">
        <section className="inventorySection">
          <h1>You have <span className="highlight">{inventory.length}</span> ingredients</h1>
          <AddNewIngredient/>
          <InventoryIngredients/>
        </section>
        {/* <div className="separator"/> */}
        <section>
          <h1>Cocktails you can make</h1>
          <Cocktails/>
        </section>
      </div>
    </InventoryContext.Provider>
  );
}

export default Inventory;
