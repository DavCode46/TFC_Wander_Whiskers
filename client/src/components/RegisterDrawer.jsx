import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { EmailIcon } from "@chakra-ui/icons";
import { RiLockPasswordLine } from "react-icons/ri";
import { FaRegUser } from "react-icons/fa";

import axios from "axios";

import { PlusOutlined } from "@ant-design/icons";
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
const { Option } = Select;
const RegisterDrawer = () => {
  const [open, setOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(true);
  const [showConfirmPassword, setShowConfirmPassword] = useState(true);
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("Error al registrarse");
  const navigate = useNavigate();

  const [messageApi, contextHolder] = message.useMessage();
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const success = () => {
    messageApi.open({
      type: "success",
      content: "Registro realizado con éxito",
    });
  };
  const errorMessage = () => {
    messageApi.open({
      type: "error",
      content: error,
    });
  };

  const changeHandler = (e) => {
    setUser((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };

  const register = async (values) => {
    const { username, email, password, confirmPassword } = values;
    setError("");
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_REACT_APP_URL}/users/register`,
        { username, email, password, confirmPassword}
      );
      const newUser = await response.data;
      console.log(newUser);
      if (!newUser) {
        setError("No se pudo registrar el usuario");
      }
      success();
      onClose()
    } catch (err) {
      console.log(err.response.data.message);
      setError(err.response.data.message);
      errorMessage();
    }
  };
  const handleClickPassword = () => setShowPassword(!showPassword);
  const handleClickConfirmPassword = () =>
    setShowConfirmPassword(!showConfirmPassword);

  const handleSetError = () => {
    setError("");
  };

  return (
    <>
    {contextHolder}
      <Button
        className="  text-blue-400 hover:text-blue-500 hover:underline text-[.8rem]"
        onClick={showDrawer}
        icon={<PlusOutlined />}
      >
        Registrarse
      </Button>
      <Drawer
        title="Crear cuenta"
        width={720}
        onClose={onClose}
        open={open}
        styles={{
          body: {
            paddingBottom: 80,
          },
        }}
        // extra={
        //   <Space>
        //     <Button onClick={onClose}>Cancelar</Button>
        //     <Button className=" bg-color-btn  text-white">
        //       Registrarse
        //     </Button>
        //   </Space>
        // }
      >
        <Form layout="vertical" onFinish={register}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="username"
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
                  value={user.username}
                  onChange={(e) => {
                    changeHandler(e);
                    handleSetError();
                  }}
                />
              </Form.Item>
            </Col>
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
                  addonBefore={<EmailIcon />}
                  value={user.email}
                  onChange={(e) => {
                    changeHandler(e);
                    handleSetError();
                  }}
                  placeholder="Por favor introduce tu email"
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
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
                  value={user.password}
                  onChange={(e) => {
                    changeHandler(e);
                    handleSetError();
                  }}
                  placeholder="Por favor introduce tu contraseña"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
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
                  value={user.confirmPassword}
                  onChange={(e) => {
                    changeHandler(e);
                    handleSetError();
                  }}
                  placeholder="Por favor confirma tu contraseña"
                />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item>
          <Space>
            <Button onClick={onClose}>Cancelar</Button>
            <Button className=" bg-color-btn  text-white">
              Registrarse
            </Button>
          </Space>
           
          </Form.Item>
        </Form>
      </Drawer>
    </>
  );
};
export default RegisterDrawer;
