import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";

const RazorpayPayment = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { checkout } = useCart();

  const { finalTotal, shippingAddress } = state || {};

  useEffect(() => {
    if (!state) return navigate("/checkout");

    const loadRazorpay = () => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = openPaymentModal;
      document.body.appendChild(script);
    };

    const openPaymentModal = () => {
      const options = {
        key: "rzp_test_RiOPHHMVoakNtd",
        amount: finalTotal * 100,
        currency: "INR",
        name: "My Shop",
        description: "Order Payment",
        handler: async function (response) {
          // After successful payment
          const success = await checkout(shippingAddress, "Online");

          if (success) {
            navigate("/orderSuccess");
          } else {
            navigate("/paymentFailed");
          }
        },
        prefill: {
          name: "User",
          email: "user@example.com",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    };

    loadRazorpay();
  }, []);

  return (
    <div className="text-center mt-20 text-lg font-medium">
      Initializing Payment...
    </div>
  );
};

export default RazorpayPayment;
