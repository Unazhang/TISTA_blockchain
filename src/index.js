import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import CssBaseline from "@material-ui/core/CssBaseline";
import "./styles.css";
import './index.css';

const rootElement = document.getElementById("root");

ReactDOM.render(
  <>
    <CssBaseline />
    <App />
  </>,
  rootElement
);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
