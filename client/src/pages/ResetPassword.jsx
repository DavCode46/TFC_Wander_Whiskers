import { Link, useParams } from "react-router-dom";
import {  useState } from "react";

import axios from "axios";

import { Button, Form, message, Input } from "antd";
import { LockOutlined } from "@ant-design/icons";


import useTheme from "@context/ThemeContext";
import LoginDrawer from "@/components/LoginDrawer";

const ResetPassword = () => {

  const [error, setError] = useState("Ha ocurrido un error");
  const [isReset, setIsReset] = useState(false);
  const { themeMode } = useTheme();

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

      const data = await response.data;
      if (!data) {
        setError("No se pudo restablecer la contraseña");
      }
      success();
      setIsReset(true);
    } catch (err) {
      // console.log(err.response.data.message);
      setError(err.response.data.message);
      errorMessage();
    } 
  };

  return (
    <>
      {contextHolder}
      <div
        className={`${
          themeMode === "dark" ? "darkReset" : ""
        } flex flex-col items-center justify-center min-h-screen`}
      >
        {contextHolder}
        <div
          className={`${
            themeMode === "dark" ? "bg-dark-card" : "bg-white "
          } p-8 rounded-lg shadow-md max-w-md w-[90%] m-auto`}
        >
          <h2
            className={`${
              themeMode === "dark" ? "text-[#ccc]" : ""
            } text-2xl font-semibold text-center mb-6`}
          >
            Restablecer Contraseña
          </h2>
          {!isReset ? (
            <>
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
                    className={`${themeMode === "dark" ? "text-[#ccc]" : ""}`}
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
                    className={`${themeMode === "dark" ? "text-[#ccc]" : ""}`}
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
                    } w-full transition-all duration-300 text-white px-3 py-1 rounded-md mt-5`}
                  >
                    Restablecer Contraseña
                  </Button>
                </Form.Item>
              </Form>
            </>
          ) : (
            <p
              className={`${
                themeMode === "dark" ? "" : ""
              } text-green-500 text-center mb-4 grid gap-5`}
            >
              Tu contraseña ha sido restablecida con éxito.{" "}
              <LoginDrawer text="Iniciar sesión" isMobile isReseting />
            </p>
          )}
          <div className="text-center mt-5">
            <Link to="/" className="text-blue-500 hover:underline">
              Volver a la página principal
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
