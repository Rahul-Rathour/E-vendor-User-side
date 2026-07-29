import React from "react";
import {
  FiShoppingBag,
  FiTag,
  FiShield,
  FiLock,
} from "react-icons/fi";
import { FaGooglePay } from "react-icons/fa";
import { toast } from "react-toastify";

const OrderSummary = ({
  cart,
  totalAmt,
  coupons,
  selectedCoupon,
  discountAmount,
  applyCoupon,
  removeCoupon,
  navigate,
}) => {

  const subtotal = cart.reduce(
    (sum, item) =>
      sum + item.product.price * item.quantity,
    0
  );

  const totalGST = cart.reduce((sum, item) => {
    const gst =
      (item.product.price *
        item.quantity *
        item.product.gst) /
      100;

    return sum + gst;
  }, 0);

  const finalTotal =
    totalAmt - (discountAmount || 0);

  return (
    <div
      className="
      bg-white
      rounded-2xl
      shadow-sm
      border
      border-gray-200
      p-7
      sticky
      top-32
    "
    >
      {/* Heading */}

      <div className="flex items-center gap-3 mb-8">
        <div
          className="
          w-12
          h-12
          rounded-full
          bg-yellow-100
          flex
          items-center
          justify-center
        "
        >
          <FiShoppingBag
            className="text-yellow-600"
            size={22}
          />
        </div>

        <h2 className="text-2xl font-bold">
          ORDER SUMMARY
        </h2>
      </div>

      {/* Price */}

      <div className="space-y-5 text-[15px]">

        <div className="flex justify-between">
          <span>
            Subtotal ({cart.length} Item
            {cart.length > 1 ? "s" : ""})
          </span>

          <span className="font-semibold">
            ₹{subtotal.toFixed(2)}
          </span>
        </div>

        <div className="flex justify-between">
          <span>GST</span>

          <span className="font-semibold">
            ₹{totalGST.toFixed(2)}
          </span>
        </div>

        <hr />

        <div className="flex justify-between font-semibold">
          <span>Total GST</span>

          <span className="text-yellow-600">
            ₹{totalGST.toFixed(2)}
          </span>
        </div>

      </div>

      {/* Coupon */}

      <div className="mt-8">

        <div className="flex items-center gap-2 mb-4">
          <FiTag className="text-yellow-600" />

          <h4 className="font-semibold">
            APPLY COUPON
          </h4>
        </div>

        <select
          className="
          w-full
          border
          rounded-lg
          p-3
          outline-none
        "
          onChange={(e) => {
            const coupon =
              coupons.find(
                (c) => c.id == e.target.value
              );

            applyCoupon(coupon);
          }}
        >
          <option value="">
            Select Coupon
          </option>

          {coupons.map((coupon) =>
            totalAmt >=
            Number(coupon.min_cart_amount) ? (
              <option
                key={coupon.id}
                value={coupon.id}
              >
                {coupon.code}
              </option>
            ) : null
          )}
        </select>

        {selectedCoupon && (
          <div className="mt-4">

            <div className="text-green-600 text-sm">
              Coupon Applied

              <strong>
                {" "}
                {selectedCoupon.code}
              </strong>
            </div>

            <div className="mt-2 flex justify-between">

              <span className="font-medium">
                Discount
              </span>

              <span className="text-green-600 font-semibold">
                -₹
                {Number(
                  discountAmount
                ).toFixed(2)}
              </span>

            </div>

            <button
              onClick={removeCoupon}
              className="
              mt-3
              text-red-500
              text-sm
            "
            >
              Remove Coupon
            </button>

          </div>
        )}

      </div>

      {/* Grand Total */}

      <div className="mt-8 border-t pt-6">

        <div className="flex justify-between items-center">

          <span className="text-lg font-bold">
            Grand Total
          </span>

          <span className="text-4xl font-bold text-yellow-600">
            ₹{finalTotal.toFixed(2)}
          </span>

        </div>

      </div>

      {/* Checkout */}

      <button
        onClick={() => {

          const token =
            localStorage.getItem("userToken");

          if (!token) {
            toast.error(
              "Please login first"
            );

            navigate("/login");

            return;
          }

          navigate("/checkout", {
            state: {
              totalAmt,
              finalTotal,
              cart,
              discountAmount,
              selectedCoupon,
            },
          });

        }}
        className="
        mt-8
        w-full
        h-14
        rounded-lg
        bg-[#D4AF37]
        hover:bg-yellow-600
        text-black
        font-bold
        text-lg
        transition
      "
      >
        <div className="flex items-center justify-center gap-3">
          <FiLock size={18} />
          PROCEED TO CHECKOUT
        </div>
      </button>

      {/* Divider */}

      <div className="flex items-center my-5">
        <div className="flex-1 border-b"></div>

        <span className="px-4 text-sm text-gray-400">
          OR
        </span>

        <div className="flex-1 border-b"></div>
      </div>

      {/* UPI */}

      <button
        className="
        w-full
        h-12
        rounded-lg
        border
        flex
        items-center
        justify-center
        gap-3
        hover:bg-gray-50
      "
      >
        <span>Checkout with</span>

        <FaGooglePay
          className="text-3xl"
        />
      </button>

      {/* Security */}

      <div className="mt-6 flex justify-center items-center gap-2 text-gray-600">

        <FiShield />

        <span className="text-sm">
          100% Secure Payments
        </span>

      </div>

    </div>
  );
};

export default OrderSummary;