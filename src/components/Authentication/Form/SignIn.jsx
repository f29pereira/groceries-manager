import { useContext, useState } from "react";
import { AuthContext } from "../../../App";
import { useNavigate, Link } from "react-router";
import { auth } from "../../../firebase/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { handleInputChange, setInputError } from "../../../utils/utils";
import Card from "../../Elements/Card";
import UserForm from "./UserForm";
import { FaUser } from "react-icons/fa";

function SignIn() {
  const { setisSignedIn, setCurrentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [signInFormData, setSignInFormData] = useState({
    email: "",
    password: "",
  });

  const [errorMsg, setErrorMsg] = useState({
    generic: "",
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    handleInputChange(event, setSignInFormData);
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
        setInputError(error.code, setErrorMsg);
      });
  };

  return (
    <Card
      titleIcon={<FaUser />}
      titleText="Sign In"
      body={
        <>
          <UserForm
            handleOnSubmit={signInUser}
            description="Welcome back. Sign In to get acess to your custom groceries list."
            errorMsg={errorMsg}
            handleChange={handleChange}
            formData={signInFormData}
            forgotPassword={false}
            submitBtnTxt="Sign In"
          />
          <p id="create-account">Don't have an account ?</p>
          <Link to="/signUp" className="click-link">
            Sign up here
          </Link>
        </>
      }
    />
  );
}

export default SignIn;
