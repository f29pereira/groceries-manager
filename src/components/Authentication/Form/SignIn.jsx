import { useContext, useState } from "react";
import { AuthContext } from "../../../App";
import { useNavigate, Link } from "react-router";
import { auth } from "../../../firebase/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { handleInputChange, showError } from "../../../utils/utils";
import ImageWithContent from "../../Elements/ImageWithContent";
import UserForm from "./UserForm";

function SignIn() {
  //useContext Hooks
  const { setisSignedIn, setCurrentUser } = useContext(AuthContext);

  //useState Hooks
  const [signInFormData, setSignInFormData] = useState({
    email: "",
    password: "",
  });
  const [errorMsg, setErrorMsg] = useState({
    generic: "",
    email: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  //useNavigate Hook
  const navigate = useNavigate();

  const handleChange = (event) => {
    handleInputChange(event, setSignInFormData);
  };

  const signInUser = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    signInWithEmailAndPassword(
      auth,
      signInFormData.email,
      signInFormData.password
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
    <>
      <main>
        <div>
          <ImageWithContent
            imgSrc="src\assets\images\static\unsplash_strawberry.jpg"
            imgAlt="Strawberry in yellow background"
            content={
              <>
                <UserForm
                  handleOnSubmit={signInUser}
                  description="Welcome back"
                  errorMsg={errorMsg}
                  handleChange={handleChange}
                  formData={signInFormData}
                  forgotPassword={false}
                  showRequiredFields={false}
                  showPasswordRules={false}
                  submitBtnTxt="Sign In"
                  isSubmitting={isSubmitting}
                  submittingBtnThx="Signing In"
                />
                <div className="centered-column-container">
                  <p id="create-account">Don't have an account ?</p>
                  <Link to="/signUp" className="click-link">
                    Sign up here
                  </Link>
                </div>
              </>
            }
          />
        </div>
      </main>
    </>
  );
}

export default SignIn;
