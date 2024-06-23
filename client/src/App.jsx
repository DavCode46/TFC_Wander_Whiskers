import React, { Suspense, lazy, useEffect, useState } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  useLocation,
} from "react-router-dom";

import { Box, ChakraProvider, CircularProgress } from "@chakra-ui/react";
import { AnimatePresence } from "framer-motion";
import theme from "./theme/theme";
import { ConfigProvider } from "antd";
import UserProvider from "@context/UserContext";
import { CartProvider } from "@context/CartContext";
import { ThemeProvider } from "@context/ThemeContext";

// Otros componentes y páginas
import CustomLayout from "./components/CustomLayout";
import Error404 from "./pages/Error404";
import Home from './pages/Home'
// Lazy load pages
// const Home = lazy(() => import("./pages/Home"));
const PostsPage = lazy(() => import("./pages/PostsPage"));
const DeletePost = lazy(() => import("./pages/DeletePost"));
const PostDetail = lazy(() => import("./pages/PostDetail"));
const LocationPosts = lazy(() => import("./pages/LocationPosts"));
const Profile = lazy(() => import("./pages/Profile"));
const Creator = lazy(() => import("./pages/Creator"));
const Logout = lazy(() => import("./pages/Logout"));
const Contact = lazy(() => import("./pages/Contact"));
const Help = lazy(() => import("./pages/Help"));
const PostsBySpecie = lazy(() => import("./pages/PostsBySpecie"));
const OrdersPage = lazy(() => import("./pages/OrdersPage"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const UsersManagement = lazy(() => import("./pages/UsersManagement"));
const CartPage = lazy(() => import("./pages/CartPage"));
const CheckoutSuccess = lazy(() => import("./pages/CheckoutSuccess"));
const CheckoutCancel = lazy(() => import("./pages/CheckoutCancel"));
const LegalPage = lazy(() => import("./pages/LegalPage"));
const CookiesPage = lazy(() => import("./pages/CookiesPage"));
const PrivacityPage = lazy(() => import("./pages/PrivacityPage"));
const ForgetPassword = lazy(() => import("./pages/ForgetPassword"));
const ResetPassword = lazy(() => import("./pages/ResetPassword"));

const Wrapper = ({ children }) => {
  const location = useLocation();
  useEffect(() => {
    document.documentElement.scrollTo(0, 0);
  }, [location.pathname]);
  return children;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: (
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
    ),
    errorElement: <Error404 />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/posts",
        element: <PostsPage />,
      },
      {
        path: "/posts/:id/delete",
        element: <DeletePost />,
      },
      {
        path: "/post/:id/detail",
        element: <PostDetail />,
      },
      {
        path: "/profile/:id",
        element: <Profile />,
      },
      {
        path: "/posts/location/:location",
        element: <LocationPosts />,
      },
      {
        path: "/logout",
        element: <Logout />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/help",
        element: <Help />,
      },
      {
        path: "posts/species/:specie",
        element: <PostsBySpecie />,
      },
      {
        path: "posts/users/:id",
        element: <Creator />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/dashboard/users",
        element: <UsersManagement />,
      },
      {
        path: "/cart",
        element: <CartPage />,
      },
      {
        path: "/checkout/success",
        element: <CheckoutSuccess />,
      },
      {
        path: "/checkout/cancel",
        element: <CheckoutCancel />,
      },
      {
        path: "/orders/user/:id",
        element: <OrdersPage />,
      },
      {
        path: "/legal",
        element: <LegalPage />,
      },
      {
        path: "/privacity",
        element: <PrivacityPage />,
      },
      {
        path: "/cookies",
        element: <CookiesPage />,
      },
      {
        path: "/forgot-password",
        element: <ForgetPassword />,
      },
      {
        path: "/users/reset-password/:id/:token",
        element: <ResetPassword />,
      },
    ],
  },
]);

function App() {
  const [themeMode, setThemeMode] = useState("light");

  const darkTheme = () => {
    setThemeMode("dark");
  };

  const lightTheme = () => {
    setThemeMode("light");
  };

  useEffect(() => {
    document.querySelector("html").classList.remove("dark", "light");
    document.querySelector("html").classList.add(themeMode);
  }, [themeMode]);

  return (
    <>
      <ConfigProvider
        theme={{
          components: {
            Select: {
              optionActiveBg: themeMode === "dark" ? "#1890ff" : "",
              optionSelectedBg: themeMode === "dark" ? "#1890ff" : "",
              optionSelectedColor: themeMode === "dark" ? "#fff" : "",
              selectorBg: themeMode === "dark" ? "#081C24" : "",
              colorText: themeMode === "dark" ? "#ccc" : "",
              colorPrimary: themeMode === "dark" ? "#ccc" : "",
            },
            Drawer: {
              colorIcon: themeMode === "dark" ? "#fff" : "",
              colorIconHover: themeMode === "dark" ? "#ccc" : "",
              colorSplit: themeMode === "dark" ? "#fff" : "",
              colorText: themeMode === "dark" ? "#fff" : "",
            },
            Upload: {
              colorPrimary: themeMode === "dark" ? "#1890ff" : "",
              colorPrimaryHover: themeMode === "dark" ? "#1890ff" : "",
              colorText: themeMode === "dark" ? "#ccc" : "",
            },
            Input: {
              activeBorderColor: themeMode === "dark" ? "#1890ff" : "",
              addonBg: themeMode === "dark" ? "#2e2e2e" : "",
              colorBgContainer: themeMode === "dark" ? "#081C24" : "",
              colorTextPlaceholder: themeMode === "dark" ? "red" : "",
              colorText: themeMode === "dark" ? "red" : "",
            },
            Form: {
              labelColor: themeMode === "dark" ? "#fff" : "",
            },
            Button: {
              colorTextDisabled: themeMode === "dark" ? "#ccc" : "",
            },
            Pagination: {
              itemActiveBg: themeMode === "dark" ? "#00111A" : "",
              itemBg: themeMode === "dark" ? "red" : "",
              itemInputBg: themeMode === "dark" ? "red" : "",
              itemActiveBgDisabled: themeMode === "dark" ? "red" : "",
              colorText: themeMode === "dark" ? "white" : "",
            },
            Cascader: {
              optionSelectedBg: themeMode === "dark" ? "#1890ff" : "",
            },
            Card: {
              colorPrimary: themeMode === "dark" ? "#1F2E35" : "",
            },
            Empty: {
              colorText: themeMode === "dark" ? "#ccc" : "",
            },
            Popconfirm: {
              colorText: themeMode === "dark" ? "#ccc" : "",
              colorTextHeading: themeMode === "dark" ? "#cacaca" : "",
            },
            Result: {
              colorText: themeMode === "dark" ? "#ccc" : "",
            },
            Menu: {
              darkItemSelectedBg: themeMode === "dark" ? "blue" : "",
              itemActiveBg: themeMode === "dark" ? "blue" : "",
            },
          },
        }}
      >
        <ThemeProvider value={{ themeMode, darkTheme, lightTheme }}>
          <Suspense
            fallback={
              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                height="100vh"
              >
                <CircularProgress
                  isIndeterminate
                  size="100px"
                  thickness="7px"
                  aria-label="cargando"
                />
              </Box>
            }
          >
            <RouterProvider router={router} />
          </Suspense>
        </ThemeProvider>
      </ConfigProvider>
    </>
  );
}

export default App;
