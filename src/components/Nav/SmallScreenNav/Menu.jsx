import { NavLink } from "react-router";
import { IoMdCloseCircle } from "react-icons/io";
import { TbPaperBag } from "react-icons/tb";
import { RiFileList2Line } from "react-icons/ri";
import { FaRegUserCircle } from "react-icons/fa";

function Menu({ visible, handleClick }) {
  return (
    <nav id="menu-container" className={visible}>
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
          <NavLink to="groceries" onClick={handleClick}>
            <span className="icon">
              <RiFileList2Line />
            </span>
            <span className="description">Groceries</span>
          </NavLink>
        </li>

        <li className="item" id="profile">
          <NavLink to="profile" onClick={handleClick}>
            <span className="icon">
              <FaRegUserCircle />
            </span>
            <span className="description">Profile</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Menu;
