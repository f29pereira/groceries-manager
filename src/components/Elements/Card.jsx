import { useNavigate } from "react-router";
import { IoArrowBackCircle } from "../../utils/icons";
import Loading from "./Loading";

/**
 * Renders a card with header and body
 * @param {boolean} showGoBack - show top left go back button
 * @param {function} titleIcon -  header icon
 * @param {string} titleIcon   -  header text
 * @param {boolean} isLoading  - show Loading component on body
 * @param {ReactNode} body     - card body content
 */
function Card({ showGoBack, titleIcon, titleText, isLoading = false, body }) {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <>
      {isLoading ? (
        <Loading>Loading data</Loading>
      ) : (
        <div className="card-container">
          <div className="card-header">
            {showGoBack ? (
              <div className="space-between-container">
                <div className="left-element">
                  <button
                    className="go-back-btn"
                    onClick={handleGoBack}
                    title="Go Back"
                  >
                    <IoArrowBackCircle className="icon" />
                  </button>
                </div>
                <div className="center-element">
                  <div className="centered-container">
                    <span className="icon">{titleIcon}</span>
                    <h1 className="card-header-title">{titleText}</h1>
                  </div>
                </div>
                <div className="right-element">
                  <div className="go-back-btn">
                    <IoArrowBackCircle className="icon" />
                  </div>
                </div>
              </div>
            ) : (
              <div className="centered-container">
                <span className="icon">{titleIcon}</span>
                <h1 className="card-header-title">{titleText}</h1>
              </div>
            )}
          </div>

          <div className="card-body">{body}</div>
        </div>
      )}
    </>
  );
}

export default Card;
