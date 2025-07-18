import { Link } from "react-router";

/**
 * Renders React Router Link with button styling
 * @param {string} path - link path
 * @param {string} color - button color (red/green)
 * @param {function} icon - button icon
 * @param {string} name - button name
 */
function LinkButton({ path, color, icon, name }) {
  return (
    <Link to={path} className={`btn ${color}`}>
      <div className="centered-container btn-icon-gap">
        {icon}
        {name}
      </div>
    </Link>
  );
}

export default LinkButton;
