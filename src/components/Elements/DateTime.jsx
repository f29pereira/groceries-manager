import { FaRegCalendar, FaClock } from "../../utils/icons";

/**
 * Renders date and time with icons
 * @param {string} date   -  date text
 * @param {string} time   -  time text
 */
function DateTime({ date = "", time = "" }) {
  return (
    <div className="date-time-container">
      <FaRegCalendar className="date-time-icon" />
      <span className="date-time-text date-text">{date}</span>
      <FaClock className="date-time-icon clock-icon" />
      <span className="date-time-text">{time}</span>
    </div>
  );
}

export default DateTime;
