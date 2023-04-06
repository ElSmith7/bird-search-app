import "../styles/Panel.css";
import classNames from "classnames";

function Panel({ children, className, ...rest }) {
  const finalClassNames = classNames("panel", className);

  return (
    <div {...rest} data-testId="panel" className={finalClassNames}>
      {children}
    </div>
  );
}

export default Panel;
