import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import Nav from "./components/Nav/Nav";
import Home from "./components/Static/Home";
import NotFound from "./components/Static/NotFound";
import GroceriesList from "./components/groceries/GroceriesList";
import Profile from "./components/Authentication/Profile";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Nav />}>
          <Route index element={<Home />} />
          <Route path="groceries" element={<GroceriesList />} />
          <Route path="profile" element={<Profile />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
