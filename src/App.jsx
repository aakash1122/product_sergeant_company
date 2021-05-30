import React, { useState } from "react";
import Login from "./components/Login";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Register from "./components/Register";
import Appbar from "./components/Appbar";
import PublicRoute from "./components/PublicRoute";
import PrivateRoute from "./components/PrivateRoute";
import AddProduct from "./components/AddProduct";

function App() {
  return (
    <div>
      <Router>
        <Appbar />
        <Switch>
          <PrivateRoute exact path="/">
            <AddProduct />
          </PrivateRoute>
          <PublicRoute path="/login">
            <Login />
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
