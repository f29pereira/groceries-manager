import { useContext } from "react";
import { AuthContext } from "../../App";
import { Outlet, Navigate } from "react-router";
import SignIn from "./Form/SignIn";

function AuthRequired() {
  const { isSignedIn } = useContext(AuthContext);

  return isSignedIn ? <Outlet /> : <Navigate to="signIn" />;
}

export default AuthRequired;
