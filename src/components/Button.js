import className from "classnames";

function Button({ children, primary, secondary, symbol, remove }) {
  return (
    <button className="m-1 px-3 py-1.5 rounded-full drop-shadow bg-green-500 text-white hover:opacity-75">
      {children}
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
