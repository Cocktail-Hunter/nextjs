import { FC, useState } from "react";
import { EAlcoholic } from "../../../interfaces";
import CocktailList from "./CocktailList";
import Filters from "./Filters";
import Flexibility from "./Flexibility";
import ShowPrivateOnly from "./ShowPrivateOnly";

const Cocktails: FC = () => {
  const [ alcoholic, setAlcoholic ] = useState<EAlcoholic>(EAlcoholic.BOTH);
  const [ flexibility, setFlexibility ] = useState(0);
  const [ warn, setWarn ] = useState("");

  return (
    <div className="cocktails">
      <Flexibility flexibility={flexibility} setFlexibility={setFlexibility}/>
      <Filters alcoholic={alcoholic} setAlcoholic={setAlcoholic}/>
      <ShowPrivateOnly/>
      {warn && <p>{warn}</p>}
      <CocktailList
        alcoholic={alcoholic}
        flexibility={flexibility}
        setWarn={setWarn}
      />
    </div>
  );
}

export default Cocktails;
