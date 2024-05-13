import React, { useContext, useEffect, useState } from "react";
import { Button } from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";
import axios from "axios";
import { UserContext } from "@/context/userContext";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@nextui-org/react";
import ScrollFadeAnimation from "./Animations/FadeAnimation/ScrollFadeAnimation";

const ServiceCard = () => {
  const [loading, setLoading] = useState("");
  const { currentUser } = useContext(UserContext);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(
    "Solo se puede seleccionar una suscripción, vacía tu carrito"
  );
  const [messageApi, contextHolder] = message.useMessage();

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
        console.log(err);
      }
      setLoading(false);
    };
    fetchingProducts();
  }, []);

  const addToCart = async (service) => {
    try {
      const { _id, name, price, description } = service; // Extraer los campos necesarios del servicio
      const data = {
        productId: _id,
        name,
        description,
        price,
        quantity: 1, // Por defecto, agregamos una cantidad de 1 al carrito
      };

      const res = await axios.post(
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
      console.log(err);
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
    <div className="flex flex-col lg:flex-row sm:ml-[2rem] items-center justify-center gap-[2rem] lg:ml-[3rem]">
      {contextHolder}
      {products.map((product, index) => (
        <ScrollFadeAnimation key={product._id} delay={index * 0.3}>
          <div className="w-[12rem] max-lg:w-full min-h-[38rem] px-6 border border-n-6 rounded-[2rem] lg:w-auto py-8 my-4 [&>h4]:odd:text-color-btn  [&>h4]:even:text-[#FFC876] mb-[3rem] font-grotesk">
            <h4 className="text-[2rem] mb-4">{product.name}</h4>

            <p className="min-h-[3rem] text-[1.2rem] mb-3 text-color-dark">
              {product.description}
            </p>

            <div className="flex items-center h-[5.5rem] mb-6">
              {product.price && (
                <div className="flex flex-col">
                  <div
                    className={`${
                      product.name == "Anual"
                        ? "line-through text-xl text-red-500 flex"
                        : "text-[3rem] leading-none font-bold flex items-center"
                    } `}
                  >
                    {product.price}
                    <div className="text-xl">€</div>
                  </div>

                  <div>
                    {product.discountPrice && (
                      <div
                        className={
                          "text-[3rem] leading-none font-bold flex items-center"
                        }
                      >
                        {product.discountPrice}
                        <div className="text-xl">€</div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            <Button
              className="w-full mb-6 font-montserrat"
              onClick={() => addToCart(product)}
              disabled={!currentUser || currentUser.isSubscribed}
            >
              {!currentUser
                ? "Debes iniciar sesión para poder suscribirte"
                : currentUser.isSubscribed
                ? "Ya estás suscrito"
                : product.price
                ? "Suscribirse"
                : "Solicitar información"}
            </Button>

            <ul>
              {product.features.map((feature) => (
                <li
                  key={crypto.randomUUID()}
                  className="font-montserrat flex items-start py-5 border-t border-n-6"
                >
                  <CheckCircleOutlined className="text-color-btn text-lg" />
                  <p className="body-2 ml-4">{feature}</p>
                </li>
              ))}
            </ul>
          </div>
        </ScrollFadeAnimation>
      ))}
    </div>
  );
};

export default ServiceCard;
