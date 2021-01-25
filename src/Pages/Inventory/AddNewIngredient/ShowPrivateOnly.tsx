import { FC, useCallback, useContext } from "react";
import Check from "../../../assets/Icons/Check";
import { InventoryContext, InventoryContextProps } from "../../../Contexts/Inventory";
import { ESector } from "../../../interfaces";

const ShowPrivateOnly: FC = () => {
  const {sector, setSector} = useContext(InventoryContext) as InventoryContextProps;

  const handleSector = useCallback(() => {
    const selectedSector: ESector = (
      sector === ESector.PUBLIC ? ESector.PRIVATE : ESector.PUBLIC
    );

    setSector(selectedSector);
  }, [sector, setSector]);

  return (
    <div className="showPrivateOnly">
      <div
        className={`checkbox checked-${sector === ESector.PRIVATE}`}
        onClick={handleSector}
      >
        <Check/>
      </div>
      <p>Show private ingredients only</p>
    </div>
  );
}

export default ShowPrivateOnly;
