import React from "react";

import { Redirect, Route } from "react-router";

function PrivateRoute({ children, ...rest }) {
  const isLoggedIn = localStorage.getItem("company-token");
  return (
    <Route
      {...rest}
      render={() =>
        isLoggedIn ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
            }}
          />
        )
      }
    />
  );
}
export default PrivateRoute;
