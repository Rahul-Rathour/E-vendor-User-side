import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import confetti from "canvas-confetti";
import tickAnimation from "../../assets/tick.json"; // <-- your tick file

const OrderSuccess = () => {

  // Fire confetti one time
  useEffect(() => {
    const duration = 1.5 * 1000;
    const end = Date.now() + duration;

    (function frame() {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-50 px-4">

  {/* CARD */}
  <div className="bg-white shadow-lg rounded-2xl p-6 sm:p-10 text-center w-full max-w-sm sm:max-w-md">

    {/* SUCCESS TEXT */}
    <h2 className="text-2xl sm:text-3xl font-semibold text-green-600 mb-3">
      Order Placed Successfully!
    </h2>

    <p className="text-gray-600 mb-6 text-sm sm:text-base leading-relaxed">
      Thank you for your purchase. Your order is confirmed and being processed.
    </p>

    <Link
      to="/"
      className="bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-md text-sm sm:text-base transition"
    >
      Continue Shopping
    </Link>
  </div>
</div>

  );
};

export default OrderSuccess;
