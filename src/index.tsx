import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App";
import { BrowserRouter as Router } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import { store } from "./store/store";
import { Provider as StoreProvider } from "react-redux";

ReactDOM.render(
  <React.StrictMode>
    <StoreProvider store={store}>
      <Router>
        <App />
      </Router>
    </StoreProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
