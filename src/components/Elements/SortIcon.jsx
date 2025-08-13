import { IoArrowUpCircle, IoArrowDownCircle } from "../../utils/icons";

/**
 * Renders current sort order icon
 * @param {string} order - sorting order (asc/desc)
 */
function SortIcon({ order }) {
  return (
    <div className="arrow">
      {order === "asc" ? <IoArrowDownCircle /> : <IoArrowUpCircle />}
    </div>
  );
}

export default SortIcon;
