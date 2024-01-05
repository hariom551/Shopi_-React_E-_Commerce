import { useRoutes, BrowserRouter, Navigate } from "react-router-dom";
import {
  ShoppingCartContext,
  ShoppingCartProvider,
  initializeLocalStorage,
} from "../../Context";
import Home from "../Home";
import MyAccount from "../MyAccount";
import MyOrder from "../MyOrder";
import MyOrders from "../MyOrders";
import NotFound from "../NotFound";
import SingIn from "../SignIn";
import Navbar from "../../Components/Navbar";
import Layout from "../../Components/Layout";
import CheckoutSideMenu from "../../Components/CheckoutSideMenu";
import "./App.css";
import { useContext } from "react";

const AppRoutes = () => {
  const { account, signOut } = useContext(ShoppingCartContext);

  // Account
  const accountLocal = localStorage.getItem("account");
  const parsedAccount = JSON.parse(accountLocal);

  // Sign Out
  const signOutLocal = localStorage.getItem("sign-out");
  const parsedSignOut = JSON.parse(signOutLocal);

  // Has an account
  const noAccountInLocalStorage = parsedAccount
    ? Object.keys(parsedAccount).length === 0
    : true;
  const noAccountInLocalState = Object.keys(account).length === 0;
  const hasUserAnAccount = !noAccountInLocalStorage || !noAccountInLocalState;
  const isUserSignOut = signOut || parsedSignOut;

  let routes = useRoutes([
    {
      path: "/",
      element:
        hasUserAnAccount && !isUserSignOut ? (
          <Home />
        ) : (
          <Navigate replace to={"/sign-in"} />
        ),
    },
    {
      path: "/:category",
      element:
        hasUserAnAccount && !isUserSignOut ? (
          <Home />
        ) : (
          <Navigate replace to={"/sign-in"} />
        ),
    },
    { path: "/my-account", element: <MyAccount /> },
    { path: "/my-order", element: <MyOrder /> },
    { path: "/my-orders", element: <MyOrders /> },
    { path: "/my-orders/last", element: <MyOrder /> },
    { path: "/my-orders/:id", element: <MyOrder /> },
    { path: "/sign-in", element: <SingIn /> },
    { path: "/*", element: <NotFound /> },
  ]);

  return routes;
};

const App = () => {
  initializeLocalStorage();

  return (
    <ShoppingCartProvider>
      <BrowserRouter>
        <Navbar />
        <Layout>
          <AppRoutes />
          <CheckoutSideMenu />
        </Layout>
      </BrowserRouter>
    </ShoppingCartProvider>
  );
};

export default App;
