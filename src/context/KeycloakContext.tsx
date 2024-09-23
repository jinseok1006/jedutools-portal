import React, { createContext, useContext, useEffect, useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
import { useAuth, hasAuthParams } from "react-oidc-context";
import { IdTokenClaims } from "oidc-client-ts";

declare module "oidc-client-ts" {
  interface IdTokenClaims {
    groups: string[];
  }
}

// Context의 값의 타입 정의
interface KeycloakContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  hasTriedSignin: boolean;
  handleLogin: () => Promise<void>;
  handleLogout: () => void;
  profile?: IdTokenClaims;
  accessToken?: string;
}

// 초기값 설정
const initialContextValue: KeycloakContextType = {
  isAuthenticated: false,
  isLoading: true,
  hasTriedSignin: false,
  handleLogin: async () => {},
  handleLogout: () => {},
};

// Context 생성
const KeycloakContext = createContext<KeycloakContextType>(initialContextValue);

export const KeycloakProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const auth = useAuth();
  const [hasTriedSignin, setHasTriedSignin] = useState(false);

  const silentLogin = async () => {
    if (hasAuthParams()) {
      await auth.signinSilent();
      window.history.replaceState({}, document.title, window.location.pathname);
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
      await auth.signinRedirect();
      setHasTriedSignin(true);
    }
  };

  const handleLogout = () => void auth.signoutRedirect();

  useEffect(() => {
    silentLogin();
  }, []);

  const profile = auth.user?.profile;
  const accessToken = auth.user?.access_token;

  return (
    <KeycloakContext.Provider
      value={{
        isAuthenticated: auth.isAuthenticated,
        isLoading: auth.isLoading,
        hasTriedSignin,
        handleLogin,
        handleLogout,
        profile,
        accessToken
      }}
    >
      {children}
    </KeycloakContext.Provider>
  );
};

// KeycloakContext 사용을 위한 커스텀 훅
export const useKeycloak = () => useContext(KeycloakContext);
