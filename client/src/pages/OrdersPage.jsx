import React, { useContext, useEffect, useState } from "react";
import { Button, Empty } from "antd";
import { CartContext } from "@/context/CartContext";
import { Link } from "react-router-dom";
import axios from "axios";
import { UserContext } from "@/context/UserContext";

import DeleteFromCart from "./DeleteFromCart";
import Xanimation from "@/components/Animations/Xanimation/Xanimation";
import FadeAnimation from "@/components/Animations/FadeAnimation/FadeAnimation";

const OrdersPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [orders, setOrders] = useState([]);

  const { currentUser } = useContext(UserContext);
  const token = currentUser.token;
  useEffect(() => {
    const fetchOrders = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_REACT_APP_URL}/orders/users/${
            currentUser.id
          }`,
          {
            withCredentials: true,
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        // Obtener todos los identificadores de productos en el carrito
        const productIds = response?.data.reduce((ids, orderItem) => {
          return [...ids, ...orderItem.products];
        }, []);

        // Consultar los detalles de cada producto en el carrito
        const productDetailsPromises = productIds.map((productId) =>
          axios.get(
            `${import.meta.env.VITE_REACT_APP_URL}/products/${productId}`
          )
        );
        const productDetailsResponses = await Promise.all(
          productDetailsPromises
        );
        const productDetails = productDetailsResponses.map(
          (response) => response.data
        );
        setOrders(productDetails);
      } catch (err) {
        console.log(err);
      }
      setIsLoading(false);
    };
    fetchOrders();
  }, []);

  return (
    <div className="flex flex-col justify-start items-center w-full h-screen py-10">
      <Xanimation>
        <h1 className="text-center font-bold text-2xl mb-5">Tus pedidos</h1>
      </Xanimation>
      {orders.length ? (
        <div className="w-full md:w-3/4 lg:w-2/3">
          <FadeAnimation>
            {orders.map((item) => (
              <div
                key={crypto.randomUUID()}
                className="flex flex-col border border-gray-200 rounded-md p-5 mb-5"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div>
                      <h1 className="text-lg font-semibold">{item.name}</h1>
                      <div className="flex flex-col">
                        <small>
                          Fecha pedido:{" "}
                          {new Date(item.createdAt).toLocaleDateString()}
                        </small>
                        <small>
                          Fecha renovación:{" "}
                          {item.name === "Mensual"
                            ? new Date(
                                new Date(item.createdAt).setMonth(
                                  new Date(item.createdAt).getMonth() + 1
                                )
                              ).toLocaleDateString()
                            : new Date(
                                new Date(item.createdAt).setFullYear(
                                  new Date(item.createdAt).getFullYear() + 1
                                )
                              ).toLocaleDateString()}
                        </small>
                      </div>
                    </div>
                    <p className="text-gray-500">{item.description}</p>
                    <p className="text-gray-600">
                      Precio:{" "}
                      {`${
                        item.name === "Anual" ? item.discountPrice : item.price
                      }`}{" "}
                      €/ud Total:{" "}
                      {`${
                        item.name === "Anual"
                          ? (item.discountPrice * item.quantity).toFixed(2)
                          : (item.price * item.quantity).toFixed(2)
                      }`}{" "}
                      €
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </FadeAnimation>
        </div>
      ) : (
        <div className="flex items-center justify-center h-screen">
          <FadeAnimation>
            <Empty
              image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
              imageStyle={{
                height: 100,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "1rem",
              }}
              description={
                <div>
                  <span className="mt-[3rem]">
                    No tienes ningún{" "}
                    <span className="text-color-btn">pedido</span>
                  </span>
                  <div className="mt-[3rem]">
                    {" "}
                    {/* Espaciado entre el texto y el botón */}
                  </div>
                </div>
              }
            />
          </FadeAnimation>
        </div>
      )}
      <Xanimation>
        <Link
          className="bg-color-btn text-white px-3 py-2 rounded-md hover:bg-color-btnHover hover:text-white transition-all duration-300"
          to="/"
        >
          Volver al inicio
        </Link>
      </Xanimation>
    </div>
  );
};

export default OrdersPage;
