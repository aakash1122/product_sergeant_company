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
import { useHistory } from "react-router";

import { useMutation } from "react-query";
import { Alert } from "@material-ui/lab";

const Register = () => {
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { mutate, isLoading, isSuccess, isError, data } = useMutation(
    async (data) => {
      const resp = await authAxios.post("/company/register", { user: data });
      return resp?.data;
    },
    {
      onSuccess: (data) => {
        localStorage.setItem("company-token", JSON.stringify(data));
      },
    }
  );

  const handleRegister = (e) => {
    e.preventDefault();
    mutate({
      company_name: companyName,
      username: username,
      email: email,
      password: password,
      password_confirmation: confirmPassword,
    });
  };

  const classes = useStyles();

  if (isSuccess) {
    return (
      <Container>
        <Alert severity="success">
          You have registered successfully.
          <p>
            Please{" "}
            <Button variant="text" onClick={() => history.push("/login")}>
              login
            </Button>{" "}
            with your credentials
          </p>
        </Alert>
      </Container>
    );
  }

  return (
    <div>
      <Container>
        <Box className={classes.wrapper}>
          <Typography variant="h6" className={classes.txt}>
            Register Your Company
          </Typography>
          {isError && (
            <Alert severity="error">
              Something went wrong! Please provide correct information
            </Alert>
          )}

          <form onSubmit={handleRegister}>
            <Box
              display="flex"
              flexDirection="column"
              className={classes.formWrapper}
            >
              <TextField
                id="outlined-basic"
                label="Company Name"
                variant="outlined"
                required
                onChange={(e) => setCompanyName(e.target.value)}
                className={classes.input}
              />
              <TextField
                id="outlined-basic"
                label="User Name"
                variant="outlined"
                required
                onChange={(e) => setUsername(e.target.value)}
                className={classes.input}
              />
              <TextField
                id="outlined-basic"
                type="email"
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
              <TextField
                type="password"
                id="outlined-basic"
                label="Confirm Password"
                variant="outlined"
                required
                onChange={(e) => setConfirmPassword(e.target.value)}
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
                  Register
                </Button>
              )}
            </Box>
          </form>
          <Box mt={2} display="flex" alignItems="center">
            <Typography>have an account ?</Typography>
            <Button
              variant="text"
              color="primary"
              onClick={() => history.push("/login")}
            >
              Login
            </Button>
          </Box>
        </Box>
      </Container>
    </div>
  );
};

export default Register;

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
