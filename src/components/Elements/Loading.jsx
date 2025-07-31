import LoadingIcon from "./LoadingIcon";

/**
 * Renders loading page
 * @param {string} message - loading text before the icon
 */
function Loading({ message = "" }) {
  return (
    <div className="content">
      <div className="centered-column-container loading-container">
        <h1 className="loading-title">{message}</h1>
        <LoadingIcon></LoadingIcon>
      </div>
    </div>
  );
}

export default Loading;
