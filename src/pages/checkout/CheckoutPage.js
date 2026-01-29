import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { toast } from "react-toastify";

const CheckoutPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { checkout } = useCart();

  const [shippingAddress, setShippingAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("COD");

  if (!state)
    return <p className="text-center mt-10">No checkout data found.</p>;

  const { totalAmt, cart } = state;

  const calculateGSTAmount = (item) => {
    const price = item.product.price * item.quantity;
    return (price * item.product.gst) / 100;
  };

  const totalGST = cart.reduce(
    (sum, item) => sum + calculateGSTAmount(item),
    0
  );

  const finalTotal = totalAmt; // Already includes GST (from Cart page)

  const generateOrderNumber = () => {
    return "ORD-" + Math.random().toString(36).substring(2, 10).toUpperCase();
  };

  const order_number = generateOrderNumber();

  const handleConfirmCheckout = async () => {
    if (!shippingAddress.trim()) {
      toast.error("Please enter your shipping address.");
      return;
    }

    // COD
    if (paymentMethod === "COD") {
      const success = await checkout(
        shippingAddress,
        "COD",
        order_number
      );
      if (success)
        navigate("/orderSuccess", {
          state: {
            totalAmt: finalTotal,
            shippingAddress,
            cart,
            order_number,
          },
        });
      return;
    }

    // ONLINE
    navigate("/razorpay", {
      state: {
        finalTotal,
        totalAmt,
        cart,
        shippingAddress,
        paymentMethod: "Online",
        order_number,
      },
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white mt-10 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-center text-primeColor mb-6">
        Confirm Your Order
      </h2>

      {/* Order Items */}
      <div className="mb-6 border-b pb-4">
        {cart.map((item) => {
          const price = item.product.price * item.quantity;
          const gstAmount = calculateGSTAmount(item);

          return (
            <div key={item.id} className="py-3 border-b last:border-b-0">
              <div className="flex justify-between">
                <p>
                  {item.product.name} × {item.quantity}
                </p>
                <p>₹{price.toFixed(2)}</p>
              </div>

              {/* GST Row */}
              <p className="text-sm text-gray-600 flex justify-between mt-1">
                <span>GST ({item.product.gst}%)</span>
                <span>₹{gstAmount.toFixed(2)}</span>
              </p>
            </div>
          );
        })}
      </div>

      {/* Totals */}
      <div className="flex justify-between text-lg font-medium">
        <p>Total GST:</p>
        <p>₹{totalGST.toFixed(2)}</p>
      </div>

      <div className="flex justify-between text-xl font-bold mt-4 text-primeColor">
        <p>Grand Total:</p>
        <p>₹{finalTotal.toFixed(2)}</p>
      </div>

      {/* Shipping Address */}
      <div className="mt-6">
        <label className="block text-lg font-medium mb-2">
          Shipping Address
        </label>
        <textarea
          className="w-full border border-gray-300 rounded-md p-2 text-gray-700 focus:ring-2 focus:ring-primeColor outline-none"
          rows="3"
          placeholder="Enter your complete address..."
          value={shippingAddress}
          onChange={(e) => setShippingAddress(e.target.value)}
        />
      </div>

      {/* Payment Method */}
      <div className="mt-6">
        <p className="text-lg font-medium mb-2">Payment Method</p>

        <div className="flex flex-col gap-2">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="payment"
              value="COD"
              checked={paymentMethod === "COD"}
              onChange={() => setPaymentMethod("COD")}
            />
            Cash on Delivery (COD)
          </label>

          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="payment"
              value="Online"
              checked={paymentMethod === "Online"}
              onChange={() => setPaymentMethod("Online")}
            />
            Online Payment (Razorpay)
          </label>
        </div>
      </div>

      {/* Confirm Button */}
      <div className="flex justify-end mt-8">
        <button
          onClick={handleConfirmCheckout}
          className="bg-primeColor text-white px-6 py-2 rounded-md hover:bg-black duration-300"
        >
          Confirm & Checkout
        </button>
      </div>
    </div>
  );
};

export default CheckoutPage;
