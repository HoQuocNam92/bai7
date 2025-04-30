// src/layouts/MainLayout.tsx
import Header from "@components/Layout/Header";
import Footer from "@components/Layout/Footer";

import { Outlet } from "react-router-dom";
import ScrollToTop from "ScrollToTop/ScrollToTop";

const MainLayout = () => {
  return (
    <>
      <ScrollToTop />
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default MainLayout;
