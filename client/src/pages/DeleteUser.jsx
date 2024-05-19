import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import useTheme from '@context/ThemeContext'
import { CircularProgress } from "@chakra-ui/react";
import { Button, message, Popconfirm, FloatButton } from "antd";
import { DeleteOutlined, QuestionCircleOutlined } from "@ant-design/icons";

const DeleteUser = ({ userID: id, text, float }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const {themeMode} = useTheme()
  const [messageApi, contextHolder] = message.useMessage();

  const { currentUser } = useContext(UserContext);
  const token = currentUser?.token;
  useEffect(() => {
    if (!token) navigate("/login");
  }, []);
  const deleteUser = async () => {
    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_REACT_APP_URL}/users/${id}`,
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (res.status === 200) {
        success();
        if (location.pathname === "/dashboard/users") window.location.reload();
        setTimeout(() => {
          navigate('/logout')
        }, 1000);
      }
      setLoading(false);
    } catch (err) {
      errorMessage();

      console.log(err);
    }
  };

  const success = () => {
    messageApi.open({
      type: "success",
      content: "Usuario eliminado con éxito",
    });
  };

  const errorMessage = () => {
    messageApi.open({
      type: "error",
      content: "Error al eliminar el usuario",
    });
  };

  if (loading)
    return (
      <CircularProgress
        isIndeterminate
        size="100px"
        thickness="7px"
        aria-label="cargando"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />
    );
  return (
    <>
      {contextHolder}
      <Popconfirm
        title="Eliminar usuario"
        description="¿Estás seguro que deseas eliminar el usuario?"
        icon={
          <QuestionCircleOutlined
            style={{
              color: "red",
            }}
          />
        }
        okText="Sí"
        cancelText="No"
        okType="danger"
        onConfirm={deleteUser}
      >
        {float ? (
          <FloatButton danger icon={<DeleteOutlined />}/>
        ) : (
          <Button type={`${themeMode === 'dark' ? 'primary' : 'default'}`} danger icon={<DeleteOutlined />}>
            {text}
          </Button>
        )}
      </Popconfirm>
    </>
  );
};

export default DeleteUser;
