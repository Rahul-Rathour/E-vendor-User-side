import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiArrowLeft, FiPackage } from "react-icons/fi";

const OrdersHeader = () => {
  const navigate = useNavigate();

  return (
    <section className="w-full pt-10 pb-8">
      <div className="max-w-[1400px] mx-auto px-4">

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

          {/* Left */}

          <div>

            <div className="flex items-center gap-3">

              <div
                className="
                  w-14
                  h-14
                  rounded-full
                  bg-[#FFF8E8]
                  flex
                  items-center
                  justify-center
                "
              >
                <FiPackage
                  size={28}
                  className="text-[#D4AF37]"
                />
              </div>

              <div>

                <h1
                  className="
                    text-[42px]
                    font-bold
                    uppercase
                    tracking-tight
                    text-[#111]
                  "
                >
                  My Orders
                </h1>

                <p className="text-gray-500 mt-1">
                  View and track all your previous orders
                </p>

              </div>

            </div>

            {/* Breadcrumb */}

            <div className="flex items-center gap-3 mt-5 text-[15px] text-gray-500">

              <Link
                to="/"
                className="hover:text-[#D4AF37] transition"
              >
                Home
              </Link>

              <span>›</span>

              <span className="text-[#111]">
                My Orders
              </span>

            </div>

          </div>

          {/* Right */}

          <button
            onClick={() => navigate("/shop")}
            className="
              h-[52px]
              px-7
              rounded-xl
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

export default OrdersHeader;