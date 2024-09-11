import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { AuthProvider } from "react-oidc-context";
import type { User } from "oidc-client-ts";

let theme = createTheme({
  typography: {
    fontFamily: `pretendard, system-ui, sans-serif`,
  },
});

theme = createTheme(theme, {
  palette: {
    primary: {
      main: "#034287",
      dark: "#023b6d",
      light: "#023b6d",
    },
    secondary: {
      main: "#f4f6f8",
      light: "#ffffff",
      dark: "#d9dce0",
      contrastText: "#333d4b",
    },
    github: theme.palette.augmentColor({
      color: {
        main: "#24292D",
        dark: "#282D32", // 원래 색상보다 어두운건 안보여서 밝은색으로 대체
        light: "#40454a",
        contrastText: "#fafafa",
      },
      name: "github",
    }),
  },
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
    },
  },
  shape: {
    borderRadius: 7,
  },
  typography: {
    button: {
      textTransform: "none",
    },
  },
});

const oidcConfig = {
  authority: `${import.meta.env.VITE_KEYCLOAK_URL}/realms/jedutools`,
  client_id: "jedutools-portal",
  redirect_uri: `${window.location.origin}${window.location.pathname}`,
  post_logout_redirect_uri: window.location.origin,
  onSigninCallback: (_user: User | void): void => {
    window.history.replaceState({}, document.title, window.location.pathname);
  },
};

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider {...oidcConfig}>
        <App />
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>
);
