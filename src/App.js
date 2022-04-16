// import { useState, useEffect } from "react";
import React from "react";
import { Routes, Route } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
import "./App.css";
import Home from "./Components/Home/Home";
import Login from "./Components/Login/Login";
import useToken from "./useToken";
import { AppBar, Typography } from "@mui/material";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import { useTheme, ThemeProvider, createTheme } from "@mui/material/styles";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import Paper from "@mui/material/Paper";

import memoriesLogo from "./images/movies-icon.png";

const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

function App() {
  const { token, setToken } = useToken();
  // console.log(token);
  const theme = useTheme();

  const colorMode = React.useContext(ColorModeContext);

  if (!token) {
    return <Login setToken={setToken} />;
  }

  return (
    <Paper elevation={0}>
      <AppBar
        className="appBar"
        position="static"
        color="inherit"
        sx={{ flexDirection: "row", marginTop: "5px" }}
      >
        <Container
          sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
        >
          <img src={memoriesLogo} alt="icon" height="40px" />
          <Typography variant="h6" ml={2}>
            OneFin Movies App
          </Typography>
        </Container>
        {/* {theme.palette.mode} mode */}
        <IconButton
          sx={{ ml: 1 }}
          onClick={colorMode.toggleColorMode}
          color="inherit"
          className="toolBar"
        >
          {theme.palette.mode === "dark" ? (
            <Brightness7Icon />
          ) : (
            <Brightness4Icon />
          )}
        </IconButton>
      </AppBar>

      <Routes>
        <Route path="/" element={<Home token={token} />} />
      </Routes>
    </Paper>
  );
}

export default function ToggleColorMode() {
  const [mode, setMode] = React.useState("light");
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
