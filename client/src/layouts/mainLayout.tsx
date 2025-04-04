// src/layouts/MainLayout.tsx
import MyHeader from "@components/Layout/Navbar";
import MyFooter from "@components/Layout/Footer";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <>
      <MyHeader />
      <Outlet />
      <MyFooter />
    </>
  );
};

export default MainLayout;
