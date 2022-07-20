import React from "react";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { applyMiddleware, createStore, compose } from "redux";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { createTheme } from "@mui/material";
import { ThemeProvider } from "@mui/system";
import reducers from "./reducers";
import { BrowserRouter as Router } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));

const theme = createTheme({});

const store = createStore(reducers, compose(applyMiddleware(thunk)));

root.render(
  <Provider store={store}>
    <Router>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Router>
  </Provider>
);
