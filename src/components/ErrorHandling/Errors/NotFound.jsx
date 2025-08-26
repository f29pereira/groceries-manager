import LinkButton from "../../Elements/LinkButton";
import { PiFileMagnifyingGlass } from "../../../utils/icons";

function NotFound() {
  return (
    <div className="centered-column-container full-height error-container">
      <div className="error-card not-found">
        <h1>
          404 - <span className="text">Page not found</span>
        </h1>
        <p>
          Sorry, the page you are looking for doesn't exist or it isn't
          available at the moment.
        </p>
        <PiFileMagnifyingGlass className="page-not-found-icon" />
        <div className="centered-container not-found-home-btn">
          <LinkButton path="/" classNames="green" name="Return Home" />
        </div>
      </div>
    </div>
  );
}

export default NotFound;
