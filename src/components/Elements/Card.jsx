import { Link, useNavigate } from "react-router";
import { IoArrowBackCircle } from "../../utils/icons";

function Card({ showGoBack, titleIcon, titleText, body }) {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
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
  );
}

export default Card;
