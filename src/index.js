import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import App from "./App";
import CssBaseline from "@material-ui/core/CssBaseline";
import "./styles.css";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <BrowserRouter>
    <AuthProvider>
      <CssBaseline />
      <App />
    </AuthProvider>
  </BrowserRouter>,
  rootElement
);
