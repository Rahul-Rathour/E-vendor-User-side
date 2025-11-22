import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";

const CheckoutPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { checkout } = useCart();
  const [shippingAddress, setShippingAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("COD");

  if (!state) return <p className="text-center mt-10">No checkout data found.</p>;

  const { totalAmt, shippingCharge, cart } = state;
  const finalTotal = totalAmt + shippingCharge;

  const handleConfirmCheckout = async () => {
    if (!shippingAddress.trim()) {
      alert("Please enter your shipping address.");
      return;
    }

    // COD Flow
    if (paymentMethod === "COD") {
      const success = await checkout(shippingAddress, "COD");
      if (success) navigate("/orderSuccess");
      return;
    }

    // Razorpay Flow → redirect to razorpay page
    navigate("/razorpay", {
      state: {
        finalTotal,
        shippingAddress,
        paymentMethod: "Online",
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
        {cart.map((item) => (
          <div key={item.id} className="flex justify-between py-2">
            <p>{item.product.name} × {item.quantity}</p>
            <p>₹{(item.product.price * item.quantity).toLocaleString()}</p>
          </div>
        ))}
      </div>

      {/* Totals */}
      <div className="flex justify-between text-lg font-medium">
        <p>Subtotal:</p>
        <p>₹{totalAmt.toLocaleString()}</p>
      </div>
      <div className="flex justify-between text-lg font-medium">
        <p>Shipping:</p>
        <p>₹{shippingCharge}</p>
      </div>
      <div className="flex justify-between text-xl font-bold mt-4 text-primeColor">
        <p>Total:</p>
        <p>₹{finalTotal.toLocaleString()}</p>
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
