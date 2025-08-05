import { BiError } from "../../../utils/icons";

/**
 * Component that renders a error message
 * @param {string} type     - type of error ("input" = inline error, "generic" = card error)
 * @param {string} children - message content
 */
function ErrorMessage({ type, children }) {
  const isInputError = type === "input" ? true : false;

  return (
    <>
      {isInputError ? (
        <p className="input-error-msg">{children}</p>
      ) : (
        <div className="generic-error-container">
          <div className="error-icon">
            <BiError className="icon" />
          </div>
          <p className="error-msg">Error: {children}</p>
        </div>
      )}
    </>
  );
}

export default ErrorMessage;
