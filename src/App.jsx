import { useState, createContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import Nav from "./components/Nav/Nav";
import Home from "./components/Static/Home";
import SignUp from "./components/Authentication/Form/SignUp";
import SignIn from "./components/Authentication/Form/SignIn";
import AuthRequired from "./components/Authentication/AuthRequired";
import GroceriesList from "./components/Groceries/GroceriesList";
import AddItem from "./components/Groceries/Form/AddItem/AddItem";
import RemoveItem from "./components/Groceries/RemoveItem";
import Profile from "./components/Authentication/Profile";
import NotFound from "./components/Errors/NotFound";

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
              <Route path="groceries">
                <Route path="list" element={<GroceriesList />} />
                <Route path="addItem" element={<AddItem />} />
                <Route path="removeItem/:id" element={<RemoveItem />} />
              </Route>
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
