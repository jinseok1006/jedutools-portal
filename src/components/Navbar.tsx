import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Link from "@mui/material/Link";

import CircularProgress from "@mui/material/CircularProgress";
import PersonIcon from "@mui/icons-material/Person";
import Logout from "@mui/icons-material/Logout";
import { useKeycloak } from "../context/KeycloakContext";

export default function Navbar() {
  const {
    isLoading,
    isAuthenticated,
    handleLogin,
    handleLogout,
    hasTriedSignin,
    user,
  } = useKeycloak();
  const username = user?.profile.preferred_username;

  return (
    <AppBar position="static" color="inherit" elevation={0}>
      <Container>
        <Toolbar sx={{ height: "16px" }}>
          <LogoButton />
          <Box ml="auto" display="flex" alignItems="center" gap={2}>
            <Typography
              variant="body1"
              sx={{ display: { xs: "none", md: "block" } }}
            >
              {isLoading ? (
                <CircularProgress size={30} />
              ) : isAuthenticated ? (
                username
              ) : (
                "비로그인 상태입니다."
              )}
            </Typography>
            <SignButton
              username={username}
              handleLogin={handleLogin}
              handleLogout={handleLogout}
              hasTriedSignin={hasTriedSignin}
              isLoading={isLoading}
              isAuthenticated={isAuthenticated}
            />
          </Box>
        </Toolbar>
      </Container>
      <Divider />
    </AppBar>
  );
}

function LogoButton() {
  return (
    <Link href="/" underline="none">
      <Box display="flex" alignItems="center" gap={2}>
        <img src="img/jedutools.png" alt="Logo" width="32px" />
        <Typography
          variant="h5"
          component="h1"
          fontWeight="bold"
          color="primary.main"
        >
          JEduTools
        </Typography>
      </Box>
    </Link>
  );
}

interface SignButtonProps {
  username?: string;
  handleLogin: () => Promise<void>;
  handleLogout: () => void;
  isLoading: boolean;
  isAuthenticated: boolean;
  hasTriedSignin: boolean;
}
function SignButton({
  handleLogin,
  handleLogout,
  hasTriedSignin,
  isLoading,
  isAuthenticated,
  username,
}: SignButtonProps) {
  if (isAuthenticated) {
    return <AccountButton username={username} handleLogout={handleLogout} />;
  }

  return (
    <Button
      variant="text"
      size="large"
      disabled={hasTriedSignin || isLoading}
      onClick={handleLogin}
    >
      SIGN IN
    </Button>
  );
}
function AccountButton({ handleLogout, username }: any) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const accountUrl = `${import.meta.env.VITE_KEYCLOAK_URL}/realms/${
    import.meta.env.VITE_KEYCLOAK_REALMS
  }/account`;

  return (
    <>
      <IconButton onClick={handleClick}>
        <PersonIcon sx={{ color: "primary.main" }} />
      </IconButton>

      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem>{username}</MenuItem>
        <Divider />
        {/* <MenuItem component="a" href={accountUrl}>
            <ListItemIcon>
              <ManageAccountsIcon fontSize="small" />
            </ListItemIcon>
            My Account
        </MenuItem> */}
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </>
  );
}
