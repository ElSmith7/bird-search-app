import BeatLoader from "react-spinners/BeatLoader";
import classNames from "classnames";

function Loader({ className, ...rest }) {
  const finalClassNames = classNames(className);

  return (
    <div data-testid="loader">
      <BeatLoader color="#36d7b7" {...rest} className={finalClassNames} />
    </div>
  );
}

export default Loader;
