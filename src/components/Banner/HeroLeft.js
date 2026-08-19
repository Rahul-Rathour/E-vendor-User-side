import React from "react";
import { FiArrowRight, FiBox, FiRefreshCw } from "react-icons/fi";
import { GiClothes } from "react-icons/gi";
import { MdOutlineLocalShipping } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const HeroLeft = () => {

  const navigate = useNavigate();

  const handleNavigate = ()=>{
    window.location.href = "https://bulk.blackhewzen.com/";
  }

  const handleShop = ()=>{
    navigate('/shop');
  }
  return (
    <div className="flex flex-col justify-center py-12 lg:py-0">

      {/* Heading */}

      <h1 className="text-white font-extrabold uppercase leading-none">

        <span className="block text-[48px] lg:text-[72px]">
          Premium Apparel
        </span>

        <span className="block text-[#D4AF37] text-[42px] lg:text-[64px] mt-2">
          Built For Every Season
        </span>

      </h1>

      {/* Description */}

      <p className="mt-8 max-w-[520px] text-gray-300 text-lg leading-8">

        Manufacturer of High Quality Jackets, Lowers,
        T-Shirts & More.

      </p>

      {/* Buttons */}

      <div className="mt-10 flex flex-wrap gap-5">

        {/* Shop */}

        <button
        onClick={handleShop}
          className="
            bg-[#D4AF37]
            hover:bg-[#BF9B2F]
            text-black
            font-semibold
            px-8
            py-4
            rounded
            flex
            items-center
            gap-3
            transition-all
          "
        >
          Shop Now

          <FiArrowRight size={18} />
        </button>

        {/* Bulk */}

        <button
        onClick={handleNavigate}
          className="
            border
            border-[#D4AF37]
            text-white
            hover:bg-[#D4AF37]
            hover:text-black
            px-8
            py-4
            rounded
            font-semibold
            transition-all
          "
        >
          Bulk Order
        </button>

      </div>

      {/* Feature Icons */}

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mt-12">

        <div className="flex items-center gap-3">

          <GiClothes
            className="text-[#D4AF37]"
            size={24}
          />

          <div>

            <h4 className="text-white text-sm font-semibold">
              Premium Fabric
            </h4>

            <p className="text-gray-400 text-xs">
              High Quality
            </p>

          </div>

        </div>

        <div className="flex items-center gap-3">

          <FiBox
            className="text-[#D4AF37]"
            size={22}
          />

          <div>

            <h4 className="text-white text-sm font-semibold">
              Made in India
            </h4>

            <p className="text-gray-400 text-xs">
              Proudly Crafted
            </p>

          </div>

        </div>

        <div className="flex items-center gap-3">

          <MdOutlineLocalShipping
            className="text-[#D4AF37]"
            size={24}
          />

          <div>

            <h4 className="text-white text-sm font-semibold">
              Fast Delivery
            </h4>

            <p className="text-gray-400 text-xs">
              Pan India
            </p>

          </div>

        </div>

        <div className="flex items-center gap-3">

          <FiRefreshCw
            className="text-[#D4AF37]"
            size={22}
          />

          <div>

            <h4 className="text-white text-sm font-semibold">
              Easy Returns
            </h4>

            <p className="text-gray-400 text-xs">
              Exchange
            </p>

          </div>

        </div>

      </div>

    </div>
  );
};

export default HeroLeft;