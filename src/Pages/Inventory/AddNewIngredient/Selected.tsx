import { FC, useCallback } from "react";
import Cross from "../../../assets/Icons/Cross";

interface Props {
  selected: string,
  selectedID: number | null,
  setSelectedID: React.Dispatch<React.SetStateAction<number | null>>,
  setSelected: React.Dispatch<React.SetStateAction<string>>
};

const Ingredients: FC<Props> = (
  {selectedID, selected, setSelected, setSelectedID}
) => {
  const clear = useCallback(() => {
    setSelected("Select ingredient");
    setSelectedID(null);
  }, [setSelected, setSelectedID]);

  return (
    <div className={`selected ${!!selectedID}`}>
      <p>{selected}</p>
      {!!selectedID && (
        <div className="unselect" onClick={clear}>
          <Cross/>
        </div>
      )}
    </div>
  );
}

export default Ingredients;
