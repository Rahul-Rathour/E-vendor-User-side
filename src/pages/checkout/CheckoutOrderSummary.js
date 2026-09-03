import React from "react";
import {
  FiShield,
  FiTruck,
  FiCheckCircle,
  FiTag,
  FiLock,
} from "react-icons/fi";

const CheckoutOrderSummary = ({
  cart,
  totalAmt,
  totalGST,
  discountAmount,
  selectedCoupon, 
  finalTotal,
  grandTotal,
  handleConfirmCheckout,
}) => {
  const subtotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const shipping = 0;

  return (
    <div
      className="
        bg-white
        rounded-2xl
        border
        border-[#ECECEC]
        shadow-sm
        sticky
        top-6
        overflow-hidden
      "
    >
      {/* Header */}

      <div className="px-6 py-5 border-b">

        <h2 className="text-2xl font-bold text-[#111]">
          Order Summary
        </h2>

        <p className="text-sm text-gray-500 mt-1">
          Review your order before placing it.
        </p>

      </div>

      {/* Body */}

      <div className="p-6">

        {/* Price Details */}

        <div className="space-y-5">

          <div className="flex justify-between">

            <span className="text-gray-500">
              Items ({cart.length})
            </span>

            <span className="font-semibold">
              ₹{subtotal.toFixed(2)}
            </span>

          </div>

          <div className="flex justify-between">

            <span className="text-gray-500">
              GST
            </span>

            <span className="font-semibold">
              ₹{Number(totalGST).toFixed(2)}
            </span>

          </div>

          <div className="flex justify-between">

            <span className="text-gray-500">
              Shipping
            </span>

            {shipping === 0 ? (
              <span className="text-green-600 font-semibold">
                FREE
              </span>
            ) : (
              <span className="font-semibold">
                ₹{shipping}
              </span>
            )}

          </div>

          {selectedCoupon && (

            <div className="flex justify-between">

              <div>

                <p className="text-green-600 font-medium flex items-center gap-2">
                  <FiTag />
                  Coupon
                </p>

                <p className="text-xs text-gray-500 mt-1">
                  {selectedCoupon.code}
                </p>

              </div>

              <span className="text-green-600 font-bold">
                -₹{Number(discountAmount).toFixed(2)}
              </span>

            </div>

          )}

        </div>

        {/* Divider */}

        <div className="border-t my-6"></div>

        {/* Grand Total */}

        <div className="flex justify-between items-center">

          <div>

            <p className="text-gray-500">
              Grand Total
            </p>

            <p className="text-xs text-gray-400 mt-1">
              Including GST
            </p>

          </div>

          <h2 className="text-3xl font-bold text-[#D4AF37]">
            ₹{Number(grandTotal).toFixed(2)}
          </h2>

        </div>

        {/* Free Shipping */}

        {shipping > 0 && (

          <div
            className="
              mt-6
              bg-[#FFF9EA]
              border
              border-[#F1DE9C]
              rounded-xl
              p-4
            "
          >

            <div className="flex gap-3">

              <FiTruck
                className="text-[#D4AF37] mt-1"
              />

              <div>

                <p className="font-medium">
                  Free Shipping Offer
                </p>

                <p className="text-sm text-gray-600 mt-1">

                  Add
                  <strong>
                    {" "}
                    ₹{(999 - subtotal).toFixed(2)}
                  </strong>

                  {" "}more to unlock FREE delivery.

                </p>

              </div>

            </div>

          </div>

        )}

        {/* Security */}

        <div className="mt-6 space-y-4">

          <div className="flex gap-3">

            <FiShield
              className="text-[#D4AF37] mt-1"
              size={18}
            />

            <div>

              <h4 className="font-semibold">
                Secure Checkout
              </h4>

              <p className="text-sm text-gray-500">
                SSL encrypted payment.
              </p>

            </div>

          </div>

          <div className="flex gap-3">

            <FiLock
              className="text-[#D4AF37] mt-1"
              size={18}
            />

            <div>

              <h4 className="font-semibold">
                Safe Transactions
              </h4>

              <p className="text-sm text-gray-500">
                We never store your payment details.
              </p>

            </div>

          </div>

          <div className="flex gap-3">

            <FiCheckCircle
              className="text-[#D4AF37] mt-1"
              size={18}
            />

            <div>

              <h4 className="font-semibold">
                Trusted Delivery
              </h4>

              <p className="text-sm text-gray-500">
                Estimated delivery in 5–7 business days.
              </p>

            </div>

          </div>

        </div>

        {/* Button */}

        <button
          onClick={handleConfirmCheckout}
          className="
            mt-8
            w-full
            h-14
            rounded-xl
            bg-[#D4AF37]
            hover:bg-[#C89D22]
            transition-all
            duration-300
            text-black
            font-bold
            text-lg
          "
        >
          Confirm & Place Order
        </button>

        <p className="text-center text-xs text-gray-400 mt-4 leading-5">
          By placing this order, you agree to our Terms &
          Conditions and Privacy Policy.
        </p>

      </div>
    </div>
  );
};

export default CheckoutOrderSummary;