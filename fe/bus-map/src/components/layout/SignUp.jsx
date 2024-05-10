import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import authService from "../../service/authService";
import { signIn } from "../../store/features/auth/authSlice";

export default function SignUp(props) {
  const initialForms = {
    field: {
      userName: "",
      password: "",
      confirmPassword: "",
      name: "",
      email: "",
      phone: "",
    },
  };

  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: initialForms.field,
  });
  const onSubmit = async (form) => {
    if (form.password !== form.confirmPassword) {
      setError("confirmPassword", { message: "Wrong password" });
      return;
    }
    if (!/^\d{10}$/.test(form.phone)) {
      setError("phone", { message: "Wrong phone" });
      return;
    }

    const response = await authService.signUp(form);

    if (response.mess === "User existed") {
      setError("userName", { message: response.mess });
      return;
    } else {
      alert("Successful registration");
    }
    props.onChange(null, "1");
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          sx={{ mt: 1 }}
        >
          <TextField
            margin="normal"
            fullWidth
            label="Username"
            autoFocus
            required
            {...register("userName", {
              required: "username is required",
            })}
          />
          <ErrorMessage
            errors={errors}
            name={"userName"}
            render={({ message }) => (
              <Typography color="red">{message}</Typography>
            )}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            {...register("password", {
              required: "password is required",
            })}
          />
          <ErrorMessage
            errors={errors}
            name={"password"}
            render={({ message }) => (
              <Typography color="red">{message}</Typography>
            )}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="comfirmPassword"
            label="Comfirm password"
            type="password"
            id="comfirmPassword"
            {...register("confirmPassword")}
            // autoComplete="current-password"
          />
          <ErrorMessage
            errors={errors}
            name={"confirmPassword"}
            render={({ message }) => (
              <Typography color="red">{message}</Typography>
            )}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="Name"
            name="name"
            autoComplete="name"
            autoFocus
            {...register("name", {
              required: "name is required",
            })}
          />
          <ErrorMessage
            errors={errors}
            name={"name"}
            render={({ message }) => (
              <Typography color="red">{message}</Typography>
            )}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="email"
            label="Email"
            type="email"
            id="email"
            {...register("email", {
              required: "email is required",
            })}
          />
          <ErrorMessage
            errors={errors}
            name={"email"}
            render={({ message }) => (
              <Typography color="red">{message}</Typography>
            )}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="phone"
            label="Phone"
            type="phone"
            id="phone"
            autoComplete="current-password"
            {...register("phone", {
              required: "phone is required",
            })}
          />
          <ErrorMessage
            errors={errors}
            name={"phone"}
            render={({ message }) => (
              <Typography color="red">{message}</Typography>
            )}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
