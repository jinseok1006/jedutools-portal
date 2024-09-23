import router from "./router";
import { RouterProvider } from "react-router-dom";
import { KeycloakProvider } from "./context/KeycloakContext";

function App() {
  return (
    <KeycloakProvider>
      <RouterProvider router={router} />
    </KeycloakProvider>
  );
}

export default App;
