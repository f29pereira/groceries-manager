import { useContext } from "react";
import { AuthContext } from "../../../App";
import { Outlet } from "react-router";
import AuthNavOption from "../../Authentication/AuthNavOption";
import { BsList } from "../../../utils/icons";

function Hamburguer({ isHamburguerOpen, handleClick }) {
  const { isNavHidden } = useContext(AuthContext);

  return (
    <>
      {!isHamburguerOpen ? (
        <>
          {isNavHidden ? null : (
            <nav id="hamburguer-nav">
              <ul id="hamburguer-container">
                <li className="icon-items" id="open" onClick={handleClick}>
                  <BsList />
                </li>

                <li className="icon-items">
                  <AuthNavOption />
                </li>
              </ul>
            </nav>
          )}

          <Outlet />
        </>
      ) : null}
    </>
  );
}

export default Hamburguer;
