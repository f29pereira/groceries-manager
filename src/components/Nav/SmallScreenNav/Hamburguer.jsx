import AuthNavOption from "../../Authentication/AuthNavOption";
import { BsList } from "react-icons/bs";

function Hamburguer({ visible, handleClick }) {
  return (
    <nav id="hamburguer-nav" className={visible}>
      <ul id="hamburguer-container">
        <li className="icon-items" id="open" onClick={handleClick}>
          <BsList />
        </li>

        <li className="icon-items">
          <AuthNavOption />
        </li>
      </ul>
    </nav>
  );
}

export default Hamburguer;
