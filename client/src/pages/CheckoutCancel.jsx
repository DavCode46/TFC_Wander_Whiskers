// src/components/CancelPage.js

import React from "react";
import { Link } from "react-router-dom";
import useTheme from "@/context/ThemeContext";
import FadeAnimation from "@/components/Animations/FadeAnimation/FadeAnimation";

const CancelPage = () => {
  const { themeMode } = useTheme();
  return (
    <div className="flex items-center justify-center min-h-screen">
      <FadeAnimation>
        <div
          className={`${
            themeMode === "dark" ? "bg-dark-card" : "bg-white"
          }  p-8 rounded-lg shadow-lg max-w-md text-center w-[90%] m-auto`}
        >
          <svg
            className="mx-auto mb-4 w-20 h-20 text-red-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
          <h1 className="text-3xl font-bold text-red-500 mb-4">
            Pago Cancelado
          </h1>
          <p
            className={`${
              themeMode === "dark" ? "text-[#ccc]" : "text-gray-600"
            } mb-6`}
          >
            Lo sentimos, el pago ha sido cancelado. Si esto fue un error, por
            favor intenta nuevamente.
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              to="/cart"
              className={`${
                themeMode === "dark"
                  ? "bg-dark-primary hover:bg-a-7"
                  : "bg-color-btn hover:bg-color-btnHover"
              } inline-block text-white hover:text-white py-2 px-4 rounded transition duration-300`}
            >
              Volver a intentarlo
            </Link>
           
          </div>
        </div>
      </FadeAnimation>
    </div>
  );
};

export default CancelPage;
