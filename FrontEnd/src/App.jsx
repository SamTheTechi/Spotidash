import React from "react";
import "./Tailwind.css";
// import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./pages/login";
import Callback from "./pages/callback";
import Dashboard from "./pages/dashboard";

const App = () => {
  return (
    // <Router>
    //   <Route path="/" exact component={Login} />
    //   <Route path="/callback" component={Callback} />
    //   <Route path="/dashboard" component={Dashboard} />
    // </Router>
    // <>
    <Login />
  );
};

export default App;
