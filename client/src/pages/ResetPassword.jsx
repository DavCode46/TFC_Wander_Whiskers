import { Link, useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { RiLockPasswordLine } from "react-icons/ri";
import axios from "axios";

import LOGO from "@images/logo/1.svg";
import DARK_LOGO from "@images/logo/3.svg";
import { Button, Col, Drawer, Form, message, Input, Row, Space } from "antd";
import { PlusOutlined, LockOutlined } from "@ant-design/icons";
import { UserContext } from "@/context/UserContext";
import FadeAnimation from "@components/Animations/FadeAnimation/FadeAnimation";

import useTheme from "@context/ThemeContext";

const ResetPassword = () => {
  const [open, setOpen] = useState(false);
  const [newPassword, setNewPassword] = useState();
  const [error, setError] = useState("Ha ocurrido un error");
  const { themeMode } = useTheme();
  const navigate = useNavigate();
  const { id, token } = useParams();
  const [messageApi, contextHolder] = message.useMessage();

  const [formData, setFormData] = useState({
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

  const success = () => {
    messageApi.open({
      type: "success",
      content: "Contraseña restablecida con éxito",
    });
  };

  const errorMessage = () => {
    messageApi.open({
      type: "error",
      content: error || "Ha ocurrido un error",
    });
  };

  const resetPassword = async (values) => {
    const { newPassword, confirmNewPassword } = values;
    console.log("newPassword", newPassword);
    console.log("confirm", confirmNewPassword);
    console.log(values);
    console.log(
      `${
        import.meta.env.VITE_REACT_APP_URL
      }/users/reset-password/${id}/${token}`,
      newPassword,
      token
    );
    try {
      const response = await axios.post(
        `${
          import.meta.env.VITE_REACT_APP_URL
        }/users/reset-password/${id}/${token}`,
        {
          newPassword,
          confirmNewPassword,
          token,
        }
      );
      console.log(response);
      const data = await response.data;
      if (!data) {
        setError("No se pudo restablecer la contraseña");
      }
      console.log("response", response);
      console.log("data", data);
      success();
      navigate("/");
    } catch (err) {
      console.log(err.response.data.message);
      setError(err.response.data.message);
      errorMessage();
    }
  };

  const handleSetError = () => {
    setError("");
  };

  return (
    <>
      {contextHolder}
      <div className="flex flex-col items-center justify-center min-h-screen">
        {contextHolder}
        <div
          className={`${
            themeMode === "dark" ? "bg-dark-card" : "bg-white "
          } p-8 rounded-lg shadow-md max-w-md w-full`}
        >
          <h2
            className={`${
              themeMode === "dark" ? "text-[#ccc]" : ""
            } text-2xl font-semibold text-center mb-6`}
          >
            Restablecer Contraseña
          </h2>
          <Form
            name="reset_password"
            onFinish={resetPassword}
            className="space-y-4"
          >
            <Form.Item
              name="newPassword"
              rules={[
                {
                  required: true,
                  message: "Por favor ingrese su nueva contraseña.",
                },
              ]}
            >
              <Input.Password
                prefix={
                  <LockOutlined
                    className={`${
                      themeMode === "dark" ? "text-[#ccc]" : "text-gray-400"
                    }`}
                  />
                }
                value={formData.newPassword}
                onChange={(e) => handleChange(e)}
                placeholder="Nueva Contraseña"
                autoComplete="on"
              />
            </Form.Item>

            <Form.Item
              name="confirmNewPassword"
              dependencies={["newPassword"]}
              rules={[
                {
                  required: true,
                  message: "Por favor confirme su nueva contraseña.",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("newPassword") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error("Las contraseñas no coinciden")
                    );
                  },
                }),
              ]}
            >
              <Input.Password
                prefix={
                  <LockOutlined
                    className={`${
                      themeMode === "dark" ? "text-[#ccc]" : "text-gray-400"
                    }`}
                  />
                }
                value={formData.confirmNewPassword}
                placeholder="Confirmar Nueva Contraseña"
                onChange={(e) => handleChange(e)}
                autoComplete="on"
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className={`${
                  themeMode === "dark"
                    ? "bg-dark-primary hover:bg-a-6"
                    : "bg-color-btn hover:bg-color-btnHover"
                } transition-all duration-300 text-white px-3 py-1 rounded-md mt-5`}
              >
                Restablecer Contraseña
              </Button>
            </Form.Item>
          </Form>
          <div className="text-center mt-5">
            <Link to="/login" className="text-blue-500 hover:underline">
              Volver a la página principal
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
