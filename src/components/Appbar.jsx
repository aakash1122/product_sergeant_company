import {
  AppBar,
  Button,
  makeStyles,
  Toolbar,
  Typography,
} from "@material-ui/core";
import React, { useEffect } from "react";

import { useHistory } from "react-router-dom";

const Appbar = ({ loggedIn }) => {
  const isLoggedIn = loggedIn;

  const history = useHistory();
  const classes = useStyles();

  const handleLogout = () => {
    localStorage.removeItem("company-token");
    window.location.replace("/");
  };

  return (
    <AppBar position="static">
      <Toolbar variant="dense">
        <Typography variant="h6" color="inherit">
          Product Sergeant
        </Typography>
        {isLoggedIn && (
          <Button
            variant="contained"
            color="secondary"
            className={classes.logoutBtn}
            onClick={handleLogout}
          >
            Logout
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Appbar;

const useStyles = makeStyles((theme) => ({
  // root: {
  //   flexGrow: 1,
  // },
  // menuButton: {
  //   marginRight: theme.spacing(2),
  // },
  // title: {
  //   flexGrow: 1,
  // },
  logoutBtn: {
    marginLeft: "auto",
  },
}));
