import { useEffect, useState } from "react";
import { useAuth, hasAuthParams } from "react-oidc-context";
import { useNavigate } from "react-router-dom";

const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL

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
      !auth.isAuthenticated &&
      !auth.activeNavigator &&
      !auth.isLoading &&
      !hasTriedSignin
    ) {
      setHasTriedSignin(true);
      await auth.signinRedirect();
    }
  };

  const handleLogout = () => void auth.signoutRedirect();

  useEffect(() => {
    silentLogin();
  }, []);

  useEffect(() => {
    if (auth.error) {
      alert(
        `로그인에 문제가 있습니다. 관리자에게 문의 바랍니다.\n문의: ${ADMIN_EMAIL}`
      );
      setHasTriedSignin(false);
    }
  }, [auth.error, setHasTriedSignin]);


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
