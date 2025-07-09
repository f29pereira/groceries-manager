import { NavLink } from "react-router";

function NotFound() {
  return (
    <div id="not-found-container">
      <div id="not-found-card">
        <h1>
          404 - <span>Page not found</span>
        </h1>
        <p>
          Sorry, the page you are looking for doesn't exist or it isn´t
          available.
        </p>
        <div id="return-home-container">
          <span>
            <NavLink to="/">Return Home</NavLink>
          </span>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
