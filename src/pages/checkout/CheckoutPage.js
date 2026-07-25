import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { toast } from "react-toastify";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";

const CheckoutPage = () => {
  const { state } = useLocation(); 
  const navigate = useNavigate();
  const { checkout } = useCart();

  const [shippingAddress, setShippingAddress] = useState("");
  const [usergst, setUsergst] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("COD");

  if (!state) {
    return <p className="text-center mt-20 text-xl">No checkout data found.</p>;
  }

  const { totalAmt, finalTotal, cart, discountAmount, selectedCoupon } = state;

  const calculateGSTAmount = (item) => {
    const price = item.product.price * item.quantity;
    return (price * (item.product.gst || 0)) / 100;
  };

  const totalGST = cart.reduce((sum, item) => sum + calculateGSTAmount(item), 0);


  const generateOrderNumber = () => "ORD-" + Math.random().toString(36).substring(2, 10).toUpperCase();
  const order_number = generateOrderNumber();

  const handleConfirmCheckout = async () => {
    if (!shippingAddress.trim()) {
      toast.error("Please enter your shipping address");
      return;
    }

    if (paymentMethod === "COD") {
      const success = await checkout(
        shippingAddress,
        "COD",
        order_number,
        totalAmt,           // mrp 
        // finalTotal,        // send FINAL amount
        discountAmount,
        selectedCoupon?.code || "none",
        usergst
      );
      if (success) {
        navigate("/orderSuccess", {
          state: { totalAmt: finalTotal, discountAmount, totalAmt, shippingAddress, cart, order_number },
        });
      }
    } else {
      navigate("/razorpay", {
        state: { finalTotal, discountAmount, cart, shippingAddress, paymentMethod: "Online", order_number },
      });
    }
  };

  return (
    <div className="max-w-container mx-auto px-4 min-h-screen bg-gray-50">
      <Breadcrumbs title="Checkout" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-6">

        {/* ==================== ORDER SUMMARY ==================== */}
        <div className="lg:col-span-7">
          <div className="bg-white rounded-3xl shadow p-5 md:p-8">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">Order Summary</h2>

            <div className="space-y-6">
              {cart.map((item) => {
                const gstAmount = calculateGSTAmount(item);
                return (
                  <div
                    key={item.id}
                    className="flex flex-col sm:flex-row gap-4 border-b pb-6 last:border-b-0"
                  >
                    {/* Image */}
                    <img
                      src={`${process.env.REACT_APP_API_URL}/public/${item.product.image}`}
                      alt={item.product.name}
                      className="w-24 h-24 sm:w-28 sm:h-28 object-cover rounded-xl flex-shrink-0"
                    />

                    {/* Product Details */}
                    <div className="flex-1 min-w-0"> {/* min-w-0 prevents text overflow */}
                      <h3 className="font-semibold text-lg leading-tight break-words">
                        {item.product.name}
                      </h3>

                      {/* Color & Size - Responsive */}
                      <div className="flex flex-wrap items-center gap-x-5 gap-y-1 mt-2 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <span>Color:</span>
                          <div className="flex items-center gap-1.5">
                            <div
                              className="w-5 h-5 rounded-full border border-gray-300 shadow-sm"
                              style={{ backgroundColor: item.color?.color_code || "#ccc" }}
                            />
                            <span className="font-medium">{item.color?.color_name}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <span>Size:</span>
                          <span className="font-semibold px-3 py-0.5 bg-gray-100 rounded-lg">
                            {item.size}
                          </span>
                        </div>
                      </div>

                      <p className="text-gray-600 mt-2">
                        ₹{item.product.price} × {item.quantity}
                      </p>
                    </div>

                    {/* Price Section */}
                    <div className="text-right sm:text-right mt-2 sm:mt-0">
                      <p className="font-semibold text-lg">
                        ₹{(item.product.price * item.quantity).toFixed(2)}
                      </p>
                      {gstAmount > 0 && (
                        <p className="text-xs text-gray-500">
                          + GST ₹{gstAmount.toFixed(2)}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Totals */}
            <div className="mt-8 pt-6 border-t space-y-4">
              <div className="flex justify-between text-lg">
                <span className="text-gray-600">MRP+gst</span>
                <span>₹{(totalAmt).toFixed(2)}</span>
                {/* <span>₹{(finalTotal).toFixed(2)}</span> */}
              </div>
              <div className="flex justify-between text-lg">
                <span className="text-gray-600">Total GST</span>
                <span>₹{totalGST.toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between text-lg">
                <span className="text-gray-600">Coupon Discount</span>
                <span>₹{discountAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-lg">
                <span className="text-gray-600">Selected Coupon</span>
                <span>
                  {selectedCoupon ? selectedCoupon.code : "No Coupon Applied"}
                </span>
              </div>
              <div className="flex justify-between text-lg">
                <span className="text-gray-600">Total Amount</span>
                <span>₹{finalTotal.toFixed(2)}</span> 
              </div>
              <div className="flex justify-between text-2xl font-bold border-t pt-4 text-primeColor">
                <span>Grand Total</span>
                <span>₹{(finalTotal).toFixed(2)}</span>
                {/* <span>discount amount</span> */}
                {/* <span>{discountAmount}</span>  */}
              </div>
            </div>
          </div>
        </div>

        {/* ==================== SHIPPING & PAYMENT ==================== */}
        <div className="lg:col-span-5">
          <div className="bg-white rounded-3xl shadow p-6 md:p-8 sticky top-6">
            <h2 className="text-2xl font-semibold mb-6">Shipping & Payment</h2>

            <div className="mb-8">
              <label className="block text-gray-700 font-medium mb-2">
                Shipping Address <span className="text-red-500">*</span>
              </label>
              <textarea
                className="w-full border border-gray-300 rounded-2xl p-4 focus:ring-2 focus:ring-primeColor focus:border-transparent outline-none h-36 resize-y"
                placeholder="House No, Street, Area, City, State, Pincode..."
                value={shippingAddress}
                onChange={(e) => setShippingAddress(e.target.value)}
              />
            </div>
            <div className="mb-8">
              <label className="block text-gray-700 font-medium mb-2">
                GST No.
              </label>
              <input
                className="w-full border border-gray-300 rounded-2xl p-4 focus:ring-2 focus:ring-primeColor focus:border-transparent outline-none resize-y"
                placeholder="Your gst no..."
                value={usergst}
                onChange={(e) => setUsergst(e.target.value)}
              />
            </div>

            <div className="mb-8">
              <p className="text-gray-700 font-medium mb-3">Payment Method</p>
              <div className="space-y-3">
                <label className="flex items-center gap-3 border p-4 rounded-2xl cursor-pointer hover:bg-gray-50 transition-all">
                  <input
                    type="radio"
                    name="payment"
                    value="COD"
                    checked={paymentMethod === "COD"}
                    onChange={() => setPaymentMethod("COD")}
                    className="w-5 h-5 accent-primeColor"
                  />
                  <div>
                    <p className="font-medium">Cash on Delivery (COD)</p>
                    <p className="text-sm text-gray-500">Pay when product is delivered</p>
                  </div>
                </label>

                <label className="flex items-center gap-3 border p-4 rounded-2xl cursor-pointer hover:bg-gray-50 transition-all">
                  <input
                    type="radio"
                    name="payment"
                    value="Online"
                    checked={paymentMethod === "Online"}
                    onChange={() => setPaymentMethod("Online")}
                    className="w-5 h-5 accent-primeColor"
                  />
                  <div>
                    <p className="font-medium">Online Payment (Razorpay)</p>
                    <p className="text-sm text-gray-500">Secure payment gateway</p>
                  </div>
                </label>
              </div>
            </div>

            <button
              onClick={handleConfirmCheckout}
              className="w-full bg-primeColor hover:bg-black text-white py-4 rounded-2xl text-lg font-semibold transition-all duration-300"
            >
              Confirm & Place Order
            </button>

            <p className="text-center text-xs text-gray-500 mt-5">
              You can review this order before it is shipped
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;