import { FC, useCallback, useState } from "react";
import AddIngredient from "./AddIngredient";
import ShowPrivateOnly from "./ShowPrivateOnly";
import IngredientsList from "./IngredientsList";
import Selected from "./Selected";

import "./Index.scss";

const Ingredients: FC = () => {
  const [ selected, setSelected ] = useState("Select ingredient");
  const [ selectedID, setSelectedID ] = useState<number | null>(null);
  const [ warn, setWarn ] = useState("");

  const clear = useCallback(() => {
    setSelected("Select ingredient");
    setSelectedID(null);
  }, []);

  return (
    <div className="ingredients">
      <h4>Add a new ingredient</h4>
      {warn && <p>{warn}</p>}
      <ShowPrivateOnly/>
      <div className="selectIngredient">
        <IngredientsList
          setWarn={setWarn}
          selectedID={selectedID}
          setSelected={setSelected}
          setSelectedID={setSelectedID}
        />
        <Selected
          selected={selected}
          selectedID={selectedID}
          setSelected={setSelected}
          setSelectedID={setSelectedID}
        />
        <AddIngredient clear={clear} selectedID={selectedID}/>
      </div>
    </div>
  );
}

export default Ingredients;
