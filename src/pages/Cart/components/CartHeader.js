import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

const CartHeader = () => {
  const navigate = useNavigate();

  return (
    <section className="w-full pt-10 pb-8">
      <div className="max-w-[1400px] mx-auto px-4">

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

          {/* Left */}

          <div>

            <h1 className="text-[42px] font-bold text-[#111111] uppercase tracking-tight">
              Shopping Cart
            </h1>

            <div className="flex items-center gap-3 mt-3 text-[15px] text-gray-500">

              <Link
                to="/"
                className="hover:text-[#D4AF37] transition"
              >
                Home
              </Link>

              <span>›</span>

              <span className="text-[#111111]">
                Cart
              </span>

            </div>

          </div>

          {/* Right */}

          <button
            onClick={() => navigate(-1)}
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

            Continue Shopping
          </button>

        </div>

      </div>
    </section>
  );
};

export default CartHeader;