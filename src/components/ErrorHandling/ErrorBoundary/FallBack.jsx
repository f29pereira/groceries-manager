import LinkButton from "../../Elements/LinkButton";
import Footer from "../../Static/Footer";

/**
 * Renders fallback UI used by ErrorBoundary
 */
function FallBack(/*{ errorMessage }*/) {
  return (
    <>
      <main>
        <div className="content">
          <div className="centered-column-container fallback">
            <h1 className="fallback-msg">Sorry, something went wrong.</h1>
            <LinkButton path="/" classNames="green" name="Return Home" />
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

export default FallBack;
