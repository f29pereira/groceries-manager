import { BsList } from "react-icons/bs";
import { FaRegUserCircle } from "react-icons/fa";
import { NavLink } from "react-router";

function Hamburguer({ visible, handleClick }) {
  return (
    <nav id="hamburguer-nav" className={visible}>
      <ul id="hamburguer-container">
        <li className="icon-items" id="open" onClick={handleClick}>
          <BsList />
        </li>

        <li className="icon-items">
          <NavLink to="profile">
            <span className="icon">
              <FaRegUserCircle />
            </span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Hamburguer;
