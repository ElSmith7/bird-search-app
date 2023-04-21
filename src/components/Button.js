import className from "classnames";
import { ClipLoader } from "react-spinners";

function Button({
  children,
  primary,
  secondary,
  symbol,
  remove,
  loading,
  ...rest
}) {
  const classes = className(
    rest.className,
    "hover:opacity-75 m-1 px-3 py-1.5 rounded-full drop-shadow border",
    {
      "border-green-500 bg-green-500 text-white": primary,
      "border-green-500 bg-white text-gray-600": secondary,
      "px-1.5 py-1.5 border-green-500 bg-green-500 text-white": symbol,
      "px-0 py-0 border-transparent bg-transparent drop-shadow-none text-gray-600":
        remove,
    }
  );
  return (
    <button {...rest} disabled={loading} className={classes}>
      {loading ? (
        <ClipLoader color="#00000" size={15} data-testid="button loader" />
      ) : (
        children
      )}
    </button>
  );
}

Button.propTypes = {
  checkDescriptorValue: ({ primary, secondary, symbol, remove }) => {
    const count =
      Number(!!primary) +
      Number(!!secondary) +
      Number(!!symbol) +
      Number(!!remove);

    if (count > 1) {
      return new Error(
        "Only one of primary, secondary, symbol or remove can be true"
      );
    }
  },
};

export default Button;
