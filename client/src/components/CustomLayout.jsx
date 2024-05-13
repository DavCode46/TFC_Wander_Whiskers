import { useState, useEffect, useContext } from "react";
import {
  Affix,
  Avatar,
  Button,
  Divider,
  FloatButton,
  Layout,
  Menu,
} from "antd";
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
  ShoppingCartOutlined,
  QuestionOutlined,
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
import { SiGradleplaypublisher } from "react-icons/si";

import { ImProfile } from "react-icons/im";

const { Sider, Content } = Layout;
const { SubMenu } = Menu;
import ContactDrawer from "./ContactDrawer";
import { UserContext } from "../context/userContext";
import axios from "axios";
import { CartContext } from "@/context/CartContext";
import FadeAnimation from "./Animations/FadeAnimation/FadeAnimation";
const CustomLayout = () => {
  const [collapsed, setCollapsed] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [role, setRole] = useState("user");

  const { currentUser } = useContext(UserContext);
  const [cart, setCart] = useContext(CartContext);

  const totalQuantity = cart.reduce(
    (total, product) => total + product.quantity,
    0
  );

  const token = currentUser?.token;

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
        } else {
          console.log("currentUser is null");
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, [profileImage, currentUser, token]);

  const menuItemsBurger = [
    {
      key: "toggleBtn",
      icon: <MenuOutlined />,
      children: [
        {
          key: "login",
          icon: <LoginOutlined />,
          label: <Link to="/login">Login</Link>,
          hidden: currentUser,
        },
        // {
        //   key: "register",
        //   icon: <GiArchiveRegister />,
        //   label: <Link to="/register">Registrarse</Link>,
        //   hidden: currentUser,
        // },
        {
          key: "logout",
          icon: <LogoutOutlined />,
          label: <Link to="/logout">Logout</Link>,
          hidden: !currentUser,
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
          hidden: !currentUser,
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
          icon: <SiGradleplaypublisher />,
          children: [
            // {
            //   key: "create-post",
            //   label: <Link to="/create-post">Publicar anuncio</Link>,
            //   icon: <MdOutlinePublish />,
            //   // hidden: !currentUser || !currentUser.isSubscribed || currentUser.role !== 'admin',
            // },
            {
              key: "allposts",
              label: <Link to="/posts">Anuncios</Link>,
              icon: <BsSignpostSplit />,
            },
          ],
        },
        {
          key: "contact",
          label: "Ayuda",
          icon: <MdOutlineImportContacts />,
          children: [
            // {
            //   key: "contactUs",
            //   label: <Link to="/contact">Contactar</Link>,
            //   icon: <MdContactMail />,
            // },
            {
              key: "help",
              label: <Link to="/help">Preguntas frecuentes</Link>,
              icon: <MdContactSupport />,
            },
          ],
        },
        {
          key: "cart",
          label: <Link to="/cart">Carrito ({totalQuantity})</Link>,
          icon: <ShoppingCartOutlined />,
        },
        {
          key: "dashboard",
          label: <Link to="/dashboard">Dashboard</Link>,
          icon: <MdDashboard />,
          hidden: !currentUser || currentUser.role !== "admin",
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
          <FadeAnimation
            className={"fixed top-0 left-0 bottom-0 z-[1000] overflow-auto"}
          >
            <Sider
              theme="light"
              collapsed={collapsed}
              collapsedWidth={isMobile ? 0 : 80}
              onBreakpoint={(broken) => setCollapsed(broken)}
              className="transition-all duration-300"
              style={{
                // overflow: "auto",
                height: "100vh",
                // position: "fixed",
                // left: 0,
                // top: 0,
                // bottom: 0,
                // zIndex: 1000,
              }}
              width={150}
            >
              <Link to="/">
                <img src={logo} alt="" />
              </Link>

              <Button
                type="primary"
                onClick={toggleCollapsed}
                className="mb-5 text-white bg-color-btn hover:bg-color-btnHover active:bg-color-btnHover py-4 px-3 flex items-center justify-center m-auto transition-all duration-300"
              >
                {collapsed ? <MenuOutlined /> : <CloseOutlined />}
              </Button>
              <Menu
                theme="light"
                mode="vertical"
                className="font-sora"
                defaultSelectedKeys={["home"]}
                items={menuItemsBurger[0].children}
              ></Menu>
              {currentUser && (
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
                </>
              )}
            </Sider>
          </FadeAnimation>
        </>
      )}

      <Layout>
        <Content style={{ margin: "0 16px" }}>
          <Outlet />
          {/* <Link to="/contact">
            <FloatButton icon={<QuestionOutlined />} />
          </Link> */}
          <ContactDrawer />
        </Content>
        <Footer />
      </Layout>
    </Layout>
  );
};

export default CustomLayout;
