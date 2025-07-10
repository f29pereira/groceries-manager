import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router";
import { auth } from "../../../firebase/firebase";
import { AuthContext } from "../../../App";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { handleInputChange, setInputError } from "../../../utils/utils";
import Card from "../../Elements/Card";
import UserForm from "./UserForm";
import { FaUserPlus } from "react-icons/fa";

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
        console.log(error.code);
        setInputError(error.code, setErrorMsg);
      });
  };

  return (
    <Card
      titleIcon={<FaUserPlus />}
      titleText="Sign Up"
      body={
        <UserForm
          handleOnSubmit={signUpUser}
          description="Create an account to access your groceries list"
          errorMsg={errorMsg}
          handleChange={handleChange}
          formData={signUpFormData}
          forgotPassword={true}
          submitBtnTxt="Sign Up"
        />
      }
    />
  );
}

export default SignUp;
