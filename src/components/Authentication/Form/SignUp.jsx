import { useState, useContext } from "react";
import { AuthContext } from "../../../App";
import { useNavigate } from "react-router";
import { auth } from "../../../firebase/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { handleInputChange, showError } from "../../../utils/utils";
import { FaUserPlus } from "../../../utils/icons";
import Card from "../../Elements/Card";
import UserForm from "./UserForm";
import Footer from "../../Static/Footer";

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
        setCurrentUser(userCredential.user);
        setisSignedIn((prev) => !prev);
        navigate("/groceries/list");
      })
      .catch((error) => {
        showError(error, setErrorMsg);
      });
  };

  return (
    <>
      <Card
        showGoBack={false}
        titleIcon={<FaUserPlus />}
        titleText="Sign Up"
        body={
          <UserForm
            handleOnSubmit={signUpUser}
            description="Create an account to access your groceries list"
            errorMsg={errorMsg}
            handleChange={handleChange}
            formData={signUpFormData}
            submitBtnTxt="Sign Up"
          />
        }
      />
      <Footer />
    </>
  );
}

export default SignUp;
