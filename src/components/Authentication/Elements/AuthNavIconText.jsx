import { FaRegUserCircle, GoSignOut } from "../../../utils/icons";

/**
 * Renders nav bar user authentication icon and text
 * @param {boolean} isSignedIn - icon
 * @param {string} text - text
 */
function AuthNavIconText({ signedIn, text }) {
  return (
    <div className="auth-nav">
      <div className="centered-container">
        {signedIn ? (
          <GoSignOut className="auth-nav-icon" />
        ) : (
          <FaRegUserCircle className="auth-nav-icon" />
        )}
        <span className="auth-nav-text">{text}</span>
      </div>
    </div>
  );
}

export default AuthNavIconText;
