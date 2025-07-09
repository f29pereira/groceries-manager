import { NavLink } from "react-router";
import { useContext } from "react";
import { AuthContext } from "../../../App";
import AuthNavOption from "../../Authentication/AuthNavOption";
import { FaRegUserCircle } from "react-icons/fa";
import { TbPaperBag } from "react-icons/tb";

function MedBigScrenNav() {
  const { isSignedIn } = useContext(AuthContext);

  return (
    <nav>
      <ul id="nav-container">
        <li className="item-icon">
          <TbPaperBag />
        </li>
        <li className="nav-items nav-hover" id="nav-home">
          <NavLink to="/">Groceries Manager</NavLink>
        </li>
        <li className="nav-items nav-hover" id="nav-groceries">
          <NavLink to="groceries">Groceries</NavLink>
        </li>
        <li className="nav-items">
          <AuthNavOption />
        </li>
      </ul>
    </nav>
  );
}

export default MedBigScrenNav;
