import className from "classnames";

function Button({ children, primary, secondary, symbol, remove }) {
  const classes = className(
    "hover:opacity-75 m-1 px-3 py-1.5 rounded-full drop-shadow border",
    {
      "border-green-500 bg-green-500 text-white": primary,
      "border-green-500 bg-white text-gray-600": secondary,
      "px-1.5 py-1.5 border-green-500 bg-green-500 text-white": symbol,
      "border-transparent bg-transparent drop-shadow-none text-gray-600":
        remove,
    }
  );
  return <button className={classes}>{children}</button>;
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
