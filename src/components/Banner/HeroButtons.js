import React from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";

const HeroButtons = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
      {/* Shop Now */}
      <button
        onClick={() => navigate("/shop")}
        className="
          group
          flex
          items-center
          gap-3
          px-8
          py-4
          rounded-md
          bg-[#D4AF37]
          text-black
          font-semibold
          hover:bg-[#C79D17]
          transition-all
          duration-300
          shadow-lg
        "
      >
        Shop Now

        <FiArrowRight
          className="
            transition-transform
            duration-300
            group-hover:translate-x-1
          "
          size={18}
        />
      </button>

      {/* Bulk Order */}
      <button
        onClick={() => {
          window.location.href = "https://bulk.blackhewzen.com/";
        }}
        className="
          px-8
          py-4
          rounded-md
          border
          border-[#D4AF37]
          text-[#D4AF37]
          font-semibold
          hover:bg-[#D4AF37]
          hover:text-black
          transition-all
          duration-300
        "
      >
        Bulk Order
      </button>
    </div>
  );
};

export default HeroButtons;