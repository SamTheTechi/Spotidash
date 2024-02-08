import React from "react";
import "./Tailwind.css";
import Login from "./pages/login";
import Dashboard from "./pages/Dashboard/dashboard";
import DiscoverWeekly from "./pages/weekly";
import FilterBlend from "./pages/blend";
import DeepSearch from "./pages/search";
import { Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />}></Route>
      <Route path="/dashboard" element={<Dashboard />}></Route>
      <Route path="/dashboard/weekly" element={<DiscoverWeekly />}></Route>
      <Route path="/dashboard/blend" element={<FilterBlend />}></Route>
      <Route path="/dashboard/search" element={<DeepSearch />}></Route>
    </Routes>
  );
};

export default App;
