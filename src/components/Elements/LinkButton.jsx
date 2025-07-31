import { Link } from "react-router";

/**
 * Renders React Router Link with button styling
 * @param {string} path       - link path
 * @param {string} classNames - css class names
 * @param {function} icon     - button icon
 * @param {string} name       - button name
 * @param {object} state      - state data object
 * @param {string} title      - link title
 */
function LinkButton({
  path,
  classNames,
  icon,
  name = "",
  state = null,
  title = null,
}) {
  return (
    <Link to={path} className={`btn ${classNames}`} state={state} title={title}>
      <div className="centered-container btn-icon-gap">
        {icon}
        {name}
      </div>
    </Link>
  );
}

export default LinkButton;
