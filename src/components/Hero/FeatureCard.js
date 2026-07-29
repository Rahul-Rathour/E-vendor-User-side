import React from "react";

const FeatureCard = ({ icon, title, subtitle }) => {
  return (
    <div
      className="
        group
        flex
        items-center
        gap-4
        p-5
        rounded-xl
        bg-[#111111]
        border
        border-[#252525]
        hover:border-[#D4AF37]
        transition-all
        duration-300
        hover:-translate-y-1
      "
    >
      <div
        className="
          w-14
          h-14
          rounded-full
          bg-[#D4AF37]/10
          flex
          items-center
          justify-center
          text-[#D4AF37]
          text-2xl
          group-hover:bg-[#D4AF37]
          group-hover:text-black
          transition-all
          duration-300
        "
      >
        {icon}
      </div>

      <div>
        <h3 className="text-white font-semibold text-lg">
          {title}
        </h3>

        <p className="text-gray-400 text-sm mt-1">
          {subtitle}
        </p>
      </div>
    </div>
  );
};

export default FeatureCard;