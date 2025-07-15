import { AiOutlineLoading3Quarters } from "../../utils/icons";

function Loading({ children }) {
  return (
    <div className="loading-container">
      <AiOutlineLoading3Quarters className="loading-icon" />
      <span>{children}</span>
    </div>
  );
}

export default Loading;
