import React, { useEffect, useState } from "react";
import Login from "./components/Login";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Register from "./components/Register";
import Appbar from "./components/Appbar";
import PublicRoute from "./components/PublicRoute";
import PrivateRoute from "./components/PrivateRoute";
import AddProduct from "./components/AddProduct";
import { updateAxiosToken } from "./config/axiosConfig";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("company-token")) {
      updateAxiosToken();
      setLoggedIn(true);
    }
  });

  return (
    <div>
      <Router>
        <Appbar loggedIn={loggedIn} />
        <Switch>
          <PrivateRoute exact path="/">
            <AddProduct />
          </PrivateRoute>
          <PublicRoute path="/login">
            <Login setLoggedIn={setLoggedIn} />
          </PublicRoute>
          <PublicRoute path="/register">
            <Register />
          </PublicRoute>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
