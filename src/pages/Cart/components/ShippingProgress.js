import React from "react";
import { FiTruck } from "react-icons/fi";

const FREE_SHIPPING_AMOUNT = 499;

const ShippingProgress = ({ totalAmount = 0 }) => {
  const remaining = Math.max(FREE_SHIPPING_AMOUNT - totalAmount, 0);

  const progress = Math.min(
    (totalAmount / FREE_SHIPPING_AMOUNT) * 100,
    100
  );

  return (
    <div className="w-full bg-white border border-[#EFE8DA] rounded-2xl shadow-sm px-6 py-5">

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

        {/* Left */}

        <div className="flex items-center gap-3 w-full">

          <div className="w-10 h-10 rounded-full bg-[#FFF7E8] flex items-center justify-center flex-shrink-0">
            <FiTruck className="text-[#D4AF37] text-xl" />
          </div>

          <div className="flex-1">

            {remaining > 0 ? (
              <p className="text-[15px] text-[#333] font-medium">
                You're{" "}
                <span className="text-[#D4AF37] font-bold">
                  ₹{remaining.toFixed(0)}
                </span>{" "}
                away from{" "}
                <span className="font-bold">
                  FREE Shipping!
                </span>
              </p>
            ) : (
              <p className="text-[15px] font-semibold text-green-600">
                🎉 Congratulations! You unlocked FREE Shipping.
              </p>
            )}

            {/* Progress */}

            <div className="mt-4 h-[10px] bg-[#F4EFE4] rounded-full overflow-hidden">

              <div
                className="h-full rounded-full bg-gradient-to-r from-[#D4AF37] to-[#E8C256] transition-all duration-700"
                style={{
                  width: `${progress}%`,
                }}
              />

            </div>

          </div>

        </div>

        {/* Right */}

        <div className="text-[15px] font-semibold whitespace-nowrap text-[#222]">

          ₹{Number(totalAmount).toFixed(0)}
          <span className="text-gray-400 font-normal">
            {" "}
            / ₹{FREE_SHIPPING_AMOUNT}
          </span>

        </div>

      </div>

    </div>
  );
};

export default ShippingProgress;