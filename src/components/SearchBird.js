import { useDispatch, useSelector } from "react-redux";
import { changeName, changeNumber } from "../store";

function SearchBird() {
  const dispatch = useDispatch(name, number);
  const name = useSelector((state) => {
    return state.search.name;
  });
  const number = useSelector((state) => {
    return state.search.number;
  });
  const handleSubmit = (event) => {
    event.preventDefault();
    // need to use addBird to send new bird to birdList store
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
