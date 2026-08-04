import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FiArrowLeft,
  FiShield,
  FiLock,
} from "react-icons/fi";

const CheckoutHeader = () => {
  const navigate = useNavigate();

  return (
    <section className="w-full pt-10 pb-8">
      <div className="max-w-[1400px] mx-auto px-4">

        {/* Top */}

        <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-6">

          {/* Left */}

          <div>

            <h1 className="text-[42px] font-bold text-[#111111] uppercase tracking-tight">
              Checkout
            </h1>

            <div className="flex items-center gap-3 mt-3 text-[15px] text-gray-500">

              <Link
                to="/"
                className="hover:text-[#D4AF37] transition"
              >
                Home
              </Link>

              <span>›</span>

              <Link
                to="/cart"
                className="hover:text-[#D4AF37] transition"
              >
                Cart
              </Link>

              <span>›</span>

              <span className="text-[#111111]">
                Checkout
              </span>

            </div>

          </div>

          {/* Right */}

          <div className="flex flex-wrap gap-4">

            <button
              onClick={() => navigate("/cart")}
              className="
                h-[52px]
                px-7
                rounded-lg
                border
                border-[#D4AF37]
                bg-white
                text-[#B98B10]
                font-semibold
                flex
                items-center
                gap-3
                hover:bg-[#D4AF37]
                hover:text-white
                transition-all
                duration-300
              "
            >
              <FiArrowLeft size={20} />
              Back to Cart
            </button>

          </div>

        </div>

        {/* Bottom Information */}

        <div
          className="
            mt-8
            bg-white
            rounded-2xl
            border
            border-[#EFE8DA]
            shadow-sm
            px-6
            py-5
          "
        >

          <div className="grid md:grid-cols-2 gap-6">

            {/* Secure */}

            <div className="flex items-center gap-4">

              <div
                className="
                  w-12
                  h-12
                  rounded-full
                  bg-[#FFF7E8]
                  flex
                  items-center
                  justify-center
                "
              >
                <FiShield
                  className="text-[#D4AF37]"
                  size={22}
                />
              </div>

              <div>

                <h3 className="font-semibold text-[#111]">
                  Secure Checkout
                </h3>

                <p className="text-sm text-gray-500 mt-1">
                  SSL encrypted payment & secure order processing.
                </p>

              </div>

            </div>

            {/* Privacy */}

            <div className="flex items-center gap-4">

              <div
                className="
                  w-12
                  h-12
                  rounded-full
                  bg-[#FFF7E8]
                  flex
                  items-center
                  justify-center
                "
              >
                <FiLock
                  className="text-[#D4AF37]"
                  size={22}
                />
              </div>

              <div>

                <h3 className="font-semibold text-[#111]">
                  100% Safe Payments
                </h3>

                <p className="text-sm text-gray-500 mt-1">
                  Your payment details are protected with industry-standard encryption.
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default CheckoutHeader;