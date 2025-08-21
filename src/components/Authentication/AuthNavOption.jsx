import { useContext } from "react";
import { AuthContext } from "../../App";
import { Link } from "react-router";
import { FaRegUserCircle } from "../../utils/icons";
import SignOut from "./SignOut";

function AuthNavOption() {
  const { isSignedIn } = useContext(AuthContext);

  return (
    <>
      {isSignedIn ? (
        <SignOut />
      ) : (
        <Link to="signIn">
          <FaRegUserCircle />
        </Link>
      )}
    </>
  );
}

export default AuthNavOption;
