import { useEffect, useState } from "react";
import { useAuth, hasAuthParams } from "react-oidc-context";
import { useNavigate } from "react-router-dom";

export default function useKeycloak() {
  const auth = useAuth();
  const navigate = useNavigate();
  const [hasTriedSignin, setHasTriedSignin] = useState(false);

  const silentLogin = async () => {
    if (hasAuthParams()) {
      await auth.signinSilent();
      navigate(location.pathname, { replace: true });
    }
  };

  const handleLogin = async () => {
    if (
      !(
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

  useEffect(() => {
    silentLogin();
  }, []);
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
