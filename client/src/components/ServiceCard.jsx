import React, { useContext, useEffect, useState } from "react";
import { Button } from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";
import axios from "axios";
import { UserContext } from "@/context/UserContext";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@nextui-org/react";
import ScrollFadeAnimation from "./Animations/FadeAnimation/ScrollFadeAnimation";
import useTheme from "@context/ThemeContext";
import dog from "../images/dog2.webp";
import cat from '../images/catservice.webp'
import rabbit from '../images/rabbit.webp'

const ServiceCard = () => {
  const [loading, setLoading] = useState(false);
  const { currentUser, isSubscribed } = useContext(UserContext);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(
    "Solo se puede seleccionar una suscripción, vacía tu carrito"
  );
  const [messageApi, contextHolder] = message.useMessage();
  const { themeMode } = useTheme();

  const navigate = useNavigate();

  useEffect(() => {
    const fetchingProducts = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_REACT_APP_URL}/products`
        );
        setProducts(res?.data);
      } catch (err) {
        // console.log(err);
      }
      setLoading(false);
    };
    fetchingProducts();
  }, []);

  const addToCart = async (service) => {
    if (!service.price) {
      // Mostrar mensaje si el precio es nulo o está vacío
      messageApi.open({
        type: "info",
        content: "Este producto no está disponible para suscripción. Por favor, póngase en contacto para más información.",
      });
      return;
    }
    try {
      const { _id, name, price, description } = service;
      const data = {
        productId: _id,
        name,
        description,
        price,
        quantity: 1,
      };

      await axios.post(
        `${import.meta.env.VITE_REACT_APP_URL}/users/cart/add-product/${
          currentUser.id
        }`,
        data
      );

      success();
      setTimeout(() => {
        navigate("/cart");
      }, 500);
    } catch (err) {
      setError(err.response.data.message);
      errorMessage();
      // console.log(err);
    }
  };

  const success = () => {
    messageApi.open({
      type: "success",
      content: "Producto añadido al carrito",
    });
  };

  const errorMessage = () => {
    messageApi.open({
      type: "error",
      content: error,
    });
  };

  if (loading) {
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
  }

  return (
    <div className="flex flex-wrap justify-center gap-6 pb-20">
      {contextHolder}
      {products.map((product, index) => (
        <ScrollFadeAnimation key={product._id} delay={index * 0.3}>
          <div
            className={`${
              themeMode === "dark" ? "bg-dark-card" : "bg-white"
            } w-[20rem] md:w-[24rem] p-8 rounded-lg shadow-lg transition duration-300 min-h-[36rem] transform hover:scale-105 flex flex-col justify-between`}
          >
            <div>
              <img
                src={product.name === "Mensual" ? dog : (product.name === 'Anual' ? cat : rabbit)}
                alt={product.name}
                className="w-full h-40 mb-4 object-cover rounded-lg"
              />
              <h4
                className={`${
                  themeMode === "dark" ? "text-dark-primary" : "text-color-btn"
                } text-2xl font-semibold mb-4`}
              >
                {product.name}
              </h4>

              <p
                className={`${
                  themeMode === "dark" ? "text-dark-white" : "text-color-dark"
                } text-lg mb-4`}
              >
                {product.description}
              </p>

              <ul>
                {product.features.map((feature, i) => (
                  <li key={i} className="flex items-center mb-2">
                    <CheckCircleOutlined
                      className={`${
                        themeMode === "dark"
                          ? "text-dark-primary"
                          : "text-color-btn"
                      } text-lg mr-2`}
                    />
                    <p
                      className={`${
                        themeMode === "dark"
                          ? "text-dark-white"
                          : "text-color-dark"
                      } text-md`}
                    >
                      {feature}
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col mt-auto">
              <div className="flex items-center mb-2">
                {product.price && (
                  <p
                    className={`${
                      themeMode === "dark"
                        ? "text-dark-white"
                        : "text-color-dark"
                    } text-base`}
                  >
                    Precio:
                  </p>
                )}
                <div className="flex items-center ml-2">
                  <p
                    className={`${
                      product.discountPrice
                        ? "line-through mr-3 text-red-500"
                        : themeMode === "dark"
                        ? "text-dark-white"
                        : ""
                    } text-lg mr-1`}
                  >
                    {product.price}
                    {product.price ? "€" : ""}
                  </p>
                  {product.discountPrice && (
                    <p
                      className={`${
                        themeMode === "dark" ? "text-dark-white" : ""
                      } text-lg font-semibold`}
                    >
                      {product.discountPrice} €
                    </p>
                  )}
                </div>
              </div>

              <Button
                className={`${
                  themeMode === "dark"
                    ? "bg-dark-primary border-none text-dark-white"
                    : ""
                } w-full font-semibold`}
                onClick={() => addToCart(product)}
                disabled={!currentUser || isSubscribed}
              >
                {!currentUser
                  ? "Inicia sesión para subscribirte"
                  : isSubscribed
                  ? "Ya estás subscrito"
                  : product.price
                  ? "Suscribirse"
                  : "Más información"}
              </Button>
            </div>
          </div>
        </ScrollFadeAnimation>
      ))}
    </div>
  );
};

export default ServiceCard;
