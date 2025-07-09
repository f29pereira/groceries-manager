import { useContext } from "react";
import { AuthContext } from "../../App";
import { useNavigate, Link } from "react-router";
import { setInputError } from "../../utils/utils";
import { signOut } from "firebase/auth";

function SignOut() {
  const navigate = useNavigate();

  const { setisSignedIn, setCurrentUser } = useContext(AuthContext);

  const signOutUser = () => {
    signOut(auth)
      .then(() => {
        setCurrentUser(null);
        setisSignedIn((prev) => !prev);
        navigate("/");
      })
      .catch((error) => {
        console.log(error.code);
      });
  };

  return (
    <Link to="/signIn" className="auth-option" onClick={signOutUser}>
      Sign Out
    </Link>
  );
}

export default SignOut;
