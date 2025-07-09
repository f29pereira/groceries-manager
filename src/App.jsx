import { useState, createContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import Nav from "./components/Nav/Nav";
import Home from "./components/Static/Home";
import NotFound from "./components/Static/NotFound";
import AuthRequired from "./components/Authentication/AuthRequired";
import GroceriesList from "./components/groceries/GroceriesList";
import SignUp from "./components/Authentication/SignUp";
import SignIn from "./components/Authentication/SignIn";
import Profile from "./components/Authentication/Profile";

export const AuthContext = createContext();

function App() {
  const [isSignedIn, setisSignedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  return (
    <BrowserRouter>
      <AuthContext
        value={{ isSignedIn, setisSignedIn, currentUser, setCurrentUser }}
      >
        <Routes>
          <Route path="/" element={<Nav />}>
            <Route index element={<Home />} />
            <Route path="signUp" element={<SignUp />} />
            <Route path="signIn" element={<SignIn />} />

            <Route element={<AuthRequired />}>
              <Route path="groceries" element={<GroceriesList />} />
              <Route path="profile" element={<Profile />} />
            </Route>
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthContext>
    </BrowserRouter>
  );
}

export default App;
