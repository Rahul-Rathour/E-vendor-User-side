import React from "react";
import { useNavigate } from "react-router-dom";

const PaymentCancelled = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-red-50 to-red-100 px-4">
      <div className="bg-white/80 backdrop-blur-lg shadow-xl rounded-2xl p-8 md:p-12 max-w-md w-full text-center border border-red-200">

        {/* Animated Sad Emoji */}
        <div className="text-7xl md:text-8xl animate-bounce">😢</div>

        {/* Title */}
        <h2 className="mt-6 text-2xl md:text-3xl font-extrabold text-red-600">
          Payment Cancelled
        </h2>

        {/* Subtext */}
        <p className="mt-3 text-gray-700 text-md md:text-lg leading-relaxed">
          You closed the payment window before completing the transaction.
          <br />
          Please try again to continue with your purchase.
        </p>

        {/* CTA Button */}
        <button
          onClick={() => navigate("/cart")}
          className="mt-6 w-full py-3 bg-red-500 text-white font-semibold text-lg rounded-lg shadow-md hover:bg-red-600 transition transform hover:-translate-y-0.5"
        >
          Try Again
        </button>

        {/* Go Back Link */}
        <button
          onClick={() => navigate("/")}
          className="mt-3 text-red-500 hover:text-red-600 text-sm md:text-base font-medium underline"
        >
          Return to Home
        </button>
      </div>
    </div>
  );
};

export default PaymentCancelled;
