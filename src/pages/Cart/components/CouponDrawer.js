import React from "react";
import { FiX, FiTag, FiCheck } from "react-icons/fi";

const CouponDrawer = ({
  open,
  onClose,
  coupons,
  selectedCoupon,
  applyCoupon,
  removeCoupon,
  totalAmt,
}) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-black/50 flex justify-end">

      {/* Drawer */}

      <div
        className="
          w-full
          sm:w-[420px]
          h-full
          bg-white
          shadow-2xl
          overflow-y-auto
        "
      >
        {/* Header */}

        <div className="flex items-center justify-between px-6 py-5 border-b">

          <h2 className="text-xl font-bold">
            Available Coupons
          </h2>

          <button onClick={onClose}>
            <FiX size={24} />
          </button>

        </div>

        {/* Coupon List */}

        <div className="p-5 space-y-4">

          {coupons.length === 0 && (
            <div className="text-center text-gray-500 py-10">
              No coupons available
            </div>
          )}

          {coupons.map((coupon) => {

            const eligible =
              totalAmt >= Number(coupon.min_cart_amount);

            return (

              <div
                key={coupon.id}
                className={`
                  rounded-xl
                  border
                  p-5
                  transition
                  ${
                    eligible
                      ? "border-[#D4AF37]"
                      : "border-gray-300 opacity-60"
                  }
                `}
              >
                {/* Top */}

                <div className="flex justify-between items-start">

                  <div>

                    <div className="flex items-center gap-2">

                      <FiTag className="text-[#D4AF37]" />

                      <h3 className="font-bold text-lg">
                        {coupon.code}
                      </h3>

                    </div>

                    <p className="text-gray-600 mt-2">

                      {coupon.discount_type === "percentage"
                        ? `${coupon.discount_value}% OFF`
                        : `Flat ₹${coupon.discount_value} OFF`}

                    </p>

                  </div>

                  {selectedCoupon?.id === coupon.id && (

                    <div
                      className="
                        w-8
                        h-8
                        rounded-full
                        bg-green-500
                        text-white
                        flex
                        items-center
                        justify-center
                      "
                    >
                      <FiCheck />
                    </div>

                  )}

                </div>

                {/* Details */}

                <div className="mt-4 text-sm text-gray-500 space-y-1">

                  <p>
                    Minimum Cart :
                    <strong>
                      {" "}
                      ₹{coupon.min_cart_amount}
                    </strong>
                  </p>

                  {coupon.max_discount && (

                    <p>
                      Maximum Discount :
                      <strong>
                        {" "}
                        ₹{coupon.max_discount}
                      </strong>
                    </p>

                  )}

                </div>

                {/* Button */}

                <div className="mt-5">

                  {selectedCoupon?.id === coupon.id ? (

                    <button
                      onClick={removeCoupon}
                      className="
                        w-full
                        py-3
                        rounded-lg
                        bg-red-500
                        text-white
                        font-semibold
                      "
                    >
                      Remove Coupon
                    </button>

                  ) : (

                    <button
                      disabled={!eligible}
                      onClick={() => {
                        applyCoupon(coupon);
                        onClose();
                      }}
                      className={`
                        w-full
                        py-3
                        rounded-lg
                        font-semibold
                        transition
                        ${
                          eligible
                            ? "bg-[#D4AF37] text-black hover:bg-[#c59d28]"
                            : "bg-gray-300 text-gray-500 cursor-not-allowed"
                        }
                      `}
                    >
                      {eligible
                        ? "Apply Coupon"
                        : `Shop ₹${coupon.min_cart_amount} to unlock`}
                    </button>

                  )}

                </div>

              </div>

            );

          })}

        </div>

      </div>

    </div>
  );
};

export default CouponDrawer;