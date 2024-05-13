import {
  createBrowserRouter,
  Route,
  RouterProvider,
  useLocation,
} from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ChakraProvider } from "@chakra-ui/react";
import { AnimatePresence } from "framer-motion";
import theme from "./theme/theme";

import CustomLayout from "./components/CustomLayout";
import Home from "./pages/Home";

import PostsPage from "./pages/PostsPage";

import DeletePost from "./pages/DeletePost";
import PostDetail from "./pages/PostDetail";
import LocationPosts from "./pages/LocationPosts";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Creator from "./pages/Creator";

import Logout from "./pages/Logout";
import NotFoundPage from "./pages/NotFound";
import Contact from "./pages/Contact";
import Help from "./pages/Help";
import PostsBySpecie from "./pages/PostsBySpecie";
import OrdersPage from "./pages/OrdersPage";
import UserProvider from "./context/UserContext";
import Dashboard from "./pages/Dashboard";
import UsersManagement from "./pages/UsersManagement";
import { CartProvider } from "./context/CartContext";
import CartPage from "./pages/CartPage";
import OrderPage from "./pages/OrdersPage";
import CheckoutSuccess from "./pages/CheckoutSuccess";
import CheckoutCancel from "./pages/CheckoutCancel";
import { useLayoutEffect } from "react";
import LegalPage from "./pages/LegalPage";
import CookiesPage from "./pages/CookiesPage";
import PrivacityPage from "./pages/PrivacityPage";

const Wrapper = ({ children }) => {
  const location = useLocation();
  useLayoutEffect(() => {
    document.documentElement.scrollTo(0, 0);
  }, [location.pathname]);
  return children;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <GoogleOAuthProvider clientId={`${import.meta.env.GOOGLE_ID_KEY}`}>
        <ChakraProvider theme={theme}>
          <AnimatePresence mode="wait">
            <Wrapper>
              <UserProvider>
                <CartProvider>
                  <CustomLayout />
                </CartProvider>
              </UserProvider>
            </Wrapper>
          </AnimatePresence>
        </ChakraProvider>
      </GoogleOAuthProvider>
    ),
    errorElement: <NotFoundPage />,
    children: [
      {
        path: "/",
        element: <Home />,
        location: location,
        key: location.pathname,
      },
      // {
      //   path: "/create-post",
      //   element: <CreatePost />,
      //   location: location,
      //   key: location.pathname,
      // },
      {
        path: "/posts",
        element: <PostsPage />,
        location: location,
        key: location.pathname,
      },
      // {
      //   path: "/posts/:id/edit",
      //   element: <EditPost />,
      //   location: location,
      //   key: location.pathname,
      // },
      {
        path: "/posts/:id/delete",
        element: <DeletePost />,
        location: location,
        key: location.pathname,
      },
      {
        path: "/post/:id/detail",
        element: <PostDetail />,
        location: location,
        key: location.pathname,
      },
      {
        path: "/profile/:id",
        element: <Profile />,
        location: location,
        key: location.pathname,
      },
      {
        path: "/posts/location/:location",
        element: <LocationPosts />,
        location: location,
        key: location.pathname,
      },
      {
        path: "/login",
        element: <Login />,
        location: location,
        key: location.pathname,
      },
      // {
      //   path: "/register",
      //   element: <Register />,
      //   location: location,
      //   key: location.pathname,
      // },
      {
        path: "/logout",
        element: <Logout />,
        location: location,
        key: location.pathname,
      },
      {
        path: "/contact",
        element: <Contact />,
        location: location,
        key: location.pathname,
      },
      {
        path: "/help",
        element: <Help />,
        location: location,
        key: location.pathname,
      },
      {
        path: "posts/species/:specie",
        element: <PostsBySpecie />,
        location: location,
        key: location.pathname,
      },
      {
        path: "posts/users/:id",
        element: <Creator />,
        location: location,
        key: location.pathname,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
        location: location,
        key: location.pathname,
      },
      {
        path: "/dashboard/users",
        element: <UsersManagement />,
        location: location,
        key: location.pathname,
      },
      {
        path: "/cart",
        element: <CartPage />,
        location: location,
        key: location.pathname,
      },
      {
        path: "/cart/order/:id",
        element: <OrderPage />,
        location: location,
        key: location.pathname,
      },
      {
        path: "/checkout/success",
        element: <CheckoutSuccess />,
        location: location,
        key: location.pathname,
      },
      {
        path: "/checkout/cancel",
        element: <CheckoutCancel />,
        location: location,
        key: location.pathname,
      },
      {
        path: "/orders/users/:id",
        element: <OrdersPage />,
        location: location,
        key: location.pathname,
      },
      {
        path: "/legal",
        element: <LegalPage />,
        location: location,
        key: location.pathname,
      },
      {
        path: "/privacity",
        element: <PrivacityPage />,
        location: location,
        key: location.pathname,
      },
      {
        path: "/cookies",
        element: <CookiesPage />,
        location: location,
        key: location.pathname,
      },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
