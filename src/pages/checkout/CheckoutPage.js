import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../api";

import CheckoutHeader from "./CheckoutHeader";
import CheckoutOrderItem from "./CheckoutOrderItem";
import ShippingAddressCard from "./ShippingAddressCard";
import PaymentMethodCard from "./PaymentMethodCard";
import CheckoutFeatures from "./CheckoutFeatures";
import CheckoutOrderSummary from "./CheckoutOrderSummary";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const {
    cart = [],
    totalAmt = 0,
    finalTotal = 0,
    discountAmount = 0,
    selectedCoupon = null,
  } = location.state || {};

  const [shippingAddress, setShippingAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [usergst, setUsergst] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user) {
      toast.error("Please login first");
      navigate("/login");
    }
  }, [navigate, user]);

  const calculateGSTAmount = (item) => {
    const price = item.product.price * item.quantity;
    return (price * item.product.gst) / 100;
  };

  const totalGST = cart.reduce(
    (sum, item) => sum + calculateGSTAmount(item),
    0
  );

  const subtotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const shippingCharge = subtotal >= 999 ? 0 : 99;

  const grandTotal =
    subtotal +
    totalGST +
    shippingCharge -
    Number(discountAmount || 0);
  // ==========================================
  // PLACE ORDER
  // ==========================================

  const handleConfirmCheckout = async () => {
    if (!shippingAddress.trim()) {
      toast.error("Please enter your shipping address");
      return;
    }

    if (!user) {
      toast.error("Please login first");
      navigate("/login");
      return;
    }

    try {
      // ================= COD =================

      if (paymentMethod === "COD") {
        const payload = {
          user_id: user.id,
          shipping_address: shippingAddress,
          payment_method: "COD",
          gst_number: usergst,
          coupon_id: selectedCoupon?.id || null,
          discount_amount: Number(discountAmount || 0),
          total_amount: grandTotal,
        };

        const res = await api.post("/checkout", payload);

        if (res.data.status) {
          toast.success("Order placed successfully");

          // If you already have this function
          // keep it, otherwise remove this line
          // if (typeof sendOrderConfirmationEmail === "function") {
          //   await sendOrderConfirmationEmail();
          // }

          navigate("/order-success", {
            state: {
              order: res.data.data,
            },
          });
        } else {
          toast.error(res.data.message || "Checkout failed");
        }

        return;
      }

      // ================= ONLINE PAYMENT =================

      const orderRes = await api.post("/razorpay/order", {
        amount: grandTotal,
      });

      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY,

        amount: orderRes.data.amount,

        currency: orderRes.data.currency,

        name: "Your Store",

        description: "Order Payment",

        order_id: orderRes.data.id,

        handler: async function (response) {
          try {
            const verify = await api.post("/checkout", {
              user_id: user.id,
              shipping_address: shippingAddress,
              payment_method: "Online",
              gst_number: usergst,

              razorpay_order_id:
                response.razorpay_order_id,

              razorpay_payment_id:
                response.razorpay_payment_id,

              razorpay_signature:
                response.razorpay_signature,

              coupon_id: selectedCoupon?.id || null,

              discount_amount: Number(
                discountAmount || 0
              ),

              total_amount: grandTotal,
            });

            if (verify.data.status) {
              toast.success("Payment Successful");

              // if (
              //   typeof sendOrderConfirmationEmail ===
              //   "function"
              // ) {
              //   await sendOrderConfirmationEmail();
              // }

              navigate("/order-success", {
                state: {
                  order: verify.data.data,
                },
              });
            } else {
              toast.error(
                verify.data.message ||
                "Payment verification failed"
              );
            }
          } catch (err) {
            console.log(err);

            toast.error(
              "Payment verification failed."
            );
          }
        },

        prefill: {
          name: user?.name,

          email: user?.email,

          contact: user?.phone,
        },

        theme: {
          color: "#D4AF37",
        },
      };

      const razorpay = new window.Razorpay(options);

      razorpay.open();
    } catch (err) {
      console.log(err);

      toast.error("Checkout failed");
    }
  };
  return (
    <div className="bg-[#FAFAFA] min-h-screen">

      {/* Header */}

      <CheckoutHeader />

      <div className="max-w-[1400px] mx-auto px-4 pb-20">

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">

          {/* ===========================
                LEFT SECTION
          =========================== */}

          <div className="xl:col-span-8 space-y-8">

            {/* Order Items */}

            <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">

              <div className="px-8 py-6 border-b">

                <h2 className="text-2xl font-bold">
                  Order Items
                </h2>

              </div>

              <div className="divide-y">

                {cart.map((item) => (

                  <CheckoutOrderItem
                    key={item.id}
                    item={item}
                    calculateGSTAmount={calculateGSTAmount}
                  />

                ))}

              </div>

            </div>

            {/* Shipping Address */}

            <ShippingAddressCard
              shippingAddress={shippingAddress}
              setShippingAddress={setShippingAddress}
              usergst={usergst}
              setUsergst={setUsergst}
            />

            {/* Payment */}

            <PaymentMethodCard
              paymentMethod={paymentMethod}
              setPaymentMethod={setPaymentMethod}
            />

            {/* Features */}

            <CheckoutFeatures />

          </div>

          {/* ===========================
                RIGHT SIDEBAR
          =========================== */}

          <div className="xl:col-span-4">

            <div className="sticky top-8">

              <CheckoutOrderSummary
                cart={cart}
                subtotal={subtotal}
                totalGST={totalGST}
                shippingCharge={shippingCharge}
                totalAmt={totalAmt}
                grandTotal={grandTotal}
                discountAmount={discountAmount}
                selectedCoupon={selectedCoupon}
                handleConfirmCheckout={handleConfirmCheckout}
              />

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default CheckoutPage;