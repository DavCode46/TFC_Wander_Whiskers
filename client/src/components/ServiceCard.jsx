import React, { useContext, useEffect, useState, useId } from "react";
// import { servicesData } from "@/data/data";
import { Button } from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";
import { CartContext } from "@/context/CartContext";
import axios from "axios";
import { UserContext } from "@/context/userContext";

const ServiceCard = () => {
  const [cart, setCart] = useContext(CartContext);
  const [loading, setLoading] = useState('')
  const { currentUser } = useContext(UserContext);
  const [products, setProducts] = useState([])
  const id = useId()

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
  })

  const addToCart = async (service) => {
    try {
      const { _id, name, price, description } = service; // Extraer los campos necesarios del servicio
      const data = {
        productId: _id,
        name,
        description,
        price,
        // quantity: 1, // Por defecto, agregamos una cantidad de 1 al carrito
      };
      console.log('data', data)
      const res = await axios.post(
        `${import.meta.env.VITE_REACT_APP_URL}/users/cart/add-product/${currentUser.id}`,
        data
      );
      console.log("add to cart res", res);
    } catch (err) {
      console.log(err);
    }
  };



  return (
    <div className="flex flex-col lg:flex-row sm:ml-[2rem] items-center justify-center gap-[2rem] lg:ml-[3rem]">
      {products.map((product) => (
        <div
          key={product._id}
          className="w-[12rem] max-lg:w-full min-h-[38rem] px-6 border border-n-6 rounded-[2rem] lg:w-auto py-8 my-4 [&>h4]:odd:text-color-btn  [&>h4]:even:text-[#FFC876] mb-[3rem]"
        >
          <h4 className="text-[2rem] mb-4">{product.name}</h4>

          <p className="min-h-[3rem] text-[1.2rem] mb-3 text-color-dark">
            {product.description}
          </p>

          <div className="flex items-center h-[5.5rem] mb-6">
            {product.price && (
              <div className="flex flex-col">
                <div
                  className={`${
                    product.name == "Anual" &&
                    "line-through text-[1rem] text-red-500 flex"
                  } text-[4rem] leading-none font-bold flex items-center`}
                >
                  {product.price}
                  <div className="text-xl">€</div>
                </div>

                <div>
                  {product.discountPrice && (
                    <div
                      className={
                        "text-[4rem] leading-none font-bold flex items-center"
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
            className="w-full mb-6"
            // href={!service.price && "mailto:davidblanco1993@gmail.com"}
            // white={!!service.price}
            onClick={() => addToCart(product)}
          >
            {product.price ? "Subscribirse" : "Solicitar información"}
          </Button>

          <ul>
            {product.features.map((feature, index) => (
              <li
                key={index}
                className="flex items-start py-5 border-t border-n-6"
              >
                <CheckCircleOutlined />
                <p className="body-2 ml-4">{feature}</p>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default ServiceCard;
