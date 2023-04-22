import { useState } from "react";
import { AiOutlineMinus } from "react-icons/ai";
import { AiOutlinePlus } from "react-icons/ai";
import { useUpdateSightingsMutation } from "../store";
import Button from "./Button";

function Sightings({ bird }) {
  const [sightings, setSightings] = useState(parseInt(bird.number));
  const [updateSightings, { isLoading: isUpdating }] =
    useUpdateSightingsMutation();

  const handleMinusSightings = () => {
    setSightings(sightings - 1);
    updateSightings({ bird, sightings: String(sightings) });
  };

  const handleAddSightings = () => {
    setSightings(sightings + 1);
    updateSightings({ bird, sightings: String(sightings) });
  };

  return (
    <div>
      <Button symbol onClick={handleMinusSightings}>
        <AiOutlineMinus />
      </Button>
      {sightings}
      <Button symbol onClick={handleAddSightings}>
        <AiOutlinePlus />
      </Button>
    </div>
  );
}
export default Sightings;
