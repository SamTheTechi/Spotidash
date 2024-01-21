import React from "react";
import "./Tailwind.css";
import Login from "./pages/login";
import Tryagain from "./pages/signin";
import Dashboard from "./pages/dashboard";
import { Link, Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/tryagain" element={<Tryagain />}></Route>
      </Routes>
    </>
  );
};

export default App;
