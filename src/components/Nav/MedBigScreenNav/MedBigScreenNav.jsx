import { NavLink } from "react-router";
import { FaRegUserCircle } from "react-icons/fa";
import { TbPaperBag } from "react-icons/tb";

/*
<li className="item-icon">
          <TbPaperBag />
        </li>



<span className="item-icon">
              <TbPaperBag />
            </span>


<li className="nav-items">
          <NavLink to="profile">
            <span className="item-icon">
              <FaRegUserCircle />
            </span>
          </NavLink>
        </li>          
*/

function MedBigScrenNav() {
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
          <NavLink to="profile">
            <span className="item-icon">
              <FaRegUserCircle />
            </span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default MedBigScrenNav;
