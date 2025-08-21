import { useContext } from "react";
import { AuthContext } from "../../../App";
import { Outlet } from "react-router";
import AuthNavOption from "../../Authentication/AuthNavOption";
import { BsList, TbPaperBag } from "../../../utils/icons";

function Hamburguer({ isHamburguerOpen, handleClick }) {
  const { isNavHidden } = useContext(AuthContext);
  //<nav className="fixed-nav">
  return (
    <>
      {!isHamburguerOpen ? (
        <>
          {isNavHidden ? null : (
            <nav>
              <ul className="space-between-container hamburguer-list">
                <li className="icon-items" id="open" onClick={handleClick}>
                  <BsList />
                </li>

                <li className="icon-items">
                  <div className="centered-container">
                    <TbPaperBag />
                    <span className="icon-text">GM</span>
                  </div>
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
