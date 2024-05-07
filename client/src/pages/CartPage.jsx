import React, { useContext, useEffect, useState } from "react";
import { Button, Empty, List, Skeleton, message } from "antd";
import { CartContext } from "@/context/CartContext";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "@/context/userContext";

import DeleteFromCart from "./DeleteFromCart";

const CartPage = () => {
  const [cart, setCart] = useContext(CartContext);
  const [initLoading, setInitLoading] = useState(true);
  const [data, setData] = useState([]);
  const [list, setList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [productsCart, setProductsCart] = useState([]);

  const navigate = useNavigate();

  console.log("products cart", productsCart);

  const { currentUser } = useContext(UserContext);
  const token = currentUser?.token;
  useEffect(() => {
    if (!token) navigate("/login");
  }, []);
  console.log("id usuario cart", currentUser.id);

  useEffect(() => {
    const fetchProductsCart = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_REACT_APP_URL}/users/cart/${currentUser.id}`,
          {
            withCredentials: true,
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setProductsCart(response?.data);

        // Obtener todos los identificadores de productos en el carrito
        const productIds = response?.data.reduce((ids, cartItem) => {
          return [...ids, ...cartItem.products];
        }, []);
        console.log("productId", productIds);
        // Consultar los detalles de cada producto en el carrito
        const productDetailsPromises = productIds.map((productId) =>
          axios.get(
            `${import.meta.env.VITE_REACT_APP_URL}/products/663a64ec6f7175c97919f4d9`
          )
        );
        const productDetailsResponses = await Promise.all(
          productDetailsPromises
        );
        const productDetails = productDetailsResponses.map(
          (response) => response.data
        );

        console.log("Product details in cart", productDetails);
      } catch (err) {
        console.log(err);
      }
      setIsLoading(false);
    };
    fetchProductsCart();
  }, []);

  console.log("productsCart", productsCart);

  const handleIncrement = (productId) => {
    // Incrementa la cantidad del producto en el carrito
    setCart((prevCart) =>
      prevCart.map((item) => {
        if (item.id === productId) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      })
    );
  };

  const handleDecrement = (productId) => {
    // Decrementa la cantidad del producto en el carrito, evita que sea menor que 1
    setCart((prevCart) =>
      prevCart.map((item) => {
        if (item.id === productId && item.quantity > 1) {
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      })
    );
  };

  const handlePay = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_REACT_APP_URL}/users/cart/checkout/${
          currentUser.id
        }`
      );
      const paymentUrl = response.data.url; // Obtener la URL de pago de la respuesta
      window.location.href = paymentUrl; // Redirigir al usuario a la página de pago de Stripe
    } catch (error) {
      console.error(error);
      message.error("Error al procesar el pago");
    }
    setIsLoading(false);
  };
  console.log("productsCart", productsCart);
  return (
    <div className="flex flex-col justify-start items-center w-full h-screen py-10">
      <h1 className="text-center font-bold text-2xl mb-5">
        Carrito de Compras
      </h1>
      {productsCart.length ? (
        <div className="w-full">
          {productsCart.map((item, index) => (
            <div
              key={item._id}
              className="flex flex-col border border-gray-200 rounded-md p-5 mb-5"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-lg font-semibold">{item.name}</h1>
                  <p className="text-gray-500">{item.description}</p>
                  <p className="text-gray-600">
                    Precio: {item.price} €/ud Total:{" "}
                    {(item.price * item.quantity).toFixed(2)} €
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <Button
                    type="default"
                    size="small"
                    onClick={() => handleDecrement(item.id)}
                  >
                    -
                  </Button>
                  <span>{item.quantity}</span>
                  <Button
                    type="default"
                    size="small"
                    onClick={() => handleIncrement(item.id)}
                  >
                    +
                  </Button>
                  {/* <Button
                    danger
                    size="small"
                    onClick={() => handleRemoveFromCart(item.id)}
                  >
                    Eliminar
                  </Button> */}
                  <DeleteFromCart productId={item.id} />
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
                  No se han encontrado{" "}
                  <span className="text-color-btn">productos en el carro</span>
                </span>
                <div className="mt-[3rem]">
                  {" "}
                  {/* Espaciado entre el texto y el botón */}
                  <Link
                    className="bg-color-btn text-white px-3 py-2 rounded-md hover:bg-color-btnHover hover:text-white transition-all duration-300"
                    to="/"
                  >
                    Ir a inicio
                  </Link>
                </div>
              </div>
            }
          />
        </div>
      )}
      {productsCart.length > 0 && (
        <Button type="default" className="mt-5" onClick={handlePay}>
          Pagar pedido
        </Button>
      )}
    </div>
  );
};

export default CartPage;
