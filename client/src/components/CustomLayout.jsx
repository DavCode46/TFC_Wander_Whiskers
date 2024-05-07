import { useState, useEffect, useContext } from "react";
import { Affix, Avatar, Button, Divider, Layout, Menu } from "antd";
import { Link, Outlet } from "react-router-dom";

import Footer from "./Footer";
import logo from "@images/logo/5.svg";
import {
  HomeOutlined,
  LoginOutlined,
  LogoutOutlined,
  ProfileOutlined,
  MenuOutlined,
  CloseOutlined,
  ShoppingCartOutlined
} from "@ant-design/icons";

import { GiArchiveRegister } from "react-icons/gi";
import {
  MdOutlinePublish,
  MdContactMail,
  MdOutlineImportContacts,
  MdOutlinePostAdd,
  MdContactSupport,
  MdDashboard,
 
} from "react-icons/md";
import { BsSignpostSplit } from "react-icons/bs";

import { ImProfile } from "react-icons/im";
import avatar from "@images/avatar1.jpg";

import Header from "./Header";

const { Sider, Content } = Layout;
const { SubMenu } = Menu;

import { UserContext } from "../context/userContext";
import axios from "axios";
import { CartContext } from "@/context/CartContext";

const CustomLayout = () => {
  const [collapsed, setCollapsed] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [role, setRole] = useState('user');

  const { currentUser } = useContext(UserContext);
  const [cart, setCart] = useContext(CartContext)

  const quantity = cart.reduce((acc, current) => {
    return acc + current.quantity;
  }, 0);
  
  const token = currentUser?.token;

  // console.log('usuario', currentUser.profileImage)
  useEffect(() => {
    if (currentUser) {
      setRole(currentUser.role);
    }
  },[currentUser])

  useEffect(() => {
    setIsLoggedIn(currentUser !== null);
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (currentUser) {        
          const res = await axios.get(
            `${import.meta.env.VITE_REACT_APP_URL}/users/${currentUser.id}`,
            {
              withCredentials: true,
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          const { profileImage } = res.data;
          setProfileImage(profileImage);
          console.log("Profile Image:", profileImage);
          console.log("res:", res.data);
          console.log("User ID:", currentUser.id);
        } else {
          console.log("currentUser is null");
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, [profileImage]);

  const menuItemsBurger = [
    {
      key: "toggleBtn",
      icon: <MenuOutlined />,
      children: [
        {
          key: "login",
          icon: <LoginOutlined />,
          label: <Link to="/login">Login</Link>,
          hidden: isLoggedIn,
        },
        {
          key: "register",
          icon: <GiArchiveRegister />,
          label: <Link to="/register">Registrarse</Link>,
          hidden: isLoggedIn,
        },
        {
          key: "logout",
          icon: <LogoutOutlined />,
          label: <Link to="/logout">Logout</Link>,
          hidden: !isLoggedIn,
        },
        {
          key: "home",
          icon: <HomeOutlined />,
          label: <Link to="/">Inicio</Link>,
        },

        currentUser && {
          key: "myAccount",
          label: "Mi Cuenta",
          icon: <ProfileOutlined />,
          hidden: !isLoggedIn,
          children: [
            {
              key: "profile",
              label: <Link to={`/profile/${currentUser.id}`}>Perfil</Link>,
              icon: <ImProfile />,
            },
          ],
        },
        {
          key: "posts",
          label: "Posts",
          icon: <MdOutlinePostAdd />,
          children: [
            {
              key: "create-post",
              label: <Link to="/create-post">Publicar anuncio</Link>,
              icon: <MdOutlinePublish />,
              hidden: !isLoggedIn,
            },
            {
              key: "allposts",
              label: <Link to="/posts">Anuncios</Link>,
              icon: <BsSignpostSplit />,
            },
          ],
        },
        {
          key: "contact",
          label: "Contacto",
          icon: <MdOutlineImportContacts />,
          children: [
            {
              key: "contactUs",
              label: <Link to="/contact">Contactar</Link>,
              icon: <MdContactMail />,
            },
            {
              key: "help",
              label: <Link to="/help">Ayuda</Link>,
              icon: <MdContactSupport />,
            },
          ],
        },
        {
          key: 'cart',
          label: <Link to="/cart">Carrito ({quantity})</Link>,
          icon: <ShoppingCartOutlined />,
        },
        {
          key: "dashboard",
          label: <Link to="/dashboard">Dashboard</Link>,
          icon: <MdDashboard />,
          hidden:!isLoggedIn || role !== 'admin',
        },
        
      ],
    },
  ];

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Layout>
      {isMobile ? (
        <Menu
          mode="horizontal"
          className="fixed top-3 left-3 rounded-full z-50 flex items-center justify-center pl-2 w-14 h-14"
          items={menuItemsBurger}
        />
      ) : (
        <>
          <Sider
            theme="light"
            collapsed={collapsed}
            collapsedWidth={isMobile ? 0 : 80}
            onBreakpoint={(broken) => setCollapsed(broken)}
            style={{
              overflow: "auto",
              height: "100vh",
              position: "fixed",
              left: 0,
              top: 0,
              bottom: 0,
              zIndex: 1000,
            }}
            width={150}
          >
            <div className="logo" />
            <div className="logo-image">
              <img src={logo} alt="" />
            </div>

            <Button
              type="primary"
              onClick={toggleCollapsed}
              className="mb-5 text-black py-4 px-3 flex items-center justify-center m-auto"
            >
              {collapsed ? <MenuOutlined /> : <CloseOutlined />}
            </Button>
            <Menu
              theme="light"
              mode="vertical"
              defaultSelectedKeys={["home"]}
              items={menuItemsBurger[0].children}
            ></Menu>
            {isLoggedIn && currentUser && (
              <>
                <Link to={`/profile/${currentUser.id}`}>
                  <Avatar
                    src={`${
                      import.meta.env.VITE_REACT_APP_ASSETS_URL
                    }/uploads/${profileImage}`}
                    size={60}
                    className="flex m-auto mt-5"
                  />
                </Link>
                {/* <div>
                  <Link to="/logout">
                    <LogoutOutlined />
                    Logout
                  </Link>
                </div> */}
              </>
            )}
          </Sider>
        </>
      )}

      <Layout>
        <Content style={{ margin: "0 16px" }}>
          <Outlet />
        </Content>
        <Footer />
      </Layout>
    </Layout>
  );
};

export default CustomLayout;
