import React, { useState } from "react";
import {
  Container,
  TextField,
  Box,
  Typography,
  Button,
  CircularProgress,
  makeStyles,
} from "@material-ui/core";
import { authAxios } from "../config/axiosConfig";

import { useMutation } from "react-query";
import { Alert } from "@material-ui/lab";
import { useHistory } from "react-router";

const Login = ({ setLoggedIn }) => {
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { mutate, isLoading, isSuccess, isError, data } = useMutation(
    async (data) => {
      const resp = await authAxios.post("/login", data);
      return resp?.data;
    },
    {
      onSuccess: (data) => {
        localStorage.setItem("company-token", JSON.stringify(data));
        setLoggedIn(true);
        history.push("/");
      },
    }
  );

  const handleLogin = (e) => {
    e.preventDefault();
    mutate({ email, password });
  };

  const classes = useStyles();

  return (
    <div>
      <Container>
        <Box className={classes.wrapper}>
          <Typography variant="h6" className={classes.txt}>
            {" "}
            Login
          </Typography>
          {isError && <Alert severity="error">Credentials did not match</Alert>}
          <form onSubmit={handleLogin}>
            <Box display="flex" flexDirection="column">
              <TextField
                type="email"
                id="outlined-basic"
                label="Email"
                variant="outlined"
                required
                onChange={(e) => setEmail(e.target.value)}
                className={classes.input}
              />
              <TextField
                type="password"
                id="outlined-basic"
                label="Password"
                variant="outlined"
                required
                onChange={(e) => setPassword(e.target.value)}
                className={classes.input}
              />
              {isLoading ? (
                <CircularProgress className={classes.spinner} />
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  size="large"
                  className={classes.btn}
                >
                  Login
                </Button>
              )}
            </Box>
          </form>
          <Box mt={2} display="flex" alignItems="center">
            <Typography>Don't have an account ?</Typography>
            <Button
              variant="text"
              color="primary"
              onClick={() => history.push("/register")}
            >
              Register
            </Button>
          </Box>
        </Box>
      </Container>
    </div>
  );
};

export default Login;

const useStyles = makeStyles((theme) => ({
  wrapper: {
    width: "min(500px,95%)",
    margin: "60px auto 0px",
    background: "#fff",
    padding: "30px",
    borderRadius: 15,
    boxShadow: "10px 1px 25px 10px rgb(226 221 221 / 75%)",
  },
  input: {
    margin: "10px 0px",
  },
  formWrapper: {},
  btn: {
    marginTop: 20,
  },
  txt: {
    fontSize: 22,
    textAlign: "center",
    marginBottom: 10,
  },
  spinner: {
    display: "block",
    margin: "20px auto",
  },
}));
