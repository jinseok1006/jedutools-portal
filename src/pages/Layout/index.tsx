import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { Outlet } from "react-router-dom";
import MaintenanceBanner from "../../components/MaintenanceBanner";
import AppBar from "@/components/AppBar";

export default function Layout() {
  return (
    <>
      <AppBar />
      <Outlet />
      <Footer />
    </>
  );
}
