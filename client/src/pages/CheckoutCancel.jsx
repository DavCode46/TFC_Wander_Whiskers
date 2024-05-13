import React from "react";
import { Link } from "react-router-dom";

const CheckoutCancel = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="bg-white p-8 rounded shadow-lg">
        <h1 className="text-3xl font-bold mb-4">Pago cancelado</h1>
        <p className="text-gray-700 mb-4">
          El pago ha sido cancelado. Por favor, inténtalo de nuevo más tarde.
        </p>
        <Link
          to="/cart"
          className="bg-color-btn hover:bg-color-btnHover text-white hover:text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-all duration-300"
        >
          Volver a intentar
        </Link>
      </div>
    </div>
  );
};

export default CheckoutCancel;
