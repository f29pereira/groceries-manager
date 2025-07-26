import { AuthContext } from "../../../App";
import { useContext } from "react";
import { useNavigate } from "react-router";

/**
 * Renders fallback UI used by ErrorBoundary
 */
function FallBack() {
  const { setIsNavHidden } = useContext(AuthContext);
  const navigate = useNavigate();

  const returnHome = () => {
    setIsNavHidden(false);
    navigate("/");
  };

  return (
    <>
      <main>
        <div className="content">
          <div className="centered-column-container fallback">
            <h1 className="fallback-msg">Sorry, something went wrong.</h1>
            <button className="btn green" onClick={returnHome}>
              Return Home
            </button>
          </div>
        </div>
      </main>
    </>
  );
}

export default FallBack;
