import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";

import { RiLockPasswordLine } from "react-icons/ri";

import axios from "axios";

import LOGO from "@images/logo/1.svg";
import DARK_LOGO from "@images/logo/3.svg";

import { LoginOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  Drawer,
  Form,
  message,
  Input,
  Row,
  Space,
  FloatButton,
} from "antd";
import { UserContext } from "@/context/UserContext";
import FadeAnimation from "./Animations/FadeAnimation/FadeAnimation";
import Yanimation from "./Animations/Yanimation/Yanimation";
import useTheme from "@context/ThemeContext";
import UserDrawer from "./UserDrawer";
import { MdOutlineEmail } from "react-icons/md";

const LoginDrawer = ({ text, isMobile, isReseting }) => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const { themeMode } = useTheme();

  const [error, setError] = useState("Error al iniciar sesión");
  const navigate = useNavigate();

  const [messageApi, contextHolder] = message.useMessage();

  const { currentUser, setCurrentUser } = useContext(UserContext);

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
    const { email, password } = values;

    const data = new FormData();
    data.set("email", email);
    data.set("password", password);
    setError("");
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_REACT_APP_URL}/users/login`,
        data
      );
      const user = await response.data;

      setCurrentUser(user);
      success();

      setData({
        email: "",
        password: "",
      });

      setTimeout(() => {
        onClose();
        if (isReseting) {
          navigate("/");
        }
      }, 1000);
    } catch (err) {
      // console.log(err)
      setError(err.response.data.message);
      errorMessage();
      // No mostrar el error en la consola
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
      content: error || "Credenciales incorrectas",
    });
  };
  return (
    <>
      {contextHolder}
      {!isMobile ? (
        <FloatButton
          shape="square"
          type={`${themeMode === "dark" ? "primary" : "default"}`}
          onClick={showDrawer}
          icon={<LoginOutlined />}
        />
      ) : (
        <Button
          type={`${themeMode === "dark" ? "primary" : ""}`}
          onClick={showDrawer}
          icon={<LoginOutlined />}
        >
          {text}{" "}
        </Button>
      )}

      <Drawer
        className={`${themeMode === "dark" ? "darkMode" : "lightMode"}`}
        title={
          <Yanimation>
            <div
              className={`${
                themeMode === "dark" ? "text-[#ccc]" : ""
              } flex items-center mt-4`}
            >
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
        <FadeAnimation>
          <Form layout="vertical" onFinish={login}>
            <Row gutter={16}>
              <Col xs={24} sm={12}>
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
                    addonBefore={
                      <MdOutlineEmail
                        className={`${
                          themeMode === "dark" ? "text-white" : ""
                        }`}
                      />
                    }
                    onChange={(e) => {
                      changeHandler(e);
                      handleSetError();
                    }}
                    placeholder="Por favor introduce tu email"
                    autoComplete="on"
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
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
                    addonBefore={
                      <RiLockPasswordLine
                        className={`${
                          themeMode === "dark" ? "text-white" : ""
                        }`}
                      />
                    }
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
            {!currentUser ? (
              <Form.Item>
                <div className="flex flex-col gap-2 md:flex-row">
                  <span
                    className={`${themeMode === "dark" ? "text-[#ccc]" : ""}`}
                  >
                    ¿Has olvidado tu contraseña?
                  </span>
                  <div>
                    <Link
                      to="/forgot-password"
                      className={`${
                        themeMode === "dark"
                          ? "text-dark-primary hover:text-a-7"
                          : "text-color-btn hover:text-color-btnHover"
                      }`}
                      onClick={onClose}
                    >
                      Recuperar contraseña
                    </Link>
                  </div>
                </div>
              </Form.Item>
            ) : (
              ""
            )}

            <Form.Item>
              <Space className="mb-3">
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
              <div>
                <div>
                  <small
                    className={`${
                      themeMode === "dark" ? "text-[#ccc]" : ""
                    } text-sm block mb-3 mt-3`}
                  >
                    ¿Aún no tienes cuenta?
                  </small>
                </div>
                <UserDrawer openButton={"Registrarse"} isRegistering />
              </div>
            </Form.Item>
          </Form>
        </FadeAnimation>
      </Drawer>
    </>
  );
};
export default LoginDrawer;
