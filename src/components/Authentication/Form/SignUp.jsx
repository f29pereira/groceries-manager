import { useState, useContext } from "react";
import { useNavigate } from "react-router";
import { auth } from "../../../firebase/firebase";
import { AuthContext } from "../../../App";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { handleInputChange, setInputError } from "../../../utils/utils";
import UserForm from "./UserForm";

function SignUp() {
  const { setisSignedIn, setCurrentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [signUpFormData, setSignUpFormData] = useState({
    email: "",
    password: "",
  });

  const [errorMsg, setErrorMsg] = useState({
    generic: "",
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    handleInputChange(event, setSignUpFormData);
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
        setInputError(error.code, setErrorMsg);
      });
  };

  return (
    <UserForm
      handleOnSubmit={signUpUser}
      title="Sign Up"
      errorMsg={errorMsg}
      handleChange={handleChange}
      formData={signUpFormData}
    />
  );
}

export default SignUp;
