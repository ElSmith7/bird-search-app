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

  const handleClose = () => {
    setShowModal(false);
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
      <Panel primary className="bird-search mb-6 pt-0">
        <form
          className="md:flex md:flex-row md:flex-wrap md:justify-between"
          onSubmit={handleSubmit}
        >
          <div className="mt-4 md:mt-0 md:basis-2/5">
            <label
              className="block font-bold text-slate-700/75 md:invisible"
              htmlFor="search"
            >
              Bird Name
            </label>
            <input
              id="search"
              value={name}
              type="text"
              placeholder="European Robin"
              onChange={handleNameChange}
              className="border border-2 block w-full mt-2 rounded py-2 px-3 text-gray-700 placeholder-gray-700 placeholder-opacity-0 focus:outline-none focus:border-gray-300 focus:drop-shadow md:placeholder-opacity-25"
            />
          </div>
          <div className="mt-4 md:mt-0 md:basis-2/5">
            <label
              className="block font-bold text-slate-700/75 md:invisible"
              htmlFor="number"
            >
              Number Seen
            </label>
            <input
              id="number"
              type="number"
              value={number || ""}
              min="1"
              placeholder="2"
              onChange={handleNumberChange}
              onPaste={preventPasteNegative}
              onKeyDown={preventMinus}
              className="border border-2 block w-full mt-2 rounded py-2 px-3 text-gray-700 placeholder-gray-700 placeholder-opacity-0 focus:outline-none focus:border-gray-300 focus:drop-shadow md:placeholder-opacity-25"
            />
          </div>

          <div className="grid place-content-center mt-7 md:basis-1/6">
            <Button
              primary
              className="px-16 md:px-3"
              loading={addBirdResults.isLoading}
            >
              Add
            </Button>
          </div>
        </form>
        <h6 className="hidden mt-1 mb-2 ml-1 text-xs text-slate-700/50 md:block">
          Add a new bird and the number you've seen or search your list!
        </h6>
      </Panel>
      {showModal && modal}
    </>
  );
}

export default SearchBird;
