import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { changeName, changeNumber } from "../store";
import { useAddBirdMutation } from "../store";
import Button from "./Button";
import Panel from "./Panel";
import Modal from "./Modal";

function SearchBird() {
  const [addBird, addBirdResults] = useAddBirdMutation();
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();

  const { name, number } = useSelector((state) => {
    return {
      name: state.search.name,
      number: state.search.number,
    };
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    if (name.length && number.length >= 1) {
      addBird({ name, number });

      dispatch(changeName(""));
      dispatch(changeNumber(""));
    } else {
      setShowModal(true);
    }
  };

  const handleNameChange = (event) => {
    dispatch(changeName(event.target.value));
  };
  const handleNumberChange = (event) => {
    dispatch(changeNumber(event.target.value));
  };

  const preventMinus = (e) => {
    if (e.code === "Minus") {
      e.preventDefault();
    }
  };

  const preventPasteNegative = (e) => {
    const clipboardData = e.clipboardData || window.clipboardData;
    const pastedData = parseFloat(clipboardData.getData("text"));

    if (pastedData < 0) {
      e.preventDefault();
    }
  };
  const handleClose = () => {
    setShowModal(false);
  };

  const actionBar = (
    <>
      <Button primary onClick={handleClose}>
        OK
      </Button>
    </>
  );

  const modal = (
    <Modal actionBar={actionBar} onClose={handleClose}>
      <p>Please enter a bird and the number seen!</p>
    </Modal>
  );

  return (
    <>
      <Panel primary className="bird-search mb-5">
        <form
          className="md:flex md:flex-row md:flex-wrap md:justify-between"
          onSubmit={handleSubmit}
        >
          <div className="md:basis-2/5">
            <label
              className="block font-bold text-slate-700/75"
              htmlFor="search"
            >
              New Bird
            </label>
            <input
              id="search"
              value={name}
              type="text"
              onChange={handleNameChange}
              className="border border-2 block w-full mt-2 text-gray-700 rounded py-2 px-3 focus:outline-none focus:border-gray-300 focus:drop-shadow"
            />
          </div>
          <div className="mt-4 md:mt-0 md:basis-2/5">
            <label
              className="block font-bold text-slate-700/75"
              htmlFor="number"
            >
              Number Seen
            </label>
            <input
              id="number"
              type="number"
              value={number || ""}
              min="1"
              onChange={handleNumberChange}
              onPaste={preventPasteNegative}
              onKeyPress={preventMinus}
              className="border border-2 block w-full mt-2 text-gray-700 rounded py-2 px-3 focus:outline-none focus:border-gray-300 focus:drop-shadow"
            />
          </div>
          <div className="grid place-content-center mt-7 md:basis-1/6">
            <Button
              primary
              className="px-10 md:px-3"
              loading={addBirdResults.isLoading}
            >
              Add
            </Button>
          </div>
        </form>
      </Panel>
      {showModal && modal}
    </>
  );
}

export default SearchBird;
