import { useContext, useState } from "react";
import { AuthContext } from "../../App";
import { useNavigate, Link } from "react-router";
import { signOut } from "firebase/auth";
import { FaUserCircle } from "../../utils/icons";

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
    <Link to="/signIn" onClick={signOutUser}>
      <FaUserCircle />
    </Link>
  );
}

export default SignOut;
