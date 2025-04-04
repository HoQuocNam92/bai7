import { lazy } from "react";

const routers = [
  {
    path: "/",
    component: lazy(() => import("@pages/Home/Home")),
  },
  {
    path: "/manager/product",
    component: lazy(() => import("@components/ManagerProduct/ManagerProduct")),
    hideLayout: true, // Đặt thuộc tính ở đây
  },
  {
    path: "/book/:id",
    component: lazy(() => import("@components/ProductDetails/ProductDetails")),
  },
  {
    path: "/banner",
    component: lazy(() => import("@components/Banner/Banner")),
    hideLayout: true, // Đặt thuộc tính ở đây
  },
  {
    path: "/dashboard",
    component: lazy(() => import("@components/Dashboard/Dashboard")),
    hideLayout: true, // Đặt thuộc tính ở đây
  },
  {
    path: "/login",
    component: lazy(() => import("@pages/Login/Login")),
    hideLayout: true, // Đặt thuộc tính ở đây
  },

  {
    path: "/register",
    component: lazy(() => import("@pages/Register/Register")),
    hideLayout: true, // Đặt thuộc tính ở đây
  },
];

export default routers;
