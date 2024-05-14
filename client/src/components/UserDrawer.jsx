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
import { PlusOutlined, EditOutlined } from "@ant-design/icons";
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
} from "antd";
import { UserContext } from "@/context/UserContext";
import FadeAnimation from "./Animations/FadeAnimation/FadeAnimation";
import Yanimation from "./Animations/Yanimation/Yanimation";
import useTheme from "@context/theme";
// const { Option } = Select;
const UserDrawer = ({ isRegistering, openButton, email }) => {
  const [open, setOpen] = useState(false);

  const [error, setError] = useState("Ha ocurrido un error");
  const { currentUser } = useContext(UserContext);
  const token = currentUser?.token;
  const { themeMode } = useTheme();
  const navigate = useNavigate();

  const [messageApi, contextHolder] = message.useMessage();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  // Función para manejar los cambios en el formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const success = () => {
    messageApi.open({
      type: "success",
      content: `${
        isRegistering
          ? "Registro realizado con éxito"
          : "Usuario actualizado con éxito"
      }`,
    });
    onClose(); // Cierra el Drawer
  };

  const errorMessage = () => {
    messageApi.open({
      type: "error",
      content: error || "Ha ocurrido un error",
    });
  };

  const register = async (values) => {
    const { username, email, password, confirmPassword } = values;

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_REACT_APP_URL}/users/register`,
        { username, email, password, confirmPassword }
      );
      const newUser = await response.data;
      if (!newUser) {
        setError("No se pudo registrar el usuario");
      }
      success();
      navigate("/login");
    } catch (err) {
      console.log(err.response.data.message);
      setError(err.response.data.message);
      errorMessage();
    }
  };

  const updateProfile = async (values) => {
    const {
      username,
      email,
      currentPassword,
      newPassword,
      confirmNewPassword,
    } = values;
    try {
      const data = new FormData();
      data.set("username", username);
      data.set("email", email);
      data.set("currentPassword", currentPassword);
      data.set("newPassword", newPassword);
      data.set("confirmNewPassword", confirmNewPassword);

      const res = await axios.patch(
        `${import.meta.env.VITE_REACT_APP_URL}/users/edit`,
        data,
        { withCredentials: true, headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.status === 200) {
        success();
        setTimeout(() => {
          navigate("/logout");
        }, 1000);
      }
    } catch (err) {
      setError(err.response.data.message);
      errorMessage();
    }
  };

  const handleSetError = () => {
    setError("");
  };
  const capitalizeWords = (str) => {
    return str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };
  return (
    <>
      {contextHolder}
      <Button
        className="  text-blue-400 hover:text-blue-500 hover:underline text-[.85rem] w-[13rem]"
        onClick={showDrawer}
        icon={isRegistering ? <PlusOutlined /> : <EditOutlined />}
      >
        {openButton}
      </Button>
      <Drawer
       className={`${themeMode === "dark" ? "darkMode" : "lightMode"}`}
        title={
          <Yanimation>
            <div className="flex items-center mt-4">
              {isRegistering
                ? "Registrarse en Wander Whiskers"
                : "Editar perfil"}
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
        {isRegistering && (
          <div>
            <div className="w-full flex justify-between items-center gap-[.5rem] mb-[1.5rem]">
              <button className="w-full px-3 py-1 border rounded-md flex items-center justify-center gap-3 hover:bg-gray-200 hover:text-gray-800 transition-all duration-300">
                <img src={GOOGLE_ICON} alt="" className="w-[1rem]" />
                Google
              </button>

              <button className="w-full px-3 py-1 border rounded-md flex items-center justify-center gap-3 hover:bg-gray-200 hover:text-gray-800 transition-all duration-300">
                <img src={GITHUB_ICON} alt="" className="w-[1rem]" />
                GitHub
              </button>
            </div>
            <div className="flex justify-center items-center mb-[1.5rem]">
              <div className="border-t border-gray-400 w-full mr-4"></div>{" "}
              <p className="font-bold text-md">O</p>
              <div className="border-t border-gray-400 w-full ml-4"></div>{" "}
            </div>
          </div>
        )}
        <FadeAnimation>
          <Form
            layout="vertical"
            onFinish={isRegistering ? register : updateProfile}
          >
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="username"
                  initialValue={`${!isRegistering ? currentUser.username : ""}`}
                  label="Nombre de usuario"
                  rules={[
                    {
                      required: true,
                      message: "Por favor introduce tu nombre",
                    },
                  ]}
                >
                  <Input
                    addonBefore={<FaRegUser />}
                    placeholder="Por favor introduce tu nombre"
                    onChange={(e) => {
                      {
                        handleChange(e);
                      }
                      handleSetError();
                    }}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="email"
                  label="Email"
                  initialValue={`${!isRegistering ? email : ""}`}
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
                    addonBefore={<EmailIcon />}
                    onChange={(e) => {
                      {
                        handleChange(e);
                      }
                      handleSetError();
                    }}
                    placeholder="Por favor introduce tu email"
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                {isRegistering ? (
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
                        handleChange(e);
                        handleSetError();
                      }}
                      placeholder="Por favor introduce tu contraseña"
                    />
                  </Form.Item>
                ) : (
                  <Form.Item
                    name="currentPassword"
                    label="Contraseña actual"
                    rules={[
                      {
                        required: true,
                        message: "Por favor introduce tu contraseña",
                      },
                    ]}
                  >
                    <Input.Password
                      style={{
                        width: "100%",
                      }}
                      addonBefore={<RiLockPasswordLine />}
                      value={formData.currentPassword}
                      onChange={(e) => {
                        handleChange(e);
                        handleSetError();
                      }}
                      placeholder="Por favor introduce tu contraseña"
                    />
                  </Form.Item>
                )}
              </Col>
              <Col span={12}>
                {isRegistering ? (
                  <Form.Item
                    name="confirmPassword"
                    label="Confirmar contraseña"
                    dependencies={["password"]}
                    rules={[
                      {
                        required: true,
                        message: "Por favor confirma tu contraseña",
                      },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || getFieldValue("password") === value) {
                            return Promise.resolve();
                          }
                          return Promise.reject("Las contraseñas no coinciden");
                        },
                      }),
                    ]}
                  >
                    <Input.Password
                      style={{
                        width: "100%",
                      }}
                      addonBefore={<RiLockPasswordLine />}
                      onChange={(e) => {
                        handleChange(e);
                        handleSetError();
                      }}
                      placeholder="Por favor confirma tu contraseña"
                    />
                  </Form.Item>
                ) : (
                  <Form.Item
                    name="newPassword"
                    label="Nueva contraseña"
                    rules={[
                      {
                        required: true,
                        message: "Por favor introduce tu nueva contraseña",
                      },
                    ]}
                  >
                    <Input.Password
                      style={{
                        width: "100%",
                      }}
                      addonBefore={<RiLockPasswordLine />}
                      value={formData.newPassword}
                      onChange={(e) => {
                        handleChange(e);
                        handleSetError();
                      }}
                      placeholder="Por favor confirma tu contraseña"
                    />
                  </Form.Item>
                )}
              </Col>
            </Row>
            <Row glutter={16}>
              <Col span={24}>
                {!isRegistering && (
                  <Form.Item
                    name="confirmNewPassword"
                    label="Confirma tu nueva contraseña"
                    dependencies={["newPassword"]}
                    rules={[
                      {
                        required: true,
                        message:
                          "Por favor vuelve a introducir tu nueva contraseña",
                      },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (
                            !value ||
                            getFieldValue("newPassword") === value
                          ) {
                            return Promise.resolve();
                          }
                          return Promise.reject("Las contraseñas no coinciden");
                        },
                      }),
                    ]}
                  >
                    <Input.Password
                      style={{
                        width: "100%",
                      }}
                      addonBefore={<RiLockPasswordLine />}
                      value={formData.confirmNewPassword}
                      onChange={(e) => {
                        handleChange(e);
                        handleSetError();
                      }}
                      placeholder="Por favor confirma tu nueva contraseña"
                    />
                  </Form.Item>
                )}
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
                  {isRegistering ? "Registrarse" : "Actualizar perfil"}
                </button>
              </Space>
            </Form.Item>
          </Form>
        </FadeAnimation>
      </Drawer>
    </>
  );
};
export default UserDrawer;
