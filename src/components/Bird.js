import { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { useRemoveBirdMutation } from "../store";
import Panel from "./Panel";
import Button from "./Button";
import Modal from "./Modal";
import Sightings from "./Sightings";
import BirdImg from "./BirdImg";

function Bird({ bird }) {
  const [removeBird, removeBirdResults] = useRemoveBirdMutation();
  const [showModal, setShowModal] = useState(false);

  const handleRemoveBird = () => {
    setShowModal(true);
  };
  const handleClose = () => {
    setShowModal(false);
  };
  const handleDelete = () => {
    removeBird(bird);
    setShowModal(false);
  };

  const actionBar = (
    <div className="flex justify-between">
      <Button primary onClick={handleClose}>
        Keep
      </Button>

      <Button secondary onClick={handleDelete}>
        Delete
      </Button>
    </div>
  );

  const modal = (
    <Modal actionBar={actionBar} onClose={handleClose}>
      <p>Are you sure you want to delete this bird?</p>
    </Modal>
  );
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
        {showModal && modal}
        <h4>{bird.name}</h4>
        <Sightings bird={bird} />
        <BirdImg name={bird.name} />
      </Panel>
    </>
  );
}
export default Bird;
