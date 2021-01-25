import { FC, useCallback, useContext } from "react";
import Check from "../../../assets/Icons/Check";
import { InventoryContext, InventoryContextProps } from "../../../Contexts/Inventory";
import { ESector } from "../../../interfaces";

const ShowPrivateOnly: FC = () => {
  const {cocktailSector, setCocktailSector} = useContext(InventoryContext) as InventoryContextProps;

  const handleSector = useCallback(() => {
    const selectedSector: ESector = (
      cocktailSector === ESector.PUBLIC ? ESector.PRIVATE : ESector.PUBLIC
    );

    setCocktailSector(selectedSector);
  }, [cocktailSector, setCocktailSector]);

  return (
    <div className="showPrivateOnly">
      <div
        className={`checkbox checked-${cocktailSector === ESector.PRIVATE}`}
        onClick={handleSector}
      >
        <Check/>
      </div>
      <p>Show private cocktails only</p>
    </div>
  );
}

export default ShowPrivateOnly;
