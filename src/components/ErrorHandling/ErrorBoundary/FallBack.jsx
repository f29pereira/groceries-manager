import { AuthContext } from "../../../App";
import { useContext } from "react";
import { useNavigate } from "react-router";
import { ToastContext } from "../../Elements/Toast/ToastProvider";
import Toast from "../../Elements/Toast/Toast";

/**
 * Renders fallback UI used by ErrorBoundary
 */
function FallBack() {
  const { setIsNavHidden } = useContext(AuthContext);
  const { toast, clearErrorToast } = useContext(ToastContext);

  const navigate = useNavigate();

  const returnHome = () => {
    setIsNavHidden(false);
    navigate("/");
    clearErrorToast();
  };

  return (
    <div className="centered-column-container full-height error-container">
      <div className="error-card">
        <div className="centered-column-container">
          <h1 className="fallback-msg">
            Oops! <span className="text">Something went wrong</span>
          </h1>
          {toast && toast?.type === "error" && toast?.message ? (
            <Toast type={toast.type} message={toast.message} />
          ) : null}
        </div>

        <div className="centered-container error-btn-container">
          <button className="btn green" onClick={returnHome}>
            Return Home
          </button>
        </div>
      </div>
    </div>
  );
}

export default FallBack;
