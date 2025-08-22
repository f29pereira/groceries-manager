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
            <li className="nav-logo">
              <div className="centered-container">
                <TbPaperBag className="logo-icon" />
                <div className="nav-items nav-hover">
                  <NavLink
                    to="/"
                    className={({ isActive }) =>
                      isActive ? "active-nav-link" : null
                    }
                  >
                    Groceries Manager
                  </NavLink>
                </div>
              </div>
            </li>
            <li className="nav-items nav-hover" id="nav-groceries">
              <NavLink
                to="myLists"
                className={({ isActive }) =>
                  isActive ? "active-nav-link" : null
                }
              >
                My Lists
              </NavLink>
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
