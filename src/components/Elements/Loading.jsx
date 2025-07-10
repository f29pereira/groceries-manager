import { AiOutlineLoading3Quarters } from "react-icons/ai";

function Loading({ children }) {
  return (
    <div className="loading-container">
      <AiOutlineLoading3Quarters className="loading-icon" />
      <span>{children}</span>
    </div>
  );
}

export default Loading;
