import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { EmailIcon } from "@chakra-ui/icons";
import { RiLockPasswordLine } from "react-icons/ri";
import { FaRegUser } from "react-icons/fa";

import axios from "axios";

import LOGO from "@images/logo/1.svg";
import DARK_LOGO from "@images/logo/3.svg";
import GOOGLE_ICON from "@images/googleIcon.svg";
import GITHUB_ICON from "@images/githubIcon.svg";
import { FiGithub } from "react-icons/fi";
import { PlusOutlined, EditOutlined, LoginOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  DatePicker,
  Drawer,
  Form,
  message,
  Input,
  Row,
  Select,
  Space,
  FloatButton,
} from "antd";
import { UserContext } from "@/context/UserContext";
import FadeAnimation from "./Animations/FadeAnimation/FadeAnimation";
import Yanimation from "./Animations/Yanimation/Yanimation";
import useTheme from "@context/theme";

const LoginDrawer = () => {
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(true);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const { themeMode, lightTheme, darkTheme } = useTheme();


  const [error, setError] = useState("Error al iniciar sesión");
  const navigate = useNavigate();

  const [messageApi, contextHolder] = message.useMessage();

  const { setCurrentUser } = useContext(UserContext);
  const handleClick = () => setShow(!show);
  



  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const changeHandler = (e) => {
    setData((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };
  const handleSetError = () => {
    setError("");
  };

  const login = async (values) => {
    const { email, password } = values

    const data = new FormData()
    data.set('email', email)
    data.set('password', password)
    setError("");
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_REACT_APP_URL}/users/login`,
        data
      );
      const user = await response.data;
      console.log("login response", response);

      setCurrentUser(user);
      success();

      setData({
        email: "",
        password: "",
      })

      setTimeout(() => {
        onClose()
      }, 1000);
    } catch (err) {
      setError(err.response.data.message);
      errorMessage();
    }
  };

  const success = () => {
    messageApi.open({
      type: "success",
      content: "Inicio de sesión realizado con éxito",
    });
  };
  const errorMessage = () => {
    messageApi.open({
      type: "error",
      content: error || "Ha ocurrido un error",
    });
  };
  return (
    <>
      {contextHolder}
      <FloatButton shape="square" type={`${themeMode === 'dark' ? 'primary' : 'default'}`} onClick={showDrawer} icon={<LoginOutlined />} />
      {/* <FloatButton
      shape="circle"
        type={`${themeMode === 'dark' ? 'primary' : 'default'}`}
        className={`${
          themeMode === "dark"
            ? "bg-dark-primary hover:bg-a-6"
            : "bg-color-btn hover:bg-color-btnHover"
        } transition-all duration-300  text-white px-3 py-1 rounded-md mt-5'`}
        onClick={showDrawer}
        icon={<LoginOutlined />}
      >
        Login
      </FloatButton> */}
      <Drawer
       className={`${themeMode === "dark" ? "darkMode" : "lightMode"}`}
        title={
          <Yanimation>
            <div className="flex items-center mt-4">
              Iniciar sesión en Wander Whiskers
              {themeMode === "light" ? (
                <img
                  src={LOGO}
                  alt="wander whiskers logo"
                  className="w-[4rem] h-auto"
                />
              ) : (
                <img
                  src={DARK_LOGO}
                  alt="wander whiskers logo"
                  className="w-[4rem] h-auto"
                />
              )}
            </div>
          </Yanimation>
        }
        width={720}
        onClose={onClose}
        open={open}
        styles={{
          body: {
            paddingBottom: 80,
          },
        }}
      >
        <div>
          <div className="w-full flex justify-between items-center gap-[.5rem] mb-[1.5rem]">
            <button className={`${themeMode === 'dark' ? 'text-white hover:bg-[#001529] hover:text-white' : ''} w-full px-3 py-1 border rounded-md flex items-center justify-center gap-3 hover:bg-gray-200 hover:text-gray-800 transition-all duration-300`}>
              <img src={GOOGLE_ICON} alt="" className="w-[1rem]" />
              Google
            </button>

            <button className={`${themeMode === 'dark' ? 'text-white hover:bg-[#001529] hover:text-white' : ''} w-full px-3 py-1 border rounded-md flex items-center justify-center gap-3 hover:bg-gray-200 hover:text-gray-800 transition-all duration-300`}>
             <FiGithub />
              GitHub
            </button>
          </div>
          <div className="flex justify-center items-center mb-[1.5rem]">
            <div className="border-t border-gray-400 w-full mr-4"></div>{" "}
            <p className="font-bold text-md">O</p>
            <div className="border-t border-gray-400 w-full ml-4"></div>{" "}
          </div>
        </div>

        <FadeAnimation>
          <Form layout="vertical" onFinish={login}>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="email"
                  label="Email"
                  rules={[
                    {
                      type: "email",
                      message: "Por favor introduce un email válido",
                    },
                    {
                      required: true,
                      message: "Por favor introduce tu email",
                    },
                  ]}
                >
                  <Input
                    style={{
                      width: "100%",
                    }}
                    value={data.email}
                    addonBefore={<EmailIcon />}
                    onChange={(e) => {
                      changeHandler(e);
                      handleSetError();
                    }}
                    placeholder="Por favor introduce tu email"
                    autoComplete="on"
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
              <Form.Item
                  name="password"
                  label="Contraseña"
                  rules={[
                    {
                      required: true,
                      message: "Por favor introduce una contraseña",
                    },
                  ]}
                >
                  <Input.Password
                    style={{
                      width: "100%",
                    }}
                    addonBefore={<RiLockPasswordLine />}
                    onChange={(e) => {
                      changeHandler(e);
                      handleSetError();
                    }}
                    value={data.password}
                    autoComplete="on"
                    placeholder="Por favor introduce tu contraseña"
                  />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item>
            <Space>
                  <button
                    className={`${
                      themeMode === "dark"
                        ? " bg-gray-400 hover:bg-transparent text-white"
                        : "text-color-dark"
                    } border rounded-md py-1 px-3 transition-all duration-300`}
                    onClick={onClose}
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className={`${
                      themeMode === "dark"
                        ? "bg-dark-primary hover:bg-a-6"
                        : "bg-color-btn hover:bg-color-btnHover"
                    } transition-all duration-300  text-white px-3 py-1 rounded-md mt-5'`}
                  >
                    Iniciar sesión
                  </button>
                </Space>
            </Form.Item>
          </Form>
        </FadeAnimation>
      </Drawer>
    </>
  );
};
export default LoginDrawer;
