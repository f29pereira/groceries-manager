import { useContext } from "react";
import { Link } from "react-router";
import { AuthContext } from "../../App";
import {
  IoIosAddCircle,
  MdOutlineCheckBox,
  FaRegListAlt,
  IoClipboardOutline,
} from "../../utils/icons";
import Footer from "./Footer";

function Home() {
  const { isSignedIn } = useContext(AuthContext);

  return (
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

        <section className="home-text">
          <p>
            Easily create and manage your grocery lists. Simply add items, and
            check them off as you shop.
          </p>

          <p>
            Stay organized, buy only what you really need, and save time on your
            next trip to the store!
          </p>

          {!isSignedIn ? (
            <p>
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
              <IoClipboardOutline className="features-icon" />
              <h3 className="info-title">Create grocery lists</h3>
              <p className="info-text">
                Create unlimited grocery lists to keep all your shopping
                organized.
              </p>
            </div>
          </div>
          <div className="features-card">
            <div className="centered-column-container">
              <IoIosAddCircle className="features-icon" />
              <h3 className="info-title">Add items</h3>
              <p className="info-text">
                Add the name, quantity, and category to include an item in your
                list.
              </p>
            </div>
          </div>
          <div className="features-card">
            <div className="centered-column-container">
              <FaRegListAlt className="features-icon" />
              <h3 className="info-title">Review your list</h3>
              <p className="info-text">
                Easily review all the items you've added in one place.
              </p>
            </div>
          </div>
          <div className="features-card">
            <div className="centered-column-container">
              <MdOutlineCheckBox className="features-icon" />
              <h3 className="info-title">Check off items</h3>
              <p className="info-text">
                Check off items as you shop to track your progress.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

export default Home;
