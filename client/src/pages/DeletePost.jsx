import React, { useContext, useEffect, useState } from "react";
import {  useNavigate, useLocation } from "react-router-dom";
import { UserContext } from "@context/UserContext";
import axios from "axios";
import { Button, message, Popconfirm } from "antd";
import { DeleteOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import useTheme from "@context/ThemeContext";
import { CircularProgress } from "@chakra-ui/react";

const DeletePost = ({ postID: id }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("Error al eliminar la publicación");
  const navigate = useNavigate();
  const location = useLocation();
  const { themeMode } = useTheme();
  const [messageApi, contextHolder] = message.useMessage();

  const { currentUser } = useContext(UserContext);
  const token = currentUser?.token;
  useEffect(() => {
    if (!token) navigate("/login");
  }, []);
  const deletePost = async () => {
    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_REACT_APP_URL}/posts/${id}`,
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (res.status === 200) {
        if (
          location.pathname === `/profile/${currentUser?.id}` ||
          location.pathname === "/dashboard"
        ) {
         
          success();
          window.location.reload();
        } else {
          success();
          navigate("/posts");
        }
      }
      setLoading(false);
    } catch (err) {
      setError(err.response.data.message);
      errorMessage();
      // console.log(err);
    }
  };

  const success = () => {
    messageApi.open({
      type: "success",
      content: "Publicación eliminada con éxito",
    });
  };

  const errorMessage = () => {
    messageApi.open({
      type: "error",
      content: error,
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
        className={`${themeMode === "dark" ? "dark" : ""}`}
        title="Eliminar publicación"
        description="¿Estás seguro que deseas eliminar la publicación?"
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
        onConfirm={deletePost}
      >
        <Button
          type={`${themeMode === "dark" ? "primary" : "default"}`}
          danger
          icon={<DeleteOutlined />}
        >
          <div className="hidden md:inline">Eliminar</div>
        </Button>
      </Popconfirm>
    </>
  );
};

export default DeletePost;
