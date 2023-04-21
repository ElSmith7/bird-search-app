import { RxCross2 } from "react-icons/rx";
import { useRemoveBirdMutation } from "../store";
import Panel from "./Panel";
import Button from "./Button";

function Bird({ bird }) {
  const [removeBird, removeBirdResults] = useRemoveBirdMutation();

  const handleRemoveBird = () => {
    removeBird(bird);
  };
  return (
    <>
      <Panel secondary data-testid="bird" key={bird.id}>
        <Button
          onClick={handleRemoveBird}
          remove
          loading={removeBirdResults.isLoading}
        >
          <RxCross2 />
        </Button>

        <h4>{bird.name}</h4>
        <h4>{bird.number}</h4>
      </Panel>
    </>
  );
}
export default Bird;
