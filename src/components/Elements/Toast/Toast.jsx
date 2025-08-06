import { ToastContext } from "./ToastProvider";
import { BiError, BiCheck, IoClose } from "../../../utils/icons";
import { useContext } from "react";

/**
 * Renders a toast notification
 * @param {string} type - notification type (success/error)
 * @param {string} message - message text
 */
function Toast({ type, message }) {
  const { setToast } = useContext(ToastContext);

  const closeToast = () => {
    setToast(null);
  };

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
          <IoClose className="toast-close" onClick={closeToast} />
        </div>
      </div>
    </div>
  );
}

export default Toast;
