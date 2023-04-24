import { RxCross2 } from "react-icons/rx";
import { useRemoveBirdMutation } from "../store";
import Panel from "./Panel";
import Button from "./Button";
import Sightings from "./Sightings";
import BirdImg from "./BirdImg";

function Bird({ bird }) {
  const [removeBird, removeBirdResults] = useRemoveBirdMutation();

  const handleRemoveBird = () => {
    removeBird(bird);
  };
  return (
    <>
      <Panel primary data-testid="bird" key={bird.id}>
        <Button
          onClick={handleRemoveBird}
          remove
          loading={removeBirdResults.isLoading}
        >
          <RxCross2 />
        </Button>
        <h4>{bird.name}</h4>
        <Sightings bird={bird} />
        <BirdImg name={bird.name} />
      </Panel>
    </>
  );
}
export default Bird;
