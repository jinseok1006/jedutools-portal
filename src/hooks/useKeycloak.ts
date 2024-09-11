import { useState } from "react";
import { useAuth, hasAuthParams } from "react-oidc-context";

export default function useKeycloak() {
  const auth = useAuth();
  const [hasTriedSignin, setHasTriedSignin] = useState(false);

  const handleLogin = async () => {
    if (
      !(
        hasAuthParams() ||
        auth.isAuthenticated ||
        auth.activeNavigator ||
        auth.isLoading ||
        hasTriedSignin
      )
    ) {
      void auth.signinRedirect();
      setHasTriedSignin(true);
    }
  };
  const handleLogout = () => void auth.signoutRedirect();
  const username = auth.user?.profile.preferred_username;

  return {
    isAuthenticated: auth.isAuthenticated,
    isLoading: auth.isLoading,
    hasTriedSignin,
    handleLogin,
    handleLogout,
    username,
  } as const;
}
