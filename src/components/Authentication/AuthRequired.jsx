import { useContext } from "react";
import { AuthContext } from "../../App";
import { Outlet } from "react-router";
import SignIn from "./Form/SignIn";

function AuthRequired() {
  const { isSignedIn } = useContext(AuthContext);
  return isSignedIn ? <Outlet /> : <SignIn />;
}

export default AuthRequired;
