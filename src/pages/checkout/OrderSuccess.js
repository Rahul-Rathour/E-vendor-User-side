import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import confetti from "canvas-confetti";
import tickAnimation from "../../assets/tick.json";

const OrderSuccess = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const { totalAmt, discountAmount, order_number, shippingAddress } = state || {};

  const handleGenerateInvoice = () => {
    navigate("/invoice", { state });
  };

  // Confetti Effect
  useEffect(() => {
    const duration = 2500;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 7,
        angle: 60,
        spread: 70,
        origin: { x: 0.1 },
      });
      confetti({
        particleCount: 7,
        angle: 120,
        spread: 70,
        origin: { x: 0.9 },
      });

      if (Date.now() < end) requestAnimationFrame(frame);
    };
    frame();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-orange-50 flex items-center justify-center px-4 py-12">
      <div className="max-w-lg w-full">
        {/* Success Card */}
        <div className="bg-white rounded-3xl shadow-xl p-8 text-center">
          
          {/* Animation */}
          <div className="flex justify-center -mt-6 mb-6">
            <div className="w-32 h-32">
              <Lottie animationData={tickAnimation} loop={false} />
            </div>
          </div>

          <h1 className="text-4xl font-bold text-green-600 mb-2">
            Order Confirmed!
          </h1>
          <p className="text-gray-600 text-lg">
            Thank you for shopping with us
          </p>

          {/* Order Details */}
          <div className="mt-8 bg-gray-50 rounded-2xl p-6 text-left">
            {order_number && (
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-600">Order Number</span>
                <span className="font-semibold text-gray-800">{order_number}</span>
              </div>
            )}

            {totalAmt && (
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-600">Total Amount</span>
                <span className="font-semibold text-gray-800">
                  ₹{totalAmt.toFixed(2)}
                </span>
              </div>
            )}

            {shippingAddress && (
              <div className="pt-3">
                <p className="text-gray-600 text-sm">Shipping Address</p>
                <p className="text-gray-800 text-sm mt-1 leading-relaxed">
                  {shippingAddress}
                </p>
              </div>
            )}
          </div>

          <div className="mt-10 space-y-4">
            <button
              onClick={handleGenerateInvoice}
              className="w-full bg-primeColor hover:bg-black text-white py-4 rounded-2xl font-semibold text-lg transition-all duration-300"
            >
              Download Invoice
            </button>

            <Link
              to="/"
              className="w-full block text-center border border-gray-300 hover:border-gray-400 py-4 rounded-2xl font-semibold text-lg transition-all"
            >
              Continue Shopping
            </Link>
          </div>

          <p className="text-center text-gray-500 text-sm mt-8">
            You will receive an email confirmation shortly
          </p>
        </div>

        {/* Trust Badges */}
        <div className="flex justify-center gap-6 mt-8 text-gray-400">
          <div className="flex items-center gap-1 text-xs">
            <span>🔒</span> Secure Payment
          </div>
          <div className="flex items-center gap-1 text-xs">
            <span>🚚</span> Fast Delivery
          </div>
          <div className="flex items-center gap-1 text-xs">
            <span>⭐</span> Quality Products
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;