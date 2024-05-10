import React from 'react'
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useDispatch } from 'react-redux';
import authService from '../../service/authService';
import { signIn } from '../../store/features/auth/authSlice';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { ErrorMessage } from '@hookform/error-message';

export default function Login() {

    const initialForms = {
        field: {
            userName: "",
            password: "",
        },
    };

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {
      register,
      handleSubmit,
      setError,
      formState: { errors },
    } = useForm({
      defaultValues: initialForms.field,
    });
    const onSubmit = async (form) => {
      const response = await authService.signIn(form);
      if (!response.error) {
        dispatch(signIn(response));
        dispatch({ type: "FETCH_INFO" });
        // window.location.href = "/";
        navigate("/home")
      } else {
        setError("userName", { message: response.error });
      }
    };

    // const handleLogin = (event) => {
    //     event.preventDefault();
    //     const data = new FormData(event.currentTarget);
    //     console.log({
    //         email: data.get("email"),
    //         password: data.get("password"),
    //     });
    // };


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
                    Sign in
                </Typography>
                <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="userName"
                        label="Username"
                        name="userName"
                        autoComplete="userName"
                        autoFocus
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
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign In
                    </Button>

                </Box>
            </Box>
        </Container>
    )
}
