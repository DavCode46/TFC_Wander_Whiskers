import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";
import axios from "axios";
import { Button, message, Popconfirm } from "antd";
import { DeleteOutlined, QuestionCircleOutlined } from "@ant-design/icons";

import { CircularProgress } from "@chakra-ui/react";

const DeleteFromCart = ({ productId: id }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("Error al eliminar el producto");
  const navigate = useNavigate();
 

  const [messageApi, contextHolder] = message.useMessage();

  const { currentUser } = useContext(UserContext);
  const token = currentUser?.token;
  useEffect(() => {
    if (!token) navigate("/login");
  }, []);
  const deleteProduct = async () => {
    
    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_REACT_APP_URL}/users/cart/${
          currentUser.id
        }/${id}`,
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (res.status === 200) {
        success();
        window.location.reload();
      }
      setLoading(false);
    } catch (err) {
      setError(err.response.data.message);
      errorMessage();
      console.log(err);
    }
  };

  const success = () => {
    messageApi.open({
      type: "success",
      content: "Producto eliminado del carrito con éxito",
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
        title="Eliminar producto"
        description="¿Estás seguro que deseas eliminar el producto?"
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
        onConfirm={deleteProduct}
      >
        <Button danger icon={<DeleteOutlined />}>
          <div className="hidden md:inline">Eliminar</div>
        </Button>
      </Popconfirm>
    </>
  );
};

export default DeleteFromCart;
