import className from "classnames";

function Panel({ primary, secondary, error, remove, children, ...rest }) {
  const classes = className(
    rest.className,
    "my-2 w-1/2 px-4 py-2 mx-0 border-2 rounded drop-shadow",
    {
      "bg-white border-green-500": primary,
    }
  );

  return (
    <div {...rest} className={classes}>
      {children}
    </div>
  );
}

export default Panel;
