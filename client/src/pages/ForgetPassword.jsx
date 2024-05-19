import React, { useContext, useState } from "react";
import { Form, Input, Button, message } from "antd";
import { LockOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import useTheme from "@context/ThemeContext";
import axios from "axios";
import { UserContext } from "@/context/UserContext";
import { MdOutlineEmail } from "react-icons/md";
const ForgetPassword = () => {
  const [error, setError] = useState();
  const [email, setEmail] = useState()
  const [messageApi, contextHolder] = message.useMessage();
  const { themeMode } = useTheme();
  const navigate = useNavigate();
  const {currentUser} = useContext(UserContext)
  const onFinish = async () => {
   
    try {
      console.log(email)
      await axios.post(
        `${import.meta.env.VITE_REACT_APP_URL}/users/forget-password`,
        {email}
      );
      success();
    } catch (error) {
      console.error("Error al enviar el correo de recuperación:", error);
      setError(error.response.data.message);
      errorMessage();
    }
  };

  const success = () => {
    messageApi.open({
      type: "success",
      content: "Correo enviado con éxito, revisa tu bandeja de entrada",
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
      <div className="flex flex-col items-center justify-center min-h-screen">
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
            Recuperar Contraseña
          </h2>
          <p className="text-center text-gray-600 mb-4">
            Ingrese su dirección de correo electrónico para restablecer su
            contraseña.
          </p>
          <Form
            name="forgot_password"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            className="space-y-4"
          >
            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                  message: "Por favor ingrese su correo electrónico.",
                },
              ]}
            >
              <Input
                onChange={(e) => setEmail(e.target.value)}
                prefix={
                  <MdOutlineEmail
                    className={`${
                      themeMode === "dark" ? "text-[#ccc]" : "text-gray-400"
                    } `}
                  />
                }
                className={`${themeMode === 'dark' ? 'text-[#ccc]' : ''}`}
                placeholder="Correo Electrónico"
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                className={`w-full ${
                  themeMode === "light"
                    ? "bg-color-btn hover:bg-color-btnHover"
                    : ""
                }`}
                htmlType="submit"
              >
                Enviar Correo de Recuperación
              </Button>
            </Form.Item>
          </Form>
          <div className="text-center mt-5">
            <Link to="/" className="text-blue-500 hover:underline">
              Volver al inicio
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgetPassword;
