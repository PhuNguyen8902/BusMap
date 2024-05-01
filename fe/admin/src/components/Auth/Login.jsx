import { Button, Grid, Paper, TextField, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { ErrorMessage } from "@hookform/error-message";
import authService from "../../service/authService";
import { signIn } from "../../store/slices/authSlice";
import { DomainPage } from "../../page";

const initialForms = {
  field: {
    userName: "",
    password: "",
  },
};
const Login = () => {
  const dispatch = useDispatch();
  const auth = JSON.parse(localStorage.getItem("token"));
  const d = JSON.parse(localStorage.getItem("domain"));

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: initialForms.field,
  });

  useEffect(() => {
    if (d == null) {
      return <DomainPage />;
    }
    if (auth != null) {
      window.location.href = "/route";
    }
  }, [d, auth]);

  const onSubmit = async (form) => {
    const response = await authService.signIn(form);
    if (!response.error) {
      dispatch(signIn(response));
      dispatch({ type: "FETCH_INFO" });
      window.location.href = "/route";
    } else {
      setError("userName", { message: response.error });
    }
  };
  return (
    <Grid
      className="login--grid"
      component={"form"}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Paper elevation={10} className="login--paper">
        <Grid align="center">
          <h2>Sign In</h2>
        </Grid>
        <TextField
          label="Username"
          placeholder="Enter username"
          variant="outlined"
          fullWidth
          required
          {...register("userName")}
        />

        <ErrorMessage
          errors={errors}
          name={"userName"}
          render={({ message }) => (
            <Typography color="red">{message}</Typography>
          )}
        />

        <TextField
          label="Password"
          placeholder="Enter password"
          type="password"
          variant="outlined"
          fullWidth
          required
          sx={{ marginTop: "1em" }}
          {...register("password")}
        />
        <ErrorMessage
          errors={errors}
          name={"password"}
          render={({ message }) => (
            <Typography color="red">{message}</Typography>
          )}
        />
        <Button
          type="submit"
          color="primary"
          variant="contained"
          className="login--btn"
          fullWidth
        >
          Sign in
        </Button>
      </Paper>
    </Grid>
  );
};

export default Login;
