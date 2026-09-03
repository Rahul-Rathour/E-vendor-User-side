import React, { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import api from "../../api";
import { toast } from "react-toastify";

const RazorpayPayment = () => {

  const { state } = useLocation();
  const navigate = useNavigate();

  const { checkout } = useCart();

  const paymentStarted = useRef(false);

  const {
    totalAmt,
    discountAmount,
    shippingCharge,
    finalTotal,
    shippingAddress,
    cart,
    order_number,
    usergst,
    couponCode,
    phone,
    shippingDetails,
  } = state || {};


  useEffect(() => {

    if (!state) {
      navigate("/checkout");
      return;
    }

    // Prevent React StrictMode from opening Razorpay twice
    if (paymentStarted.current) {
      return;
    }

    paymentStarted.current = true;

    startPayment();

  }, []);


  const loadRazorpayScript = () => {

    return new Promise((resolve) => {

      if (window.Razorpay) {
        resolve(true);
        return;
      }

      const script = document.createElement("script");

      script.src =
        "https://checkout.razorpay.com/v1/checkout.js";

      script.onload = () => {
        resolve(true);
      };

      script.onerror = () => {
        resolve(false);
      };

      document.body.appendChild(script);

    });
  };


  const startPayment = async () => {

    try {

      // ============================
      // LOAD RAZORPAY
      // ============================

      const razorpayLoaded =
        await loadRazorpayScript();

      if (!razorpayLoaded) {

        toast.error(
          "Unable to load Razorpay. Please try again."
        );

        navigate("/paymentFailed");

        return;
      }


      // ============================
      // CREATE RAZORPAY ORDER
      // ============================

      const response = await api.post(
        "razorpay/create-order",
        {
          amount: Number(finalTotal),
          order_number: order_number,
        }
      );


      if (!response.data.status) {

        toast.error(
          response.data.message ||
          "Unable to create payment."
        );

        navigate("/paymentFailed");

        return;
      }


      const razorpayData = response.data.data;


      // ============================
      // RAZORPAY OPTIONS
      // ============================

      const options = {

        key: razorpayData.key,

        amount: razorpayData.amount_paise,

        currency: razorpayData.currency,

        name: "My Shop",

        description: `Order #${order_number}`,

        order_id:
          razorpayData.razorpay_order_id,


        // ============================
        // PAYMENT SUCCESS
        // ============================

        handler: async function (paymentResponse) {

          try {

            // ============================
            // VERIFY PAYMENT
            // ============================

            const verifyResponse =
              await api.post(
                "razorpay/verify-payment",
                {
                  razorpay_order_id:
                    paymentResponse.razorpay_order_id,

                  razorpay_payment_id:
                    paymentResponse.razorpay_payment_id,

                  razorpay_signature:
                    paymentResponse.razorpay_signature,
                }
              );


            if (!verifyResponse.data.status) {

              toast.error(
                verifyResponse.data.message ||
                "Payment verification failed."
              );

              navigate("/paymentFailed");

              return;
            }


            // ============================
            // PAYMENT VERIFIED
            // ============================
            //
            // Now create actual order
            // using existing checkout()
            //

            const success = await checkout(

              shippingAddress,

              "Online",

              order_number,

              totalAmt || finalTotal,

              discountAmount,

              couponCode,

              usergst,

              phone,

              shippingDetails

            );


            // ============================
            // ORDER CREATED
            // ============================

            if (success) {

              navigate("/orderSuccess", {

                state: {

                  totalAmt:
                    totalAmt || finalTotal,

                  discountAmount,

                  shippingCharge,

                  shippingAddress,

                  cart,

                  order_number,

                  usergst,

                },

              });

            } else {

              // Payment succeeded but
              // order creation failed

              navigate("/paymentFailed");

            }

          } catch (error) {

            console.error(
              "Payment verification error:",
              error
            );

            toast.error(
              error.response?.data?.message ||
              "Payment verification failed."
            );

            navigate("/paymentFailed");

          }

        },


        // ============================
        // PAYMENT CANCELLED
        // ============================

        modal: {

          ondismiss: function () {

            navigate("/payment-cancelled");

          },

        },


        // ============================
        // PREFILL
        // ============================

        prefill: {

          name: "User",

          email: "user@example.com",

          contact: phone || "",

        },


        // ============================
        // THEME
        // ============================

        theme: {

          color: "#f97316",

        },

      };


      // ============================
      // OPEN RAZORPAY
      // ============================

      const razorpay =
        new window.Razorpay(options);


      // ============================
      // PAYMENT FAILED
      // ============================

      razorpay.on(
        "payment.failed",
        function (response) {

          console.error(
            "Razorpay payment failed:",
            response
          );

          toast.error(
            response.error?.description ||
            "Payment failed."
          );

          navigate("/paymentFailed");

        }
      );


      razorpay.open();

    } catch (error) {

      console.error(
        "Razorpay initialization error:",
        error
      );

      toast.error(
        error.response?.data?.message ||
        "Unable to initialize payment."
      );

      navigate("/paymentFailed");

    }

  };


  return (

    <div className="min-h-screen flex items-center justify-center">

      <div className="text-center">

        <div className="w-10 h-10 border-4 border-orange-200 border-t-orange-600 rounded-full animate-spin mx-auto mb-4"></div>

        <p className="text-lg font-medium text-gray-700">
          Initializing Payment...
        </p>

        <p className="text-sm text-gray-500 mt-2">
          Please wait while we securely initialize your payment.
        </p>

      </div>

    </div>

  );

};

export default RazorpayPayment;
