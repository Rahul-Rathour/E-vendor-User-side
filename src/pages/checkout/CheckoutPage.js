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
import { useCart } from "../../context/CartContext";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { checkout } = useCart();

  const {
    cart = [],
    totalAmt = 0,
    finalTotal = 0,
    discountAmount = 0,
    selectedCoupon = null,
  } = location.state || {};

  const [shippingAddress, setShippingAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const user = JSON.parse(localStorage.getItem("user"));
  const [phone, setPhone] = useState(user?.phone || "");
  const [shippingDetails, setShippingDetails] = useState({
    house: "",
    street: "",
    landmark: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [usergst, setUsergst] = useState(
    user?.identity_type === "gst"
      ? user?.identity_number || ""
      : ""
  );


  useEffect(() => {
    if (!user) {
      toast.error("Please login first");
      navigate("/login");
    }
  }, [navigate, user]);

  const calculateGSTAmount = (item) => {
    const price = item.product.wholesale_price * item.quantity;
    return (price * item.product.gst) / 100;
  };

  const totalGST = cart.reduce(
    (sum, item) => sum + calculateGSTAmount(item),
    0
  );

  const subtotal = cart.reduce(
    (sum, item) => sum + item.product.wholesale_price * item.quantity,
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

    // Generate Order Number
    const order_number =
      "ORD-" +
      Math.random().toString(36).substring(2, 10).toUpperCase();

    // Coupon
    const couponCode =
      selectedCoupon?.code || "N/A";

    // Discount
    const discount =
      Number(discountAmount || 0);

    // ===================================================
    // Create one address string from all address fields
    // ===================================================

    // If ShippingAddressCard already returns a formatted string,
    // then shippingAddress is already correct.

    const finalAddress = shippingAddress;

    // ===================================================
    // CASH ON DELIVERY
    // ===================================================

    if (paymentMethod === "COD") {

      const success = await checkout(
        finalAddress,
        "COD",
        order_number,
        grandTotal,
        discount,
        couponCode,
        usergst,
        phone,
        shippingDetails
      );

      if (success) {

        navigate("/orderSuccess", {
          state: {
            totalAmt: grandTotal,
            discountAmount: discount,
            shippingAddress: finalAddress,
            cart,
            order_number,
            usergst,
          },
        });

      }

      return;
    }

    // ===================================================
    // ONLINE PAYMENT
    // ===================================================

    navigate("/razorpay", {
      state: {
        totalAmt: grandTotal,
        finalTotal: grandTotal,
        discountAmount: discount,
        shippingCharge,
        cart,
        shippingAddress: finalAddress,
        paymentMethod: "Online",
        order_number,
        usergst,
        selectedCoupon,
      },
    });
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
              user={user}
              phone={phone}
              setPhone={setPhone}
              setShippingDetails={setShippingDetails}
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