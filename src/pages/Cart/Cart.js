import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useCart } from "../../context/CartContext";
import api from "../../api";

import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import { emptyCart } from "../../assets/images/index";
import { toast } from "react-toastify";

const Cart = () => {
  const navigate = useNavigate();
  const { cart, removeFromCart, updateQuantity } = useCart();

  const [totalAmt, setTotalAmt] = useState(0);
  const [coupons, setCoupons] = useState();
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [gstToggle, setGstToggle] = useState({});
  const finalTotal = totalAmt - discountAmount;

  const toggleGST = (id) => {
    setGstToggle((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  useEffect(() => {
    api.get("/coupons")
      .then((res) => {
        setCoupons(res.data);
      })
      .catch(() => toast.error("Failed to load coupons"));
  }, []);

  // Calculate total with GST included
  useEffect(() => {
    let total = 0;

    cart.forEach((item) => {
      const price = item.product.price * item.quantity;
      const gstAmount = (price * item.product.gst) / 100;
      total += price + gstAmount;
    });

    setTotalAmt(total);
  }, [cart]);

  const applyCoupon = (coupon) => {
    if (!coupon) return;

    if (totalAmt < parseFloat(coupon.min_cart_amount)) {
      toast.error(`Minimum cart amount ₹${coupon.min_cart_amount} required`);
      return;
    }

    let discount = 0;

    if (coupon.discount_type === "percentage") {
      discount = (totalAmt * coupon.discount_value) / 100;

      if (discount > coupon.max_discount) {
        discount = coupon.max_discount;
      }
    } else if (coupon.discount_type === "flat") {
      discount = coupon.discount_value;
    }

    setSelectedCoupon(coupon);
    setDiscountAmount(discount);

    toast.success(`Coupon "${coupon.code}" applied successfully!`);
  };

  const calculateGSTAmount = (item) => {
    const price = item.product.price * item.quantity;
    return (price * item.product.gst) / 100;
  };

  return (
    <div className="max-w-container mx-auto px-4 min-h-screen bg-gray-50">
      <Breadcrumbs title="Cart" />

      {cart.length > 0 ? (
        <div className="pb-20">
          {/* Table Header */}
          <div className="w-full h-20 bg-[#F5F7F7] text-primeColor hidden lgl:grid grid-cols-5 place-content-center px-6 text-lg font-titleFont font-semibold">
            <h2 className="col-span-2">Product</h2>
            <h2>Price</h2>
            <h2>Quantity</h2>
            <h2>Sub Total</h2>
          </div>

          {/* Cart Items */}
          <div className="mt-5 space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="grid grid-cols-1 lgl:grid-cols-5 items-center gap-4 bg-white p-4 shadow-sm rounded-md"
              >
                {/* Product Info */}
                <div className="flex items-center col-span-2">
                  <img
                    src={
                      item.product.image
                        ? `${process.env.REACT_APP_API_URL}/public/${item.product.image}`
                        : "/placeholder.jpg"
                    }
                    alt={item.product.name}
                    onClick={() => navigate(`/product/${item.product.id}`)}
                    className="w-20 h-20 object-cover rounded mr-4 cursor-pointer"
                  />
                  <div>
                    <h3 className="font-semibold text-lg">
                      {item.product.name}
                    </h3>
                    <p className="text-gray-500 text-sm">
                      <span className="text-gray-500">Size:</span> <span className="font-semibold p-1 bg-gray-100 rounded-lg">{item.size || "N/A"}</span>
                      <span className="text-gray-500">Color:</span> <span className="font-semibold p-1 rounded-lg"
                        style={{ color: item.color?.color_code || "#ccc" }}>{item.color?.color_name}</span>
                    </p>

                    {/* GST Toggle */}
                    <button
                      onClick={() => toggleGST(item.id)}
                      className="text-sm text-blue-600 flex items-center gap-1 mt-1"
                    >
                      {gstToggle[item.id] ? "▲ Hide GST" : "▼ Show GST"}
                    </button>

                    {/* GST Detail */}
                    {gstToggle[item.id] && (
                      <div className="mt-2 text-sm text-gray-700 bg-gray-50 p-2 rounded">
                        <p>GST: {item.product.gst}%</p>
                        <p>
                          GST Amount: ₹{calculateGSTAmount(item).toFixed(2)}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Price */}
                <p className="text-gray-700 text-base">
                  ₹{item.product.price}
                </p>

                {/* Quantity Controls */}
                <div className="flex items-center ">
                  <button
                    onClick={() =>
                      updateQuantity(item.id, Math.max(1, item.quantity - 1))
                    }
                    className="px-2 py-1 bg-gray-200 rounded-l"
                  >
                    -
                  </button>
                  <span className="px-3 bg-gray-100 text-sm">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="px-2 py-1 bg-gray-200 rounded-r"
                  >
                    +
                  </button>
                </div>

                {/* Subtotal */}
                <div className="flex flex-col items-start gap-2">
                  <p className="font-semibold">
                    ₹
                    {(
                      item.product.price * item.quantity +
                      calculateGSTAmount(item)
                    ).toFixed(2)}
                  </p>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:text-red-700 text-sm font-medium"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Totals Section */}
          <div className="max-w-7xl flex justify-end mt-10">
            <div className="w-96 flex flex-col gap-4 border rounded-md p-4 shadow-md bg-white">
              <h1 className="text-2xl font-semibold text-right text-primeColor">
                Cart Totals
              </h1>
              <div>
                <p className="flex items-center justify-between border-b py-1.5 text-lg px-2 font-medium">
                  Total GST
                  <span className="font-semibold">
                    ₹
                    {cart
                      .reduce(
                        (sum, item) => sum + calculateGSTAmount(item),
                        0
                      )
                      .toFixed(2)}
                  </span>
                </p>

                {/* Coupon Section */}
                <div className="mt-4">
                  <label className="font-semibold">Apply Coupon</label>
                  <select
                    className="w-full mt-1 p-2 border rounded"
                    onChange={(e) => {
                      const coupon = coupons?.find(c => c.id == e.target.value);
                      applyCoupon(coupon);
                    }}
                  >
                    <option value="">Select Coupon</option>

                    {coupons?.map((c) =>
                      totalAmt >= parseFloat(c.min_cart_amount) ? (
                        <option key={c.id} value={c.id}>
                          {c.code} — {c.discount_type === "percentage"
                            ? `${c.discount_value}% OFF`
                            : `Flat ₹${c.discount_value}`
                          }
                        </option>
                      ) : null
                    )}
                  </select>

                  {selectedCoupon && (
                    <p className="text-green-600 mt-2 text-sm">
                      Applied: <strong>{selectedCoupon.code}</strong> — Discount ₹{discountAmount.toFixed(2)}
                    </p>
                  )}
                </div>

                <p className="flex items-center justify-between py-1.5 text-lg px-2 font-bold text-primeColor">
                  Grand Total
                  <span className="font-bold tracking-wide text-lg font-titleFont">
                    ₹{(totalAmt - discountAmount).toFixed(2)}
                  </span>
                </p>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={() => {
                    const token = localStorage.getItem("userToken");

                    if (token) {
                      // User is logged in → go to checkout
                      navigate("/checkout", {
                        state: {
                          totalAmt, // original total
                          finalTotal: totalAmt - discountAmount,
                          cart,
                          discountAmount,
                          selectedCoupon
                        }
                      });
                    } else {
                      // User NOT logged in → show toast and redirect
                      toast.error("Please log in to proceed to checkout");
                      navigate("/login");
                    }
                  }}
                  className="w-52 h-10 bg-primeColor text-white hover:bg-black duration-300 rounded-md"
                >
                  Proceed to Checkout
                </button>
              </div>

            </div>
          </div>
        </div>
      ) : (
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col mdl:flex-row justify-center items-center gap-4 pb-20"
        >
          <div>
            <img
              className="w-80 rounded-lg p-4 mx-auto"
              src={emptyCart}
              alt="emptyCart"
            />
          </div>
          <div className="max-w-[500px] p-4 py-8 bg-white flex gap-4 flex-col items-center rounded-md shadow-lg">
            <h1 className="font-titleFont text-xl font-bold uppercase">
              Your Cart feels lonely.
            </h1>
            <p className="text-sm text-center px-10 -mt-2">
              Your Shopping cart lives to serve. Give it purpose — fill it with
              products and make it happy.
            </p>
            <Link to="/shop">
              <button className="bg-primeColor rounded-md cursor-pointer hover:bg-black active:bg-gray-900 px-8 py-2 font-titleFont font-semibold text-lg text-gray-200 hover:text-white duration-300">
                Continue Shopping
              </button>
            </Link>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Cart;
