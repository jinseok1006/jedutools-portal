import useKeycloak from "../../hooks/useKeycloak";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { Outlet } from "react-router-dom";


export default function Layout() {
  const {
    isAuthenticated,
    isLoading,
    hasTriedSignin,
    handleLogin,
    handleLogout,
    username,
  } = useKeycloak();

  return (
    <>
      <Navbar
        isAuthenticated={isAuthenticated}
        username={username}
        handleLogin={handleLogin}
        handleLogout={handleLogout}
        isLoading={isLoading}
        hasTriedSignin={hasTriedSignin}
      />
      <Outlet />
      <Footer />
    </>
  );
}
