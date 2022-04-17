import React, { useState } from "react";
import PropTypes from "prop-types";
import "./Login.css";
import Container from "@mui/material/Container";
import { Paper, Avatar, Button, Grid, Typography } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Input from "./Input";

async function loginUser(credentials) {
  return fetch("https://demo.credy.in/api/v1/usermodule/login/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
}

export default function Login({ setToken }) {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  const [loginattempt, setLoginattempt] = useState(false);
  const [loginstate, setLoginstate] = useState(false);
  const [loginMessage, setLoginMessage] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword(!showPassword);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username & !password) {
      setLoginattempt(false);
      setLoginMessage("Enter username and password");
    } else {
      const token = await loginUser({
        username,
        password,
      });
      setLoginMessage("");
      setLoginattempt(true);
      if (!token.data.is_success) {
        setLoginstate(false);
      }
      console.log(token.data);
      setToken(token.data);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper className="paper" elevation={6}>
        <Avatar className="avatar" sx={{ backgroundColor: "crimson" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography mt={2} mb={3} component="h1" variant="h5">
          Login to continue
        </Typography>
        <form className="form" onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Input
              name="username"
              label="Username"
              handleChange={(e) => setUserName(e.target.value)}
              autoFocus
            />
            <Input
              name="password"
              label="Password"
              handleChange={(e) => setPassword(e.target.value)}
              type={showPassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
            />
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ marginTop: "15px" }}
            className="submit"
          >
            Log In
          </Button>
        </form>
        {loginMessage}
        {loginattempt
          ? loginstate
            ? "Login is successful"
            : "Incorrect credentials. Try again"
          : ""}
      </Paper>
    </Container>
  );
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
};
