import { useDispatch, useSelector } from "react-redux";
import { changeName } from "../store";

function SearchBird() {
  const dispatch = useDispatch();
  const name = useSelector((state) => {
    return state.search.name;
  });
  const handleSubmit = (event) => {
    event.preventDefault();
    // need to use addBird to send new bird to birdList store
  };
  const handleNameChange = (event) => {
    dispatch(changeName(event.target.value));
  };

  //want to add in another input for number of birds seen and submit button

  return (
    <div className="bird-search">
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="search">New Bird</label>
          <input id="search" value={name} onChange={handleNameChange} />
        </div>
      </form>
    </div>
  );
}

export default SearchBird;
