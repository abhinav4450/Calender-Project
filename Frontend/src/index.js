import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import ContextWrapper from "./context/ContextWrapper";
import { Auth0Provider } from "@auth0/auth0-react";
ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider
    domain="dev-tdqb16rl6wqu41cr.us.auth0.com"
    clientId="08m0aWELDQoGmTknvaqEL90YsibnQXRP"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >
      <ContextWrapper>
        <App />
      </ContextWrapper>
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
