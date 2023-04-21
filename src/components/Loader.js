import BeatLoader from "react-spinners/BeatLoader";

function Loader({ ...rest }) {
  return (
    <div data-testid="loader">
      <BeatLoader color="#36d7b7" {...rest} />
    </div>
  );
}

export default Loader;
