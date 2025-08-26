import { Link } from "react-router";
import { TbPaperBag } from "../../utils/icons";

/**
 * Renders rounder Groceries Manager logo
 */
function GMLogo() {
  return (
    <div className="centered-container">
      <Link to="/">
        <TbPaperBag className="logo" title="Return Home" />
      </Link>
    </div>
  );
}

export default GMLogo;
