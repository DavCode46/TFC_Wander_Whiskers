// import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";

import theme from "./theme/theme";

import CustomLayout from "./components/CustomLayout";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import PostsPage from "./pages/PostsPage";
import EditPost from "./pages/EditPost";
import DeletePost from "./pages/DeletePost";
import PostDetail from "./pages/PostDetail";
import LocationPosts from "./pages/LocationPosts";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Creator from "./pages/Creator";
import Register from "./pages/Register";
import Logout from "./pages/Logout";
import NotFoundPage from "./pages/NotFound";
import Contact from "./pages/Contact";
import Help from "./pages/Help";
import PostsBySpecie from "./pages/PostsBySpecie";

import UserProvider from "./context/userContext"; // Importa UserProvider desde el archivo UserContext
import PostCreator from "./components/PostCreator";
import Dashboard from "./pages/Dashboard";
import UsersManagement from "./pages/UsersManagement";
import { CartProvider } from "./context/CartContext";
import CartPage from "./pages/CartPage";
import OrderPage from "./pages/OrderPage";
import CheckoutSuccess from "./pages/CheckoutSuccess";
import CheckoutCancel from "./pages/CheckoutCancel";
// import ProfilePosts from "./components/ProfilePosts";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ChakraProvider theme={theme}>
        <UserProvider>
          <CartProvider>
            <CustomLayout />
          </CartProvider>
        </UserProvider>
      </ChakraProvider>
    ),
    errorElement: <NotFoundPage />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/create-post", element: <CreatePost /> },
      { path: "/posts", element: <PostsPage /> },
      { path: "/posts/:id/edit", element: <EditPost /> },
      { path: "/posts/:id/delete", element: <DeletePost /> },
      { path: "/post/:id/detail", element: <PostDetail /> },
      { path: "/profile/:id", element: <Profile /> },
      { path: "/posts/location/:location", element: <LocationPosts /> },
      // { path: "/posts/creator/:id", element: <Creator /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/logout", element: <Logout /> },
      { path: "/contact", element: <Contact /> },
      { path: "/help", element: <Help /> },
      { path: "posts/species/:specie", element: <PostsBySpecie /> },
      { path: "posts/users/:id", element: <Creator /> },
      { path: "/dashboard", element: <Dashboard /> },
      { path: "/dashboard/users", element: <UsersManagement /> },
      { path: "/cart", element: <CartPage /> },
      { path: "/cart/order/:id", element: <OrderPage />},
      { path: "/checkout/success", element: <CheckoutSuccess />},
      { path: "/checkout/cancel", element: <CheckoutCancel />},
      // { path: "posts/users/:id", element: <ProfilePosts /> }
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
