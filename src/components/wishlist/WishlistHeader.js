import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiArrowLeft, FiHeart } from "react-icons/fi";

const WishlistHeader = () => {
  const navigate = useNavigate();

  return (
    <section className="w-full pt-10 pb-8">
      <div className="max-w-[1400px] mx-auto px-4">

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

          {/* Left */}

          <div>

            <div className="flex items-center gap-4">

              <div
                className="
                  w-16
                  h-16
                  rounded-full
                  bg-[#FFF8E8]
                  flex
                  items-center
                  justify-center
                  border
                  border-[#E7D29A]
                "
              >
                <FiHeart
                  className="text-[#D4AF37]"
                  size={30}
                />
              </div>

              <div>

                <h1
                  className="
                    text-[42px]
                    font-bold
                    uppercase
                    tracking-tight
                    text-[#111111]
                  "
                >
                  My Wishlist
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
                    Wishlist
                  </span>

                </div>

              </div>

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

export default WishlistHeader;