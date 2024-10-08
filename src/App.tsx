import { KeycloakProvider } from "./context/KeycloakContext";
import router from "./router";

import { RouterProvider } from "react-router-dom";

function App() {
  return (
    <KeycloakProvider>
      <RouterProvider router={router} />
    </KeycloakProvider>
  );
}

export default App;
