import className from "classnames";

function Panel({ primary, secondary, error, remove, children, ...rest }) {
  const classes = className(
    rest.className,
    "w-4/5 md:w-2/3 lg:w-1/2 my-2 px-7 py-5 mx-0 border-2 rounded drop-shadow bg-white text-slate-700",
    {
      "border-green-500": primary,
      "border-orange-500": error,
      "border-red-500": remove,
    }
  );

  return (
    <div {...rest} className={classes}>
      {children}
    </div>
  );
}

Panel.propTypes = {
  checkDescriptorValue: ({ primary, secondary, error, remove }) => {
    const count =
      Number(!!primary) +
      Number(!!secondary) +
      Number(!!error) +
      Number(!!remove);

    if (count > 1) {
      return new Error(
        "Only one of primary, secondary, error or remove can be true"
      );
    }
  },
};

export default Panel;
