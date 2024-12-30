import { useEffect, useState } from "react";
import { useAuth, hasAuthParams } from "react-oidc-context";
import type { User } from "oidc-client-ts";

const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL;

export function useKeycloak() {
  const auth = useAuth();
  const [hasTriedSignin, setHasTriedSignin] = useState(false);

  /** 로그인 함수 */
  const handleLogin = async () => {
    if (
      !auth.isAuthenticated &&
      !auth.activeNavigator &&
      !auth.isLoading &&
      !hasTriedSignin
    ) {
      setHasTriedSignin(true);
      auth.signinRedirect();
    }
  };

  /** 로그아웃 함수 */
  const handleLogout = () => {
    auth.signoutRedirect();
  };

  /**
   * URL 매개변수에 OIDC 관련 값(code, state 등)이 포함된 경우,
   * 직접 handleLogin을 호출하여 매직링크(혹은 리디렉트) 로그인을 시도합니다.
   */
  useEffect(() => {
    if (hasAuthParams()) {
      handleLogin();
    }
  }, [
    auth.isAuthenticated,
    auth.activeNavigator,
    auth.isLoading,
    hasTriedSignin,
  ]);

  /**
   * 에러 상태 모니터링 후 사용자에게 안내 메시지를 표시합니다.
   * (PKCE 설정 문제나, 매직링크 로그인 시 브라우저가 다른 경우 등)
   */
  useEffect(() => {
    if (!auth.error) return;
    console.error(auth.error);

    // 매직링크 로그인 시, PKCE 관련 에러가 발생하면 Keycloak 세션은 이미 생성된 상태이므로
    // 뒤에서 새로고침 방식 또는 리디렉트 방식을 사용할 수도 있습니다.
    if (
      auth.error.message ===
      "PKCE code verifier specified but challenge not present in authorization"
    ) {
      // 별도 처리 로직이 필요하다면 이곳에 작성
      return;
    }

    if (auth.error.message === "No matching state found in storage") {
      alert(
        "로그인 요청을 보낸 브라우저와, 로그인 링크를 통해 접속한 브라우저가 다를 경우 로그인에 실패할 수 있습니다."
      );
      return;
    }

    alert(
      `로그인에 문제가 있습니다. 관리자에게 문의 바랍니다.\n문의: ${ADMIN_EMAIL}`
    );
    setHasTriedSignin(false);
  }, [auth.error]);

  return {
    isAuthenticated: auth.isAuthenticated,
    isLoading: auth.isLoading,
    hasTriedSignin,
    handleLogin,
    handleLogout,
    user: auth.user as User | null,
  };
}
