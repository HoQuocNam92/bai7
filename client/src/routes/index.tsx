import { lazy } from "react";

const routers = [
  {
    path: "/",
    component: lazy(() => import("@pages/home/Home")),
  },
  {
    path: "/dashboard",
    component: lazy(() => import("@components/dashboard/dashboard")),
    hideLayout: true, // Đặt thuộc tính ở đây
  },
  {
    path: "/login",
    component: lazy(() => import("@components/Login/Login")),
    hideLayout: true, // Đặt thuộc tính ở đây
  },
  {
    path: "/profile",
    component: lazy(() => import("@components/profile/profile")),
    hideLayout: true, // Đặt thuộc tính ở đây
  },

  {
    path: "/register",
    component: lazy(() => import("@components/register/register")),
    hideLayout: true, // Đặt thuộc tính ở đây
  },
];

export default routers;
