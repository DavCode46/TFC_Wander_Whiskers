import React, { useState } from "react";
import { Form, Input, Button, message } from "antd";
import { Link } from "react-router-dom";
import useTheme from "@context/ThemeContext";
import axios from "axios";
import { MdOutlineEmail } from "react-icons/md";


const ForgetPassword = () => {
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const { themeMode } = useTheme();
  

  const onFinish = async () => {
    setIsSending(true);

    try {
      await axios.post(
        `${import.meta.env.VITE_REACT_APP_URL}/users/forget-password`,
        { email }
      );

      success();
      setTimeout(() => {
        setIsSent(true);
      }, 500);
    } catch (error) {
      console.error("Error al enviar el correo de recuperación:", error);
      setError(error.response?.data?.message || "Ha ocurrido un error");
      errorMessage();
    } finally {
      setIsSending(false);
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
          } p-8 rounded-lg shadow-md max-w-md w-[90%] m-auto`}
        >
          <h2
            className={`${
              themeMode === "dark" ? "text-[#ccc]" : "text-dark-grey"
            } text-2xl font-semibold text-center mb-6`}
          >
            {!isSent ? "Recuperar Contraseña" : "¡Mensaje enviado con éxito!"}
          </h2>
          {isSent ? (
            <div className="text-center mb-4">
              <p>Revisa tu bandeja de entrada y sigue las instrucciones</p>
            </div>
          ) : (
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
                  {
                    type: "email",
                    message: "Por favor ingrese un correo electrónico válido.",
                  },
                ]}
              >
                <Input
                  onChange={(e) => setEmail(e.target.value)}
                  prefix={<MdOutlineEmail />}
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
                  loading={isSending}
                >
                  Enviar Correo de Recuperación
                </Button>
              </Form.Item>
            </Form>
          )}
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
