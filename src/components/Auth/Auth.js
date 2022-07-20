import React, { useEffect, useState } from "react";
import {
  Avatar,
  Button,
  Paper,
  Typography,
  Container,
} from "@material-ui/core";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import useStyles from "./styles";
import { Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import Input from "./Input";
import { register, signIn } from "../../actions/user";
import { useNavigate } from "react-router-dom";

function Auth() {
  const initialState = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const [isSignUp, setIsSignUp] = useState(false);
  const classes = useStyles();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const reset = () => {
    setFormData(initialState);
  };

  const signUp = () => {
    if (formData.confirmPassword.substring(0) === formData.password) {
      dispatch(register(formData));
      reset();
    } else {
      return alert(
        "Confirm password must be equal to password. Please verify your password"
      );
    }
  };

  const signInUser = () => {
    dispatch(signIn(formData));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignUp) {
      signUp();
    } else {
      signInUser();
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const switchMode = () => {
    setIsSignUp(!isSignUp);
  };

  useEffect(() => {
    return user ? navigate("/") : navigate("/auth");
  }, [user]);

  return (
    <Container component={"main"} maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5">{isSignUp ? "Sign up" : "Sign in"}</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignUp && (
              <>
                <Input
                  name="firstName"
                  label="first name"
                  value={formData.firstName}
                  handleChange={handleChange}
                  autoFocus
                  half
                />
                <Input
                  name="lastName"
                  label="Last name"
                  value={formData.lastName}
                  handleChange={handleChange}
                  half
                />
              </>
            )}
            <Input
              name={"email"}
              label="Email Address"
              value={formData.email}
              handleChange={handleChange}
              type="email"
            />
            <Input
              name={"password"}
              label="Password Address"
              value={formData.password}
              handleChange={handleChange}
              type={showPassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
            />
            {isSignUp && (
              <Input
                name={"confirmPassword"}
                label="Repeat Password"
                value={formData.confirmPassword}
                handleChange={handleChange}
                type="password"
              />
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              {isSignUp ? "Sign up" : "Sign in"}
            </Button>
            <Grid container justifyContent={"flex-end"}>
              <Grid item>
                <Button onClick={switchMode} size={"small"}>
                  {isSignUp
                    ? "Already have an account? Sign in "
                    : "Don't have account? Sign up"}
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
}

export default Auth;
