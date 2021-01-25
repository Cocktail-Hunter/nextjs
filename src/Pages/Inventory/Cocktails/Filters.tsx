import { FC } from "react";
import Check from "../../../assets/Icons/Check";
import { EAlcoholic } from "../../../interfaces";

interface Props {
  alcoholic: EAlcoholic,
  setAlcoholic: React.Dispatch<React.SetStateAction<EAlcoholic>>
}

const Filters: FC<Props> = ({alcoholic, setAlcoholic}) => (
  <>
    <h4>Filters</h4>
    <div className="filters">
      <div className="filter" onClick={() => setAlcoholic(EAlcoholic.BOTH)}>
        <div
          className={`checkbox checked-${alcoholic === EAlcoholic.BOTH}`}
        >
          <Check/>
        </div>
        <p>Show both with and without alcohol</p>
      </div>
      <div className="filter" onClick={() => setAlcoholic(EAlcoholic.ONLY_NON_ALCOHOLIC)}>
        <div
          className={`checkbox checked-${alcoholic === EAlcoholic.ONLY_NON_ALCOHOLIC}`}
        >
          <Check/>
        </div>
        <p>Show only without alcohol</p>
      </div>
      <div className="filter" onClick={() => setAlcoholic(EAlcoholic.ONLY_ALCOHOLIC)}>
        <div
          className={`checkbox checked-${alcoholic === EAlcoholic.ONLY_ALCOHOLIC}`}
        >
          <Check/>
        </div>
        <p>Show only with alcohol</p>
      </div>
    </div>
  </>
);

export default Filters;
