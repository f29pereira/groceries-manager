import { Link } from "react-router";

function NotFound() {
  return (
    <div id="not-found-container">
      <div id="not-found-card">
        <h1>
          404 - <span>Page not found</span>
        </h1>
        <p>
          Sorry, the page you are looking for doesn't exist or it isn't
          available at the moment.
        </p>
        <div className="centered-container">
          <Link className="btn submit" to="/">
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
