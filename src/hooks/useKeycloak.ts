import { useEffect, useState } from "react";
import { useAuth, hasAuthParams } from "react-oidc-context";

export default function useKeycloak() {
  const auth = useAuth();
  const [hasTriedSignin, setHasTriedSignin] = useState(false);

  useEffect(() => {
    if (hasAuthParams()) {
      auth.signinSilent();
    }
  }, []); // TODO: 이메일 로그인 이후 state 제거 방법 생각

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
