import { RxCross2 } from "react-icons/rx";
import { useRemoveBirdMutation } from "../store";
import Panel from "./Panel";

function Bird({ bird }) {
  const [removeBird, results] = useRemoveBirdMutation();

  const handleRemoveBird = () => {
    removeBird(bird);
  };
  return (
    <>
      <Panel data-testid="bird" key={bird.id}>
        <button onClick={handleRemoveBird}>
          <RxCross2 />
        </button>
        <h4>{bird.name}</h4>
        <h4>{bird.number}</h4>
      </Panel>
    </>
  );
}
export default Bird;
