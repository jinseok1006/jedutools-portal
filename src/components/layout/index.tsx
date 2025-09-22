import Footer from "@/components/layout/Footer";
import { Outlet } from "react-router-dom";
import AppBar from "@/components/layout/AppBar";
import NoticeBanner from "@/components/layout/NoticeBanner";

export default function Layout() {
  return (
    <>
      <AppBar />
      <NoticeBanner />
      <Outlet />
      <Footer />
    </>
  );
}
