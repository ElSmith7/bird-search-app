import className from "classnames";

function Panel({ primary, secondary, error, remove, children, ...rest }) {
  const classes = className(
    rest.className,
    "w-4/5 md:w-3/5 lg:w-2/5 my-2 px-5 py-3 mx-0 border-2 rounded drop-shadow",
    {
      "bg-white border-green-500": primary,
      "bg-white border-orange-500": error,
      "bg-white border-red-500": remove,
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
