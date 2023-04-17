import { ClipLoader } from "react-spinners";
import { AiOutlinePlus } from "react-icons/ai";
import { AiOutlineMinus } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { changeName, changeNumber } from "../store";
import { useAddBirdMutation } from "../store";
import Button from "./Button";

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
  const loading = addBirdResults.isLoading;
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
        <button>
          {loading ? (
            <ClipLoader color="#36d7b7" data-testid="button loader" />
          ) : (
            "Add"
          )}
        </button>
      </form>
      <div>
        <Button primary>Primary</Button>
      </div>
      <div>
        <Button remove>Remove</Button>
      </div>
      <div>
        <Button symbol>
          {" "}
          <AiOutlinePlus />
        </Button>
      </div>
      <div>
        <Button symbol>
          <AiOutlineMinus />
        </Button>
      </div>
      <div>
        <Button secondary>Secondary</Button>
      </div>
    </div>
  );
}

export default SearchBird;
