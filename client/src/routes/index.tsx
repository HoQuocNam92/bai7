import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "@layouts/mainLayout";
import Cart from "@components/Cart/Cart";

// Pages
const ManagerProduct = lazy(
  () => import("@components/ManagerProduct/ManagerProduct"),
);
const ProductDetails = lazy(
  () => import("@components/ProductDetails/ProductDetails"),
);
const CartDetails = lazy(() => import("@components/CartDetails/CartDetails"));
const OtherProduct = lazy(() => import("@components/Swiper/Swiper"));
const Profile = lazy(() => import("@components/Profile/Profile"));
const Banner = lazy(() => import("@components/Banner/Banner"));
const Dashboard = lazy(() => import("@components/Dashboard/Dashboard"));
const Login = lazy(() => import("@pages/Login/Login"));
const Register = lazy(() => import("@pages/Register/Register"));
const Home = lazy(() => import("@pages/Home/Home"));
const About = lazy(() => import("@components/About/About"));

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      { index: true, Component: Home },
      { path: "about", Component: About },
      { path: "book/:id", Component: ProductDetails },
      { path: "cartdetails", Component: CartDetails },
      { path: "otherProduct", Component: OtherProduct },
      { path: "profile", Component: Profile },
      { path: "banner", Component: Banner },
      { path: "dashboard", Component: Dashboard },
      { path: "login", Component: Login },
      { path: "register", Component: Register },
      { path: "cart", Component: Cart },
    ],
  },
  {
    path: "/admin/product",
    Component: ManagerProduct,
  },
]);
