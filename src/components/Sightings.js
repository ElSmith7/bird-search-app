import { AiOutlineMinus } from "react-icons/ai";
import { AiOutlinePlus } from "react-icons/ai";
import { useUpdateSightingsMutation } from "../store";
import Button from "./Button";

function Sightings({ bird }) {
  const [updateSightings, { isLoading: isUpdating }] =
    useUpdateSightingsMutation();

  const handleMinusSightings = () => {
    const sightings = String(Math.max(1, parseInt(bird.number) - 1));
    updateSightings({ bird, sightings });
  };

  const handleAddSightings = () => {
    const sightings = String(parseInt(bird.number) + 1);
    updateSightings({ bird, sightings });
  };

  return (
    <div>
      <Button symbol onClick={handleMinusSightings}>
        <AiOutlineMinus />
      </Button>
      <span
        className="inline-flex mx-1 text-lg md:mx-3 md:text-2xl"
        data-testid={bird.number}
      >
        {bird.number}
      </span>
      <Button symbol onClick={handleAddSightings}>
        <AiOutlinePlus />
      </Button>
    </div>
  );
}
export default Sightings;
