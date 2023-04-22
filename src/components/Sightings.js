import { useState } from "react";
import { AiOutlineMinus } from "react-icons/ai";
import { AiOutlinePlus } from "react-icons/ai";
import Button from "./Button";

function Sightings({ number }) {
  const [sightings, setSightings] = useState(number);

  const handleMinusSightings = () => {
    setSightings(sightings - 1);
  };

  const handleAddSightings = () => {
    setSightings(sightings + 1);
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
