import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../../App";
import { useNavigate, Link } from "react-router";
import { auth } from "../../../firebase/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import {
  handleInputChange,
  showError,
  validatePassword,
} from "../../../utils/utils";
import ImageWithContent from "../../Elements/ImageWithContent";
import UserForm from "./UserForm";

function SignUp() {
  //useContext Hooks
  const { setisSignedIn, setCurrentUser } = useContext(AuthContext);

  //useNavigate Hooks
  const navigate = useNavigate();

  //useState Hooks
  const [signUpFormData, setSignUpFormData] = useState({
    email: "",
    password: "",
  });
  const [errorMsg, setErrorMsg] = useState({
    generic: "",
    email: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  //useEffect Hook
  // Removes password input errorMsg when password meets requirements
  useEffect(() => {
    if (
      errorMsg.password.length > 0 &&
      validatePassword(signUpFormData.password)
    ) {
      setErrorMsg((prev) => ({
        ...prev,
        password: "",
      }));
    }
  }, [signUpFormData.password]);

  const handleChange = (event) => {
    handleInputChange(event, setSignUpFormData);
  };

  const signUpUser = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    createUserWithEmailAndPassword(
      auth,
      signUpFormData.email,
      signUpFormData.password
    )
      .then((userCredential) => {
        setCurrentUser(userCredential.user);
        setisSignedIn((prev) => !prev);
        navigate("/myLists");
      })
      .catch((error) => {
        showError(error, setErrorMsg);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <main className="auth-background">
      <ImageWithContent
        type="signup"
        imgSrc="src\assets\images\static\unsplash_kiwi.jpg"
        imgAlt="Kiwi in yellow background"
        content={
          <>
            <UserForm
              type="signup"
              handleOnSubmit={signUpUser}
              description="Create an account"
              errorMsg={errorMsg}
              handleChange={handleChange}
              formData={signUpFormData}
              showPasswordRules={true}
              submitBtnTxt="Sign Up"
              isSubmitting={isSubmitting}
              submittingBtnTxt="Signing Up"
            />
            <div className="centered-column-container">
              <p className="signin-link-text">Already have an account ?</p>
              <Link to="/signIn" className="click-link">
                Sign in here
              </Link>
            </div>
          </>
        }
      />
    </main>
  );
}

export default SignUp;
