import { useState, useContext } from "react";
import { useNavigate } from "react-router";
import { auth } from "../../firebase/firebase";
import { AuthContext } from "../../App";
import { createUserWithEmailAndPassword } from "firebase/auth";

function SignUp() {
  const [signUpFormData, setSignUpFormData] = useState({
    email: "",
    password: "",
  });

  const { setisSignedIn, setCurrentUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setSignUpFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const signUpUser = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(
      auth,
      signUpFormData.email,
      signUpFormData.password
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
        <form onSubmit={signUpUser} className="form-container">
          <h1>Sign Up</h1>

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
              value={signUpFormData.email}
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
              value={signUpFormData.password}
            />
          </div>

          <button type="submit" className="submit-btn">
            Sign Up
          </button>
        </form>
      </section>
    </main>
  );
}

export default SignUp;
