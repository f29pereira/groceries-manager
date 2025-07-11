import { Link } from "react-router";

function Home() {
  return (
    <main className="main home">
      <header className="header home">
        <h1 id="home-title">
          Manage your <span id="green-text">Groceries</span>
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
          Create your custom groceries list and buy only what you really need.
        </p>

        <p className="home-text">
          Interested ?
          <Link to="/signUp" className="click-link sign-up-home">
            Sign up here
          </Link>
        </p>
      </section>
    </main>
  );
}

export default Home;
