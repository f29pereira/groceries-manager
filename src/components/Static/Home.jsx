import { NavLink } from "react-router";

function Home() {
  return (
    <main id="home-main">
      <header id="home-header">
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
          Interested ? Sign up
          <span id="sign-up-link">
            <NavLink to="/profile">here</NavLink>
          </span>
        </p>
      </section>
    </main>
  );
}

export default Home;
