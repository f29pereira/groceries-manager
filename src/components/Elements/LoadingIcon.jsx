import { AiOutlineLoading3Quarters } from "../../utils/icons";

/**
 * Renders a loading icon with text
 * @param {React.ReactNode} children - loading text after the icon
 * @returns
 */
function LoadingIcon({ children }) {
  return (
    <div className="centered-container loading-icon-container">
      <AiOutlineLoading3Quarters className="loading-icon" />
      <span className="loading-text">{children}</span>
    </div>
  );
}

export default LoadingIcon;
