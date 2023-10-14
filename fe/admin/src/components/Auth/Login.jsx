import { Button, Grid, Paper, TextField } from "@mui/material";
import React from "react";

const Login = () => {
  const paperStyle = {
    padding: 20,
    height: "40vh",
    width: 280,
  };
  const boxStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
  };
  const btnstyle = { margin: "8px 0" };
  return (
    <Grid style={boxStyle}>
      <Paper elevation={10} style={paperStyle}>
        <Grid align="center">
          <h2>Sign In</h2>
        </Grid>
        <TextField
          label="Username"
          placeholder="Enter username"
          variant="outlined"
          fullWidth
          required
        />
        <TextField
          label="Password"
          placeholder="Enter password"
          type="password"
          variant="outlined"
          fullWidth
          required
          sx={{ marginTop: "1em" }}
        />

        <Button
          type="submit"
          color="primary"
          variant="contained"
          style={btnstyle}
          fullWidth
        >
          Sign in
        </Button>
      </Paper>
    </Grid>
  );
};

export default Login;
