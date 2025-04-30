import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
const ForgotPassword = lazy(() => import("@components/ForgotPassword/ForgotPassword"));
const GoogleAuth = lazy(() => import("@components/google-auth/google-auth"));
const ResetPassword = lazy(() => import("@components/ResetPassword/ResetPassword"));
const Order = lazy(() => import("@components/VNPay/order.vnpay"));
const PaymentForm = lazy(() => import("@components/VNPay/paymentForm"));
const Dashboard = lazy(() => import("@pages/Dashboard/Dashboard"));
const User = lazy(() => import("@components/User/User"));
const Cart = lazy(() => import("@components/Cart/Cart"));
const MainLayout = lazy(() => import("layout/mainLayout"));
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


const router = createBrowserRouter(

  [

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
export default router;