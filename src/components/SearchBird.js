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
      <Panel primary className="bird-search mb-4">
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="search">New Bird</label>
            <input
              id="search"
              value={name}
              type="text"
              onChange={handleNameChange}
              className="border"
            />
          </div>
          <div>
            <label htmlFor="number">Number Seen</label>
            <input
              id="number"
              type="number"
              value={number || ""}
              onChange={handleNumberChange}
              className="border"
            />
          </div>

          <Button primary loading={addBirdResults.isLoading}>
            Add
          </Button>
        </form>
      </Panel>
    </>
  );
}

export default SearchBird;
