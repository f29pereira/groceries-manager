import { FaRegCalendar, FaClock } from "../../utils/icons";

/**
 * Renders date and time with icons
 * @param {string} date   -  date text
 * @param {string} time   -  time text
 */
function DateTime({ date = "", time = "" }) {
  return (
    <>
      <div className="date-container">
        <FaRegCalendar className="date-time-icon" /> <span>{date}</span>
      </div>
      <div className="time-container">
        <FaClock className="date-time-icon" /> <span>{time}</span>
      </div>
    </>
  );
}

export default DateTime;
