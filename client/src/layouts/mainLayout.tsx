// src/layouts/MainLayout.tsx
import MyHeader from "@components/layout/Navbar";
import MyFooter from "@components/layout/Footer";
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
