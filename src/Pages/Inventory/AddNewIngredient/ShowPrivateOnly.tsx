import { FC, useCallback, useContext } from "react";
import Check from "../../../assets/Icons/Check";
import { InventoryContext, InventoryContextProps } from "../../../Contexts/Inventory";
import { ESector } from "../../../interfaces";

const ShowPrivateOnly: FC = () => {
  const {ingredientSector, setIngredientSector} = useContext(InventoryContext) as InventoryContextProps;

  const handleSector = useCallback(() => {
    const selectedSector: ESector = (
      ingredientSector === ESector.PUBLIC ? ESector.PRIVATE : ESector.PUBLIC
    );

    setIngredientSector(selectedSector);
  }, [ingredientSector, setIngredientSector]);

  return (
    <div className="showPrivateOnly">
      <div
        className={`checkbox checked-${ingredientSector === ESector.PRIVATE}`}
        onClick={handleSector}
      >
        <Check/>
      </div>
      <p>Show private ingredients only</p>
    </div>
  );
}

export default ShowPrivateOnly;
