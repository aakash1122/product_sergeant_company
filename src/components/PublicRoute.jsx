import React from "react";

import { Redirect, Route } from "react-router";

// screen if you're not yet authenticated.
function PublicRoute({ children, ...rest }) {
  const isLoggedIn = localStorage.getItem("company-token");
  return (
    <Route
      {...rest}
      render={() =>
        !isLoggedIn ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/",
            }}
          />
        )
      }
    />
  );
}

export default PublicRoute;
