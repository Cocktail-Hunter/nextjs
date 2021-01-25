import { FC } from "react";

interface Props {
  flexibility: number,
  setFlexibility: React.Dispatch<React.SetStateAction<number>>
}

const Flexibility: FC<Props> = ({flexibility, setFlexibility}) => (
  <>
    <h4>Flexibility</h4>
    <div className="flexibility">
      <p onClick={() => setFlexibility(0)} className={`${flexibility === 0 ? "active" : ""}`}>0</p>
      <p onClick={() => setFlexibility(1)} className={`${flexibility === 1 ? "active" : ""}`}>1</p>
      <p onClick={() => setFlexibility(2)} className={`${flexibility === 2 ? "active" : ""}`}>2</p>
      <p onClick={() => setFlexibility(3)} className={`${flexibility === 3 ? "active" : ""}`}>3</p>
      <p onClick={() => setFlexibility(4)} className={`${flexibility === 4 ? "active" : ""}`}>4</p>
      <p onClick={() => setFlexibility(5)} className={`${flexibility === 5 ? "active" : ""}`}>5</p>
    </div>
  </>
);

export default Flexibility;
