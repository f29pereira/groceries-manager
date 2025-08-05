import { BiError, BiCheck, IoClose } from "../../../utils/icons";

/**
 * Renders a toast notification
 * @param {string} type - notification type (success/error)
 * @param {string} message - message text
 */
function Toast({ type, message }) {
  return (
    <div className={`toast-container ${type}`}>
      <div className="centered-container">
        <div className="centered-container toast-info">
          {type === "success" ? (
            <BiCheck className="toast-icon" />
          ) : (
            <BiError />
          )}
          <span className="toast-message">{message}</span>
        </div>

        <div className="close-container">
          <IoClose className="toast-close" />
        </div>
      </div>
    </div>
  );
}

export default Toast;
