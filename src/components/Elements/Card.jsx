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
        <div className="title-container">
          <div className="left-element">
            {showGoBack ? (
              <button
                className="go-back-btn"
                onClick={handleGoBack}
                title="Go Back"
              >
                <IoArrowBackCircle className="icon" />
              </button>
            ) : null}
          </div>
          <div className="center-element">
            <div className="centered-container">
              <span className="icon">{titleIcon}</span>
              <h1 className="title">{titleText}</h1>
            </div>
          </div>
          <div className="right-element">
            <div className="go-back-btn">
              <IoArrowBackCircle className="icon" />
            </div>
          </div>
        </div>
      </div>
      <div className="card-body">{body}</div>
    </div>
  );
}

export default Card;
