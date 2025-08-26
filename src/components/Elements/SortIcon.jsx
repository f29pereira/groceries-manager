import { TiArrowSortedDown, TiArrowSortedUp } from "../../utils/icons";

/**
 * Renders current sort order icon
 * @param {string} order - sorting order (asc/desc)
 */
function SortIcon({ order }) {
  return (
    <div className="arrow">
      {order === "asc" ? <TiArrowSortedDown /> : <TiArrowSortedUp />}
    </div>
  );
}

export default SortIcon;
