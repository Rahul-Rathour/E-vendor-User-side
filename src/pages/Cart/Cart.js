import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import api from "../../api";
import { toast } from "react-toastify";

// New Components
import CartHeader from "./components/CartHeader";
import ShippingProgress from "./components/ShippingProgress";
import OrderSummaryCard from "./components/OrderSummaryCard";
import RecommendedProducts from "./components/RecommendedProducts";
import FeaturesStrip from "./components/FeaturesStrip";
import CouponDrawer from "./components/CouponDrawer";
import CartEmptyState from "./components/CartEmptyState";
import CartItemCard from "./components/CartItemCard";

const Cart = () => {
  const navigate = useNavigate();
  const { cart, removeFromCart, updateQuantity } = useCart();

  const [totalAmt, setTotalAmt] = useState(0);
  const [coupons, setCoupons] = useState([]);
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [gstToggle, setGstToggle] = useState({});
  const [couponDrawerOpen, setCouponDrawerOpen] = useState(false);

  const toggleGST = (id) => {
    setGstToggle((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Load coupons
  useEffect(() => {
    api.get("/coupons")
      .then((res) => {
        setCoupons(res.data);
      })
      .catch(() => toast.error("Failed to load coupons"));
  }, []);

  // Calculate total with GST
  useEffect(() => {
    let total = 0;
    cart.forEach((item) => {
      const price = item.product.price * item.quantity;
      const gstAmount = (price * item.product.gst) / 100;
      total += price + gstAmount;
    });
    setTotalAmt(total);
  }, [cart]);

  // Recalculate discount whenever totalAmt or selectedCoupon changes
  useEffect(() => {
    if (!selectedCoupon) {
      setDiscountAmount(0);
      return;
    }

    const minAmount = parseFloat(selectedCoupon.min_cart_amount || 0);

    if (totalAmt < minAmount) {
      setDiscountAmount(0);
      setSelectedCoupon(null);
      toast.error(`Coupon removed. Minimum cart amount ₹${minAmount} required.`);
      return;
    }

    let discount = 0;
    const discountValue = parseFloat(selectedCoupon.discount_value);
    const maxDiscount = parseFloat(selectedCoupon.max_discount || 0);

    if (selectedCoupon.discount_type === "percentage") {
      discount = (totalAmt * discountValue) / 100;
      if (maxDiscount > 0 && discount > maxDiscount) {
        discount = maxDiscount;
      }
    } else if (selectedCoupon.discount_type === "flat") {
      discount = discountValue;
    }

    setDiscountAmount(discount);
  }, [totalAmt, selectedCoupon]);

  const applyCoupon = (coupon) => {
    if (!coupon) return;

    const minAmount = parseFloat(coupon.min_cart_amount || 0);

    if (totalAmt < minAmount) {
      toast.error(`Minimum cart amount ₹${minAmount} required`);
      return;
    }

    setSelectedCoupon(coupon);
    toast.success(`Coupon "${coupon.code}" applied successfully!`);
  };

  const removeCoupon = () => {
    setSelectedCoupon(null);
    setDiscountAmount(0);
    toast.info("Coupon removed");
  };

  const calculateGSTAmount = (item) => {
    const price = item.product.price * item.quantity;
    return (price * item.product.gst) / 100;
  };

  return (
    <>
      {cart.length > 0 ? (
        <div className="bg-[#fafafa] min-h-screen">

          <CartHeader />

          <div className="max-w-[1450px] mx-auto px-4 pb-20">

            <ShippingProgress totalAmount={totalAmt} />

            <div className="grid lg:grid-cols-12 gap-10 mt-10">

              {/* LEFT */}

              <div className="lg:col-span-8">

                <div className="space-y-6">

                  {cart.map((item) => (

                    <CartItemCard
                      key={item.id}
                      item={item}
                      gstToggle={gstToggle}
                      toggleGST={toggleGST}
                      calculateGSTAmount={calculateGSTAmount}
                      updateQuantity={updateQuantity}
                      removeFromCart={removeFromCart}
                      navigate={navigate}
                    />

                  ))}

                </div>

              </div>

              {/* RIGHT */}

              <div className="lg:col-span-4">

                <div className="sticky top-28 space-y-5">

                  {/* Coupon Card */}

                  <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">

                    <div className="px-6 py-5 border-b">

                      <h2 className="text-xl font-bold">
                        Available Offers
                      </h2>

                    </div>

                    <div className="p-6">

                      {selectedCoupon ? (

                        <div className="rounded-xl bg-green-50 border border-green-200 p-5">

                          <p className="font-bold text-green-700 text-lg">
                            {selectedCoupon.code}
                          </p>

                          <p className="mt-2 text-sm text-gray-600">

                            Discount Applied

                          </p>

                          <h3 className="text-2xl font-bold text-green-700 mt-2">

                            ₹{discountAmount.toFixed(2)}

                          </h3>

                          <button
                            onClick={removeCoupon}
                            className="mt-5 text-red-500 font-medium"
                          >
                            Remove Coupon
                          </button>

                        </div>

                      ) : (

                        <div>

                          <p className="text-gray-500 leading-7">

                            Apply available coupons and save more on your purchase.

                          </p>

                          <button
                            onClick={() => setCouponDrawerOpen(true)}
                            className="w-full mt-5 h-12 rounded-xl bg-[#D4AF37] font-semibold"
                          >
                            Browse Coupons
                          </button>

                        </div>

                      )}

                    </div>

                  </div>

                  <OrderSummaryCard
                    cart={cart}
                    totalAmt={totalAmt}
                    discountAmount={discountAmount}
                    selectedCoupon={selectedCoupon}
                    navigate={navigate}
                  />

                </div>

              </div>

            </div>

            <RecommendedProducts />

            <FeaturesStrip />

          </div>

          <CouponDrawer
            open={couponDrawerOpen}
            onClose={() => setCouponDrawerOpen(false)}
            coupons={coupons}
            selectedCoupon={selectedCoupon}
            applyCoupon={applyCoupon}
            removeCoupon={removeCoupon}
            totalAmt={totalAmt}
          />

        </div>
      ) : ( 
        <CartEmptyState />
      )}
    </>
  );
};

export default Cart;