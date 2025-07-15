import { useContext } from "react";
import { AuthContext } from "../../App";
import { Link } from "react-router";
import SignOut from "./SignOut";

function AuthNavOption() {
  const { isSignedIn } = useContext(AuthContext);

  return (
    <>
      {isSignedIn ? (
        <SignOut />
      ) : (
        <Link to="signIn" className="auth-option">
          Sign In
        </Link>
      )}
    </>
  );
}

export default AuthNavOption;
