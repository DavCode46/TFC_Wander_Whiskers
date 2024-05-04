import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { EmailIcon } from "@chakra-ui/icons";
import { RiLockPasswordLine } from "react-icons/ri";
import { FaRegUser } from "react-icons/fa";

import axios from "axios";

import { PlusOutlined,EditOutlined } from "@ant-design/icons";
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
import { UserContext } from "@/context/userContext";
// const { Option } = Select;
const UserDrawer = ({ isRegistering, openButton, userName, email }) => {
  const [open, setOpen] = useState(false);
  // const [isLoading, setLoading] = useState("");
  // const [username, setUsername] = useState(undefined);
  // const [email, setEmail] = useState("");
  // const [currentPassword, setCurrentPassword] = useState("");
  // const [profileImage, setProfileImage] = useState("");
  // const [newPassword, setNewPassword] = useState("");
  // const [confirmNewPassword, setConfirmNewPassword] = useState("");

  // const [registerUser, setRegisterUser] = useState({
  //   username: "",
  //   email: "",
  //   password: "",
  //   confirmPassword: "",
  // });

  // const [editUser, setEditUser] = useState({
  //   username: "",
  //   email: "",
  //   currentPassword: "",
  //   newPassword: "",
  //   confirmNewPassword: "",
  // });
  // console.log("editUser antes de fetch", editUser);

  const [error, setError] = useState("Ha ocurrido un error");
  const { currentUser } = useContext(UserContext);
  const token = currentUser?.token;

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
  
  // useEffect(() => {
  //   console.log("formData antes de fetchUser", formData);
  // }, [formData]);

  // useEffect(() => {
  //   if (!isRegistering) {
  //     const fetchUser = async () => {
  //       try {
  //         const res = await axios.get(
  //           `${import.meta.env.VITE_REACT_APP_URL}/users/${currentUser.id}`,
  //           {
  //             withCredentials: true,
  //             headers: { Authorization: `Bearer ${token}` },
  //           }
  //         );
  //         const { username, email } = res.data;
  //         setFormData((prevData) => ({
  //           ...prevData,
  //           username: capitalizeWords(username),
  //           email: email,
  //         }));
  //         console.log('username', formData.username)
  //         console.log('email', formData.email)
  //         console.log("formData en el fetchUser", formData);
  //       } catch (error) {
  //         console.error("Error fetching user data:", error);
  //       }
  //     };

  //     fetchUser();
  //   }
  // }, []);

  // useEffect(() => {
  //   console.log("formData tras fetchUser", formData);
  // }, [formData]);

  // Función para manejar los cambios en el formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    console.log('formData, handleChange', formData)
    console.log('name handleCHange', name)
    console.log('value handleCHange', value)
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
      content: "Registro realizado con éxito",
    });
    onClose(); // Cierra el Drawer
  };

  const errorMessage = () => {
    messageApi.open({
      type: "error",
      content: error,
    });
  };

  const register = async (values) => {
    console.log(values);
    const { username, email, password, confirmPassword } = values;

    console.log(register);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_REACT_APP_URL}/users/register`,
        { username, email, password, confirmPassword }
      );
      const newUser = await response.data;
      console.log(newUser);
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
      console.log("ruta", `${import.meta.env.VITE_REACT_APP_URL}/users/edit`);

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
        title={`${isRegistering ? "Crear cuenta" : "Editar perfil"}`}
        width={720}
        onClose={onClose}
        open={open}
        styles={{
          body: {
            paddingBottom: 80,
          },
        }}
      >
        <Form
          layout="vertical"
          onFinish={isRegistering ? register : updateProfile}
        >
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
                  value={`${!isRegistering && userName}`}
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
                  value={`${!isRegistering && email}`}
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
                        if (!value || getFieldValue("newPassword") === value) {
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
              <Button onClick={onClose}>Cancelar</Button>
              <button
                type="submit"
                className=" bg-color-btn  text-white px-3 py-1 rounded-md"
              >
                {isRegistering ? "Registrarse" : "Actualizar perfil"}
              </button>
            </Space>
          </Form.Item>
        </Form>
      </Drawer>
    </>
  );
};
export default UserDrawer;
