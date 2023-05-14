import { useDispatch, useSelector } from "react-redux";
import { changeName, changeNumber } from "../store";
import { useAddBirdMutation } from "../store";

import Button from "./Button";
import Panel from "./Panel";

function SearchBird() {
  const [addBird, addBirdResults] = useAddBirdMutation();
  const dispatch = useDispatch();
  const { name, number } = useSelector((state) => {
    return {
      name: state.search.name,
      number: state.search.number,
    };
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    addBird({ name, number });

    dispatch(changeName(""));
    dispatch(changeNumber(""));
  };

  const handleNameChange = (event) => {
    dispatch(changeName(event.target.value));
  };
  const handleNumberChange = (event) => {
    dispatch(changeNumber(event.target.value));
  };

  return (
    <>
      <Panel primary className="bird-search mb-5">
        <form
          className="md:flex md:flex-row md:flex-wrap md:justify-between"
          onSubmit={handleSubmit}
        >
          <div className="md:basis-2/5">
            <label className="block font-bold" htmlFor="search">
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
            <label className="block font-bold" htmlFor="number">
              Number Seen
            </label>
            <input
              id="number"
              type="number"
              value={number || ""}
              onChange={handleNumberChange}
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
    </>
  );
}

export default SearchBird;
