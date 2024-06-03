import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "@/context/UserContext";
import { Empty } from "antd";
import { Link } from "react-router-dom";
import axios from "axios";
import useTheme from "@/context/ThemeContext";

const CheckoutSuccess = () => {
  const [order, setOrder] = useState(null);
  const [productDetails, setProductDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { currentUser, updateSubscriptionStatus } = useContext(UserContext);
  const { themeMode } = useTheme();

  useEffect(() => {
    const fetchLastOrder = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_REACT_APP_URL}/orders/user/${currentUser.id}`
        );

        // Obtener el primer pedido (el más reciente) de la respuesta
        const lastOrder = response.data.length ? response.data[0] : null;
        if (lastOrder) {
          setOrder(lastOrder);
          // Obtener detalles de los productos
          const productDetailsPromises = lastOrder.products.map(productId =>
            axios.get(`${import.meta.env.VITE_REACT_APP_URL}/products/${productId}`)
          );
          const productDetailsResponses = await Promise.all(productDetailsPromises);
          const productDetails = productDetailsResponses.map(res => res.data);
          setProductDetails(productDetails);
        }
        updateSubscriptionStatus(true);
      } catch (err) {
        console.log(err);
      }
      setIsLoading(false);
    };

    fetchLastOrder();
  }, [currentUser.id, updateSubscriptionStatus]);

  return (
    <div className="flex flex-col justify-start items-center h-screen py-10 mt-10 w-[90%] md:w-full m-auto">
      <h1 className={`${themeMode === 'dark' ? 'text-[#ccc]' : ''} text-center font-bold text-2xl mb-5`}>
        Detalles de su pedido
      </h1>
      {order ? (
        <div className="w-full md:w-3/4 lg:w-2/3">
          {productDetails.map((item, index) => (
            <div key={index} className="flex flex-col border border-gray-200 rounded-md p-5 mb-5">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className={`${themeMode === 'dark' ? 'text-dark-primary' : 'text-color-btn'} text-lg font-semibold`}>{item.name}</h1>
                  <p className={`${themeMode === 'dark' ? 'text-gray-200' : 'text-gray-500'}`}>{item.description}</p>
                  <p className={`${themeMode === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                    Precio: {item.price} €/ud 
                    {/* Si tienes la cantidad del producto puedes mostrarlo */}
                    {/* Total: {(item.price * item.quantity).toFixed(2)} € */}
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
                <span className={`${themeMode === 'dark' ? 'text-[#ccc]' : ''} mt-[3rem]`}>
                  No se ha encontrado{" "}
                  <span className={`${themeMode === 'dark' ? 'text-dark-primary' : 'text-color-btn'}`}>el pedido</span>
                </span>
                <div className="mt-[3rem]"></div>
              </div>
            }
          />
        </div>
      )}

      <Link
        className={`${
          themeMode === "dark"
            ? "bg-a-6 hover:bg-a-7"
            : "bg-color-btn hover:bg-color-btnHover"
        }  text-white px-3 py-2 rounded-md hover:text-white transition-all duration-300`}
        to="/"
      >
        Ir a inicio
      </Link>
    </div>
  );
};

export default CheckoutSuccess;
