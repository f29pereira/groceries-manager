import { FaRegCalendar, FaClock } from "../../utils/icons";

/**
 * Renders date and time with icons
 * @param {boolean} isDisplayInline - display data and time inline or column
 * @param {string} date   -  date text
 * @param {string} time   -  time text
 */
function DateTime({ isDisplayInline = true, date = "", time = "" }) {
  return (
    <>
      {isDisplayInline ? (
        <div className="centered-container gap">
          <div className="centered-container">
            <FaRegCalendar className="date-time-icon" />{" "}
            <span className="date-time-text">{date}</span>
          </div>
          <div className="centered-container">
            <FaClock className="date-time-icon" />{" "}
            <span className="date-time-text">{time}</span>
          </div>
        </div>
      ) : (
        <div className="centered-column-container">
          <FaRegCalendar className="date-time-icon" />
          <span className="date-time-text date-column">{date}</span>
          <FaClock className="date-time-icon" />
          <span className="date-time-text">{time}</span>
        </div>
      )}
    </>
  );
}

export default DateTime;
