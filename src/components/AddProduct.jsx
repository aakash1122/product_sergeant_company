import React, { useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { useMutation } from "react-query";
import { userAxios } from "../config/axiosConfig";
import { Alert } from "@material-ui/lab";

import dayjs from "dayjs";
import DayjsUtil from "@date-io/dayjs";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [origin, setOrigin] = useState("");
  const [vendor, setVendor] = useState("");
  const [upc, setUpc] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());

  const { mutate, isLoading, isSuccess, isError } = useMutation(
    async (data) => {
      const resp = await userAxios.post("/products/new", { product: data });
    }
  );

  const handleProductSubmit = (e) => {
    e.preventDefault();
    mutate({
      name: name,
      origin: origin,
      vendor: vendor,
      expiry_date: dayjs(selectedDate).format("DD/MM/YYYY"),
      upc: upc,
    });
  };

  const classes = useStyles();

  return (
    <div>
      <Container>
        <Box className={classes.wrapper}>
          <Typography variant="h6" className={classes.txt}>
            Insert New Product
          </Typography>
          {isError && (
            <Alert severity="error" style={{ margin: "10px 0px" }}>
              Something went wrong! please try again
            </Alert>
          )}
          {isSuccess && (
            <Alert tyle={{ margin: "10px 0px" }}>
              Product has been added succesfully
            </Alert>
          )}

          <form onSubmit={handleProductSubmit}>
            <Box
              display="flex"
              flexDirection="column"
              className={classes.formWrapper}
            >
              <TextField
                type="text"
                variant="outlined"
                label="Product name"
                required
                className={classes.input}
                onChange={(e) => setName(e.target.value)}
              />
              <TextField
                type="text"
                variant="outlined"
                label="Product Origin"
                required
                className={classes.input}
                onChange={(e) => setOrigin(e.target.value)}
              />
              <TextField
                type="text"
                variant="outlined"
                label="Product Vendor"
                required
                className={classes.input}
                onChange={(e) => setVendor(e.target.value)}
              />
              <MuiPickersUtilsProvider utils={DayjsUtil}>
                <KeyboardDatePicker
                  margin="normal"
                  id="date-picker-dialog"
                  label="Product Expiry Date"
                  format="DD/MM/YYYY"
                  value={selectedDate}
                  onChange={(v) => {
                    setSelectedDate(v);
                  }}
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                />
              </MuiPickersUtilsProvider>
              <TextField
                type="number"
                required
                variant="outlined"
                label="Product UPC"
                className={classes.input}
                onChange={(e) => setUpc(e.target.value)}
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
                  Submit
                </Button>
              )}
            </Box>
          </form>
        </Box>
      </Container>
    </div>
  );
};

export default AddProduct;

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
