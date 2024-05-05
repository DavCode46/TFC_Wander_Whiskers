import React, { useContext, useEffect, useState } from "react";
import { Button, Empty, List, Skeleton, message } from "antd";
import { CartContext } from "@/context/CartContext";
import { Link } from "react-router-dom";

const CartPage = () => {
  const [cart, setCart] = useContext(CartContext);
  const [initLoading, setInitLoading] = useState(true);
  const [data, setData] = useState([]);
  const [list, setList] = useState([]);

  useEffect(() => {
    // Simulando carga inicial
    setInitLoading(true);

    // Simulando obtener datos del carrito
    fetchCartData().then((res) => {
      setInitLoading(false);
      setData(res);
      setList(res);
    });
  }, []);

  const fetchCartData = async () => {
    // Aquí podrías obtener los datos del carrito desde tu contexto u otra fuente
    // Por ejemplo, desde CartContext
    return cart;
  };

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

  const handleRemoveFromCart = (productId) => {
    // Elimina el producto del carrito
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };
  const handlePay = () => {
    // Aquí podrías implementar la lógica para pagar el pedido
    // Por ejemplo, enviar la información del pedido a un servidor para procesar el pago
    // En este ejemplo, solo mostraremos un mensaje de éxito
    message.success("¡Pedido pagado con éxito!");
    // También podrías limpiar el carrito después de pagar el pedido
    setCart([]);
  };

  return (
    <div className="flex flex-col justify-start items-center w-full h-screen py-10">
      <h1 className="text-center font-bold text-2xl mb-5">Carrito de Compras</h1>
      {cart.length ? (
        <div className="w-full">
          {cart.map((item) => (
            <div key={item.id} className="flex flex-col border border-gray-200 rounded-md p-5 mb-5">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-lg font-semibold">{item.title}</h1>
                  <p className="text-gray-500">{item.description}</p>
                  <p className="text-gray-600">Precio: {item.price} €/ud  Total: {(item.price * item.quantity).toFixed(2)} €</p>
                </div>
                <div className="flex items-center gap-3">
                  <Button type="default" size="small" onClick={() => handleDecrement(item.id)}>-</Button>
                  <span>{item.quantity}</span>
                  <Button type="default" size="small" onClick={() => handleIncrement(item.id)}>+</Button>
                  <Button danger size="small" onClick={() => handleRemoveFromCart(item.id)}>Eliminar</Button>
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
      {cart.length > 0 && (
        <Button type="default" className="mt-5" onClick={handlePay}>Pagar pedido</Button>
      )}
    </div>
  );
};

export default CartPage;
