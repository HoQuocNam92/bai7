import ForgotPassword from "@components/ForgotPassword/ForgotPassword";
import GoogleAuth from "@components/google-auth/google-auth";
import ResetPassword from "@components/ResetPassword/ResetPassword";
import Order from "@components/VNPay/order.vnpay";
import PaymentForm from "@components/VNPay/paymentForm";
import Dashboard from "@pages/Dashboard/Dashboard";
import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
const User = lazy(() => import("@components/User/User"));
const Cart = lazy(() => import("@components/Cart/Cart"));
const MainLayout = lazy(() => import("@layouts/mainLayout"));

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
const Account = lazy(() => import("@pages/Account/Account"));

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
      { path: "google-auth", Component: GoogleAuth },
      { path: "account", Component: Account },
      { path: "cart", Component: Cart },
    ],
  },
  {
    path: "/user",
    Component: MainLayout,

    children: [
      {
        index: true,
        Component: User,
      },
      {
        path: "profile",
        Component: Profile,
      },
    ],
  },
  {
    path: "/admin/product",

    Component: ManagerProduct,
  },
  {
    path: "/admin/dashboard",

    Component: Dashboard,
  },
  {
    path: "/vnpay",

    Component: PaymentForm,
  },
  {
    path: "/vnpay/orders",

    Component: Order,
  },
  {
    path: "/forgot",

    Component: ForgotPassword,
  },
  {
    path: "/api/auth/resetlink/:token",

    Component: ResetPassword,
  },
]);
