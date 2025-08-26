import { useContext, useState } from "react";
import { AuthContext } from "../../App";
import { useNavigate } from "react-router";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import GMLogo from "../Elements/GMLogo";
import LinkButton from "../Elements/LinkButton";
import ImageWithContent from "../Elements/ImageWithContent";

function SignOut() {
  //useContext Hook
  const { setisSignedIn, setCurrentUser } = useContext(AuthContext);

  //useState Hook
  const [error, setError] = useState(null);

  //useNavigate Hook
  const navigate = useNavigate();

  const signOutUser = () => {
    signOut(auth)
      .then(() => {
        setCurrentUser(null);
        setisSignedIn((prev) => !prev);
        navigate("/");
      })
      .catch((error) => {
        setIsNavHidden(true);
        setError(error);
      });
  };

  return (
    <main className="auth-background">
      <ImageWithContent
        type="signout"
        imgSrc="src\assets\images\static\unsplash_cherry.jpg"
        imgAlt="Cherry in blue background"
        content={
          <div className="centered-container">
            <div className="centered-column-container">
              <GMLogo />
              <p className="sign-out-text">Do you wish to Sign out ?</p>

              <div className="centered-container submit-cancel-btns">
                <button
                  type="submit"
                  className="btn green"
                  onClick={signOutUser}
                >
                  Yes
                </button>
                <LinkButton
                  path="/myLists"
                  classNames="red"
                  name="No, go back"
                />
              </div>
            </div>
          </div>
        }
      />
    </main>
  );
}

export default SignOut;
