import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

//import all routes as AppRoutes

import Profile from "./profile.jsx";
import Details from "./Details.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Profile />} />
        <Route path="/detail" element={<Details />} />
      </Routes>
    </BrowserRouter>
  );
}
