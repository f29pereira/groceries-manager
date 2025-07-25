import { useState, createContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import Nav from "./components/Nav/Nav";
import Home from "./components/Static/Home";
import SignUp from "./components/Authentication/Form/SignUp";
import SignIn from "./components/Authentication/Form/SignIn";
import AuthRequired from "./components/Authentication/AuthRequired";
import ErrorBoundary from "./components/ErrorHandling/ErrorBoundary/ErrorBoundary";
import List from "./components/Lists/List";
import UserLists from "./components/Lists/UserLists";
import AddGroceriesList from "./components/Lists/GroceriesList/Form/AddGroceriesList";
import Groceries from "./components/Lists/GroceriesList/Groceries";
import GroceriesList from "./components/Lists/GroceriesList/GroceriesList";
import EditGroceriesList from "./components/Lists/GroceriesList/Form/EditGroceriesList";
import RemoveGroceriesList from "./components/Lists/GroceriesList/RemoveGroceriesList";
import AddItem from "./components/Lists/Item/Form/AddItem";
import EditItem from "./components/Lists/Item/Form/EditItem";
import RemoveItem from "./components/Lists/Item/RemoveItem";
import Profile from "./components/Authentication/Profile";
import NotFound from "./components/ErrorHandling/Errors/NotFound";

export const AuthContext = createContext();

function App() {
  const [isSignedIn, setisSignedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [isError, setIsError] = useState(false);

  return (
    <BrowserRouter>
      <AuthContext
        value={{
          isSignedIn,
          setisSignedIn,
          currentUser,
          setCurrentUser,
          isError,
          setIsError,
        }}
      >
        <Routes>
          <Route path="/" element={<Nav />}>
            <Route index element={<Home />} />
            <Route path="signUp" element={<SignUp />} />
            <Route path="signIn" element={<SignIn />} />

            <Route element={<AuthRequired />}>
              <Route
                path="myLists"
                element={
                  <ErrorBoundary>
                    <List />
                  </ErrorBoundary>
                }
              >
                <Route index element={<UserLists />} />
                <Route path="addList" element={<AddGroceriesList />} />

                <Route path="groceryList/:id" element={<Groceries />}>
                  <Route index element={<GroceriesList />} />
                  <Route path="edit" element={<EditGroceriesList />} />
                  <Route path="remove" element={<RemoveGroceriesList />} />
                  <Route path="addItem" element={<AddItem />} />
                  <Route path="editItem/:id" element={<EditItem />} />
                  <Route path="removeItem/:id" element={<RemoveItem />} />
                </Route>
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
