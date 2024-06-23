import React, { useContext, useEffect, useState } from "react";
import { Empty, Pagination } from "antd";
import { Link } from "react-router-dom";
import axios from "axios";
import { UserContext } from "@/context/UserContext";
import { v4 as uuidv4 } from "uuid";
import Xanimation from "@/components/Animations/Xanimation/Xanimation";
import FadeAnimation from "@/components/Animations/FadeAnimation/FadeAnimation";
import useTheme from "@context/ThemeContext";
import { format, addMonths, addYears } from "date-fns";

const OrdersPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const { themeMode } = useTheme();
  const { currentUser } = useContext(UserContext);
  const token = currentUser.token;

  useEffect(() => {
    const fetchOrders = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_REACT_APP_URL}/orders/user/${currentUser.id}`,
          {
            withCredentials: true,
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const ordersWithProductDetails = await Promise.all(
          response.data.map(async (order) => {
            const productDetailsPromises = order.products.map((productId) =>
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
            return { ...order, productDetails };
          })
        );
        setOrders(ordersWithProductDetails);
      } catch (err) {
        // console.log(err);
      }
      setIsLoading(false);
    };
    fetchOrders();
  }, [currentUser.id, token]);

  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  const onShowSizeChange = (current, size) => {
    setPageSize(size);
    setCurrentPage(1);
  };

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedOrders = orders.slice(startIndex, endIndex);

  return (
    <div className="flex flex-col justify-start items-center h-screen py-10 mt-10 w-[90%] md:w-full m-auto">
      <Xanimation>
        <h1
          className={`${
            themeMode === "dark" ? "text-white" : ""
          } text-center font-bold text-2xl mb-5`}
        >
          Tus pedidos
        </h1>
      </Xanimation>
      {paginatedOrders.length ? (
        <div className="w-full md:w-3/4 lg:w-2/3 mb-4">
          <FadeAnimation>
            {paginatedOrders.map((order) => (
              <div
                key={uuidv4()}
                className="flex flex-col border border-gray-200 rounded-md p-5 mb-5"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div>
                      <h1
                        className={`${
                          themeMode === "dark"
                            ? "text-dark-primary"
                            : "text-color-btn"
                        } text-lg font-semibold`}
                      >
                        {order.productDetails
                          .map((product) => product.name)
                          .join(", ")}
                      </h1>
                      <div className="flex flex-col">
                        <small
                          className={`${
                            themeMode === "dark"
                              ? "text-gray-200"
                              : "text-gray-500"
                          }`}
                        >
                          Fecha pedido:{" "}
                          {format(new Date(order.createdAt), "dd/MM/yyyy")}
                        </small>
                        <small
                          className={`${
                            themeMode === "dark"
                              ? "text-gray-200"
                              : "text-gray-500"
                          }`}
                        >
                          Fecha renovación:{" "}
                          {order.productDetails
                            .map((product) =>
                              product.name === "Mensual"
                                ? format(
                                    addMonths(new Date(order.createdAt), 1),
                                    "dd/MM/yyyy"
                                  )
                                : product.name === "Anual"
                                ? format(
                                    addYears(new Date(order.createdAt), 1),
                                    "dd/MM/yyyy"
                                  )
                                : "N/A"
                            )
                            .join(", ")}
                        </small>
                      </div>
                    </div>
                    <p
                      className={`${
                        themeMode === "dark" ? "text-gray-300" : "text-gray-500"
                      }`}
                    >
                      {order.productDetails
                        .map((product) => product.description)
                        .join(", ")}
                    </p>
                    <p
                      className={`${
                        themeMode === "dark" ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      Precio:{" "}
                      {order.productDetails.map((product, index) => (
                        
                        <span key={index}>
                          {product.discountPrice
                            ? `${product.discountPrice} €/ud`
                            : `${product.price} €/ud`}
                          {index !== order.productDetails.length - 1
                            ? ", "
                            : ""}
                        </span>
                      ))}{" "}
                      Total:{" "}
                      {order.productDetails
                        .reduce(
                          (total, product) =>
                            total +
                            (product.discountPrice
                              ? product.discountPrice
                              : product.price) *
                              product.quantity,
                          0
                        )
                        .toFixed(2)}{" "}
                      €
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </FadeAnimation>
        </div>
      ) : (
        <div className="flex items-center justify-center min-h-[50vh] lg:h-[70vh]">
          <FadeAnimation delay={0.5}>
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
                  <span
                    className={`${
                      themeMode === "dark" ? "text-[#ccc]" : ""
                    } mt-[3rem]`}
                  >
                    No se han encontrado{" "}
                    <span
                      className={`${
                        themeMode === "dark"
                          ? "text-dark-primary"
                          : "text-color-btn"
                      }`}
                    >
                      pedidos
                    </span>
                  </span>
                  <div className="mt-[3rem]">
                    {" "}
                    {/* Espaciado entre el texto y el botón */}
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
                </div>
              }
            />
          </FadeAnimation>
        </div>
      )}
      <Pagination
        className={`${themeMode === "dark" ? "dark" : ""}`}
        current={currentPage}
        onChange={onPageChange}
        onShowSizeChange={onShowSizeChange}
        total={orders.length}
        showSizeChanger
        pageSize={pageSize}
        pageSizeOptions={[1, 5, 10, 20, 30]}
        style={{ textAlign: "center", marginTop: "1rem" }}
        dropdownStyle={{
          backgroundColor: themeMode === "dark" ? "#001529" : "",
          color: themeMode === "dark" ? "white !important" : "",
        }}
      />
    </div>
  );
};

export default OrdersPage;