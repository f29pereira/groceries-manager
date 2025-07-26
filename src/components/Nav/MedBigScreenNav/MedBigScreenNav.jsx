import { useContext } from "react";
import { AuthContext } from "../../../App";
import { NavLink, Outlet } from "react-router";
import AuthNavOption from "../../Authentication/AuthNavOption";
import { TbPaperBag } from "../../../utils/icons";

function MedBigScrenNav() {
  const { isNavHidden } = useContext(AuthContext);

  return (
    <>
      {isNavHidden ? null : (
        <nav>
          <ul id="nav-container">
            <li className="item-icon">
              <TbPaperBag />
            </li>
            <li className="nav-items nav-hover" id="nav-home">
              <NavLink to="/">Groceries Manager</NavLink>
            </li>
            <li className="nav-items nav-hover" id="nav-groceries">
              <NavLink to="myLists">My Lists</NavLink>
            </li>
            <li className="nav-items">
              <AuthNavOption />
            </li>
          </ul>
        </nav>
      )}

      <Outlet />
    </>
  );
}

export default MedBigScrenNav;
