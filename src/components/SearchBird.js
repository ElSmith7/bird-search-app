import { useDispatch, useSelector } from "react-redux";
import { changeName, changeNumber } from "../store";
import { useAddBirdMutation } from "../store";

function SearchBird() {
  const [addBird, results] = useAddBirdMutation();
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
    dispatch(changeNumber(0));
  };
  const handleNameChange = (event) => {
    dispatch(changeName(event.target.value));
  };
  const handleNumberChange = (event) => {
    dispatch(changeNumber(event.target.value));
  };

  return (
    <div className="bird-search">
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="search">New Bird</label>
          <input
            id="search"
            value={name}
            type="text"
            onChange={handleNameChange}
          />
        </div>
        <div>
          <label htmlFor="number">Number Seen</label>
          <input
            id="number"
            type="number"
            value={number || ""}
            onChange={handleNumberChange}
          />
        </div>
        <button>Add</button>
      </form>
    </div>
  );
}

export default SearchBird;
