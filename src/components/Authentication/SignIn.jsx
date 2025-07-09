import { useContext, useState } from "react";
import { AuthContext } from "../../App";
import { useNavigate } from "react-router";
import { NavLink } from "react-router";
import { auth } from "../../firebase/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

function SignIn() {
  const [signInFormData, setSignInFormData] = useState({
    email: "",
    password: "",
  });

  const { setisSignedIn, setCurrentUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setSignInFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const signInUser = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(
      auth,
      signInFormData.email,
      signInFormData.password
    )
      .then((userCredential) => {
        const user = userCredential.user;
        setCurrentUser(user);
        setisSignedIn((prev) => !prev);
        navigate("/groceries");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("Error was catched:");
        console.log(errorCode);
        console.log(errorMessage);
        console.log("End Error");

        //TO DO: errorMessage state + render error message
      });
  };

  return (
    <main id="main-form">
      <section id="section-form">
        <form onSubmit={signInUser} className="form-container">
          <h1>Sign In</h1>

          <div className="input-container">
            <label htmlFor="user-email" className="form-label">
              Email
            </label>
            <input
              id="user-email"
              type="email"
              className="form-input"
              required
              name="email"
              onChange={handleInputChange}
              value={signInFormData.email}
            />
            <label htmlFor="user-password" className="form-label">
              Password
            </label>
            <input
              id="user-password"
              type="password"
              className="form-input"
              required
              name="password"
              onChange={handleInputChange}
              value={signInFormData.password}
            />
          </div>

          <button type="submit" className="submit-btn">
            Sign In
          </button>

          <p id="create-account">Don't have an account ?</p>
          <NavLink to="/signUp" className="sign-up-link">
            Sign up here
          </NavLink>
        </form>
      </section>
    </main>
  );
}

export default SignIn;
