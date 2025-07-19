import { AiOutlineLoading3Quarters } from "../../utils/icons";

function Loading({ children }) {
  return (
    <div className="centered-container loading">
      <AiOutlineLoading3Quarters className="loading-icon" />
      <span className="loading-text">{children}</span>
    </div>
  );
}

export default Loading;
