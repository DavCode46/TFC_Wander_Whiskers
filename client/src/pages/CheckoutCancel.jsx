import React from "react";
import { Link } from "react-router-dom";
import useTheme from "@/context/ThemeContext";
const CheckoutCancel = () => {
  const {themeMode} = useTheme()
  return (
    <div className={`${themeMode === 'dark' ? '' : 'bg-gray-100 '} min-h-screen flex justify-center items-center`}>
      <div className={`${themeMode === 'dark' ? 'bg-dark-card' : 'bg-white'}  p-8 rounded shadow-lg`}>
        <h1 className={`${themeMode === 'dark' ? 'text-dark-primary' : 'text-color-btn'} text-3xl font-bold mb-4`}>Pago cancelado</h1>
        <p className={`${themeMode === 'dark' ? 'text-[#ccc]' : 'text-gray-700'} mb-4`}>
          El pago ha sido cancelado. Por favor, inténtalo de nuevo más tarde.
        </p>
        <Link
          to="/cart"
          className={`${themeMode === 'dark' ? 'bg-dark-primary hover:bg-a-7': 'bg-color-btn hover:bg-color-btnHover'}  text-white hover:text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-all duration-300`}
        >
          Volver a intentar
        </Link>
      </div>
    </div>
  );
};

export default CheckoutCancel;
