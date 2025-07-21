import LinkButton from "../Elements/LinkButton";

function NotFound() {
  return (
    <div id="not-found-container">
      <div id="not-found-card">
        <h1>
          404 - <span className="green-text">Page not found</span>
        </h1>
        <p>
          Sorry, the page you are looking for doesn't exist or it isn't
          available at the moment.
        </p>
        <div className="centered-container">
          <LinkButton path="/" classNames="green" name="Return Home" />
        </div>
      </div>
    </div>
  );
}

export default NotFound;
