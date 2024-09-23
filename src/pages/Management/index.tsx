import { useAsync } from "react-use";
import { useKeycloak } from "../../context/KeycloakContext";
import AccessDenied from "../../components/AccessDenied";
import { IdTokenClaims } from "oidc-client-ts";
import ky from "ky";
import Table from "./Table";
import { Box, Container } from "@mui/material";

const REALMS = import.meta.env.VITE_KEYCLOAK_REALMS;
const KEYCLOAK_URL = import.meta.env.VITE_KEYCLOAK_URL;

function Management({ accessToken }: { accessToken?: string }) {
  // 관리자 경로로 api를 날려야함.
  //   console.log(accessToken);
  const {
    value: users,
    loading: usersLoading,
    error: usersError,
  } = useAsync(
    () =>
      ky
        .get(`${KEYCLOAK_URL}/admin/realms/${REALMS}/users`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .json(),
    []
  );

  return (
    <Container>
      <Box mt={4}>
        <Table />
      </Box>
    </Container>
  );
}

function Protected({
  isAuthenticated,
  profile,
  children,
}: {
  isAuthenticated: boolean;
  profile?: IdTokenClaims;
  children: React.ReactNode;
}) {
  // groups 관련해서 이슈가 자꾸 생기네 undefined인데 어떻게 통과하는거지?
  console.log(isAuthenticated, profile);
  if (!isAuthenticated || !profile) {
    return <AccessDenied />;
  }

  const { groups } = profile;

  //   console.log(groups);

  if (
    !groups ||
    (!groups.includes("/oslab") && !groups.includes("/professor"))
  ) {
    return <AccessDenied />;
  }

  return children;
}

function ManagementContainer() {
  const { isAuthenticated, profile, accessToken } = useKeycloak();

  // return (
  //   <Protected isAuthenticated={isAuthenticated} profile={profile}>
  //     <Management accessToken={accessToken} />
  //   </Protected>
  // );

  return <Management accessToken={accessToken} />;
}

export default ManagementContainer;
