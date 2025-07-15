import { useContext } from "react";
import { Link } from "react-router";
import { AuthContext } from "../../App";
import { IoIosAddCircle, MdDelete, FaRegListAlt } from "../../utils/icons";
import Footer from "./Footer";

function Home() {
  const { isSignedIn } = useContext(AuthContext);

  return (
    <>
      <main>
        <div className="content">
          <header className="header home">
            <h1 className="home-title">
              Manage your <span className="green-text">Groceries</span>
            </h1>
            <div id="img-container">
              <img
                id="groceries-bag"
                src="/src/assets/images/groceries_bag.svg"
                alt="Groceries bag filled with vegetables"
              />
            </div>
          </header>

          <section>
            <p className="home-text">
              Create your custom groceries list and buy only what you really
              need.
            </p>

            {!isSignedIn ? (
              <p className="home-text">
                Interested ?
                <Link to="/signUp" className="click-link sign-up-home">
                  Sign up here
                </Link>
              </p>
            ) : null}
          </section>
        </div>

        <section className="features-section">
          <h2 className="features-title">Features</h2>
          <div className="features-container">
            <div className="features-card">
              <div className="centered-column-container">
                <IoIosAddCircle className="features-icon" />
                <h3 className="info-title">Add items</h3>
                <p className="info-text">
                  Just add the name, quantity and category to add an item to
                  your list.
                </p>
              </div>
            </div>
            <div className="features-card">
              <div className="centered-column-container">
                <FaRegListAlt className="features-icon" />
                <h3 className="info-title">Check your list</h3>
                <p className="info-text">
                  Easily review all the items you've added in one place.
                </p>
              </div>
            </div>
            <div className="features-card">
              <div className="centered-column-container">
                <MdDelete className="features-icon" />
                <h3 className="info-title">Remove items</h3>
                <p className="info-text">
                  Don't need an item on the list? Just remove it!
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default Home;
