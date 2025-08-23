import { useContext } from "react";
import { AuthContext } from "../../App";
import { Link } from "react-router";
import AuthNavIconText from "./Elements/AuthNavIconText";

function AuthNavOption() {
  const { isSignedIn } = useContext(AuthContext);

  return (
    <>
      {isSignedIn ? (
        <Link to="signOut">
          <AuthNavIconText signedIn={isSignedIn} text="Sign Out" />
        </Link>
      ) : (
        <Link to="signIn">
          <AuthNavIconText signedIn={isSignedIn} text="Sign In" />
        </Link>
      )}
    </>
  );
}

export default AuthNavOption;
