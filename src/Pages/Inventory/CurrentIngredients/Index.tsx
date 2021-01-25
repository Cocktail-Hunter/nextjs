import React, { FC, useContext, useState } from "react";
import Cross from "../../../assets/Icons/Cross";
import Edit from "../../../assets/Icons/Edit";
import { InventoryContext, InventoryContextProps } from "../../../Contexts/Inventory";
import IngredientList from "./IngredientList";

const CurrentIngredients: FC = () => {
  const {inventory} = useContext(InventoryContext) as InventoryContextProps;

  const [warn, setWarn] = useState("");
  const [editMode, setEditMode] = useState(false);

  return (
    <div className="currentIngredients">
      <div className="heading">
        <h3>Your inventory</h3>
        <div className="editModeToggle" onClick={() => setEditMode(state => !state)}>
          {editMode ? <Cross/> : <Edit/>}
          <p>{editMode ? "Cancel" : "Edit"}</p>
        </div>
      </div>
      {warn && <p>{warn}</p>}
      {inventory.length === 0 && <p>Your inventory is empty, time to stock up!</p>}
      <IngredientList setWarn={setWarn} editMode={editMode}/>
    </div>
  );
}

export default CurrentIngredients;
