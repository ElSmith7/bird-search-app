import { useState } from "react";
import { AiOutlineMinus } from "react-icons/ai";
import { AiOutlinePlus } from "react-icons/ai";
import { useUpdateSightingsMutation } from "../store";
import { useRemoveBirdMutation } from "../store";
import Modal from "./Modal";
import Button from "./Button";

function Sightings({ bird }) {
  const [showModal, setShowModal] = useState(false);
  const [removeBird, removeBirdResults] = useRemoveBirdMutation();
  const [updateSightings, { isLoading: isUpdating }] =
    useUpdateSightingsMutation();

  const handleMinusSightings = () => {
    if (bird.number === "1") {
      setShowModal(true);
    } else {
      const sightings = String(Math.max(1, parseInt(bird.number) - 1));
      updateSightings({ bird, sightings });
    }
  };

  const handleAddSightings = () => {
    const sightings = String(parseInt(bird.number) + 1);
    updateSightings({ bird, sightings });
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const handleDelete = () => {
    removeBird(bird);
    setShowModal(false);
  };

  const actionBar = (
    <>
      <Button primary onClick={handleClose}>
        Keep
      </Button>

      <Button
        secondary
        loading={removeBirdResults.isLoading}
        onClick={handleDelete}
      >
        Delete
      </Button>
    </>
  );

  const modal = (
    <Modal actionBar={actionBar} onClose={handleClose}>
      <p>Are you sure you want to delete this bird?</p>
    </Modal>
  );
  return (
    <>
      <div>
        <Button
          symbol
          data-testid={`minus-${bird.id}`}
          onClick={handleMinusSightings}
        >
          <AiOutlineMinus />
        </Button>
        <span
          className="inline-flex mx-1 text-lg md:mx-3 md:text-2xl"
          data-testid={bird.number}
        >
          {bird.number}
        </span>
        <Button
          symbol
          data-testid={`plus-${bird.id}`}
          onClick={handleAddSightings}
        >
          <AiOutlinePlus />
        </Button>
      </div>
      {showModal && modal}
    </>
  );
}
export default Sightings;
