import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

import App from "./App";

ReactDOM.render(
  <MuiThemeProvider theme={createMuiTheme()}>
    <App />
  </MuiThemeProvider>,
  document.getElementById("root")
);
