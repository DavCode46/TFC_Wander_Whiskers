import React, { useContext } from "react";
import { servicesData } from "@/data/data";
import { Button } from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";
import { CartContext } from "@/context/CartContext";

const ServiceCard = () => {

  const [cart, setCart] = useContext(CartContext)

  const addToCart = (service) => {
    setCart((currentItems) => {
      const isItemInCart = currentItems.find((item) => item.id === service.id)
      if(isItemInCart) {
        return currentItems.map((item) => item.id === service.id ? {...item, quantity: item.quantity + 1} : item)
      } else {
        return [...currentItems, {...service, quantity: 1}]
        // return [...currentItems, {id, quantity: 1, price}]
      }
    })
  }

  const removeFromCart = (id) => {
    setCart((currentItems) => {
      // return currentItems.reduce((acc, item) => {
      //   if(item.id === id) {
      //     if(item.quantity === 1) return acc
      //     return [...acc, {...item, quantity: item.quantity - 1}]
      //   } else {
      //     return [...acc, item]
      //   }
      // }, [])

      if(currentItems.find((item) => item.id === id)?.quantity === 1) {
        return currentItems.filter((item) => item.id !== id)
      } else {
        return currentItems.map((item) => {
          if(item.id === id) {
            return {...item, quantity: item.quantity - 1}
          } else {
            return item
          }
        })
      }
    })
  }

  // const getQuantityByProduct = (id) => {
  //   return cart.find((item) => item.id === id)?.quantity || 0
  // }

  // getQuantityByProduct(id)

  return (
    <div className="flex flex-col lg:flex-row sm:ml-[2rem] items-center justify-center gap-[2rem] lg:ml-[3rem]">
      {servicesData.map((service) => (
        <div
          key={service.id}
          className="w-[12rem] max-lg:w-full min-h-[38rem] px-6 border border-n-6 rounded-[2rem] lg:w-auto py-8 my-4 [&>h4]:odd:text-color-btn  [&>h4]:even:text-[#FFC876] mb-[3rem]"
        >
          <h4 className="text-[2rem] mb-4">{service.title}</h4>

          <p className="min-h-[3rem] text-[1.2rem] mb-3 text-color-dark">
            {service.description}
          </p>

          <div className="flex items-center h-[5.5rem] mb-6">
            {service.price && (
              <div className="flex flex-col">
                <div
                  className={`${
                    service.title == "Anual" &&
                    "line-through text-[1.5rem] text-red-500 flex"
                  } text-[4rem] leading-none font-bold flex items-center`}
                >
                  {service.price}
                <div className="text-xl">€</div>
                </div>

                <div>
                  {service.discountPrice && (
                    <div
                      className={
                        "text-[4rem] leading-none font-bold flex items-center text-xl "
                      }
                    >
                      {service.discountPrice}
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
            onClick={() => addToCart(service)}
          >
            {service.price ? "Subscribirse" : "Solicitar información"}
          </Button>

          <ul>
            {service.features.map((feature, index) => (
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
