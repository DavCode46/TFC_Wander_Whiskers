import React, { useContext, useEffect, useState } from "react";
import { Button, Empty } from "antd";
import { CartContext } from "@/context/CartContext";
import { Link } from "react-router-dom";
import axios from "axios";
import { UserContext } from "@/context/UserContext";

import DeleteFromCart from "./DeleteFromCart";

const CheckoutSuccess = () => {
  const [cart, setCart] = useContext(CartContext);
  const [isLoading, setIsLoading] = useState(false);
  const [productsCart, setProductsCart] = useState([]);

  const { currentUser } = useContext(UserContext);

  useEffect(() => {
    const fetchProductsCart = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_REACT_APP_URL}/users/cart/${currentUser.id}`
        );

        // Obtener todos los identificadores de productos en el carrito
        const productIds = response?.data.reduce((ids, cartItem) => {
          return [...ids, ...cartItem.products];
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
        setProductsCart(productDetails);
        setCart(productDetails);
      
      } catch (err) {
        console.log(err);
      }
      setIsLoading(false);
    };
    fetchProductsCart();
  }, []);

  return (
    <div className="flex flex-col justify-start items-center w-full h-screen py-10">
      <h1 className="text-center font-bold text-2xl mb-5">
        Detalles de su pedido
      </h1>
      {productsCart.length ? (
        <div className="w-full md:w-3/4 lg:w-2/3">
          {productsCart.map((item) => (
            <div
              key={crypto.randomUUID()}
              className="flex flex-col border border-gray-200 rounded-md p-5 mb-5"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-lg font-semibold">{item.name}</h1>
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
        </div>
      ) : (
        <div className="flex items-center justify-center h-screen">
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
                  No se ha encontrado{" "}
                  <span className="text-color-btn">el pedido</span>
                </span>
                <div className="mt-[3rem]">
                  {" "}
                  {/* Espaciado entre el texto y el botón */}
                  
                </div>
              </div>
            }
          />
        </div>
      )}

      <Link
        className="bg-color-btn text-white px-3 py-2 rounded-md hover:bg-color-btnHover hover:text-white transition-all duration-300"
        to="/"
      >
        Ir a inicio
      </Link>
    </div>
  );
};

export default CheckoutSuccess;
