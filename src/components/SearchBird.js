import { useDispatch, useSelector } from "react-redux";
import { changeName } from "../store";

function SearchBird() {
  const dispatch = useDispatch();
  const name = useSelector((state) => {
    return state.search.name;
  });

  const handleNameChange = (event) => {
    dispatch(changeName(event.target.value));
  };

  return (
    <div className="bird-search">
      <form>
        <div>
          <label></label>
          <input
            placeholder="Search a Bird!"
            value={name}
            onChange={handleNameChange}
          />
        </div>
      </form>
    </div>
  );
}

export default SearchBird;
