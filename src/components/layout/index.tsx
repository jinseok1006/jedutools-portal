import Footer from "@/components/layout/Footer";
import { Outlet } from "react-router-dom";
import AppBar from "@/components/layout/AppBar";

export default function Layout() {
  return (
    <>
      <AppBar />
      <Outlet />
      <Footer />
    </>
  );
}
