// src/layouts/MainLayout.tsx
import MyHeader from "@components/Layout/Header";
import MyFooter from "@components/Layout/Footer";
import { Outlet, ScrollRestoration } from "react-router-dom";

const MainLayout = () => {
  return (
    <>
      <MyHeader />
      <Outlet />
      <MyFooter />
      <ScrollRestoration />
    </>
  );
};

export default MainLayout;
