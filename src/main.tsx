import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthProvider } from "react-oidc-context";
import type { User } from "oidc-client-ts";
import "@/index.css";

const oidcConfig = {
  authority: `${import.meta.env.VITE_KEYCLOAK_URL}/realms/${
    import.meta.env.VITE_KEYCLOAK_REALMS
  }`,
  client_id: "jedutools-portal",
  redirect_uri: `${window.location.origin}${window.location.pathname}`,
  post_logout_redirect_uri: window.location.origin,
  onSigninCallback: (_user: User | void): void => {
    window.history.replaceState({}, document.title, window.location.pathname);
  },
};

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <AuthProvider {...oidcConfig}>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
