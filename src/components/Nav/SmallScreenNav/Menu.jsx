import { NavLink } from "react-router";
import {
  IoMdCloseCircle,
  TbPaperBag,
  FaRegListAlt,
} from "../../../utils/icons";

function Menu({ isHamburguerOpen, handleClick }) {
  return (
    <>
      {isHamburguerOpen ? (
        <nav id="menu-container">
          <ul className="menu-items">
            <li id="close" onClick={handleClick}>
              <IoMdCloseCircle />
            </li>

            <li className="item">
              <NavLink to="/" onClick={handleClick}>
                <span className="icon">
                  <TbPaperBag />
                </span>
                <span className="description">Home</span>
              </NavLink>
            </li>

            <li className="item">
              <NavLink to="myLists" onClick={handleClick}>
                <span className="icon">
                  <FaRegListAlt />
                </span>
                <span className="description">My Lists</span>
              </NavLink>
            </li>
          </ul>
        </nav>
      ) : null}
    </>
  );
}

export default Menu;
