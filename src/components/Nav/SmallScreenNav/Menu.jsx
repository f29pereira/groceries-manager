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
              <NavLink to="groceries/list" onClick={handleClick}>
                <span className="icon">
                  <FaRegListAlt />
                </span>
                <span className="description">Groceries</span>
              </NavLink>
            </li>
          </ul>
        </nav>
      ) : null}
    </>
  );
}

export default Menu;
