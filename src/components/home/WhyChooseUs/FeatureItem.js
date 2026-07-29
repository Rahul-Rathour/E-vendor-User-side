import React from "react";

const FeatureItem = ({ icon, title, description }) => {
  return (
    <div
      className="
        bg-white
        rounded-xl
        p-6
        border
        border-gray-100
        shadow-sm
        hover:shadow-lg
        transition-all
        duration-300
      "
    >
      {/* Icon */}
      <div
        className="
          w-14
          h-14
          rounded-full
          bg-[#D4AF37]/10
          text-[#D4AF37]
          flex
          items-center
          justify-center
          text-2xl
          mb-5
        "
      >
        {icon}
      </div>

      {/* Title */}

      <h3 className="text-xl font-semibold text-[#111111] mb-3">
        {title}
      </h3>

      {/* Description */}

      <p className="text-gray-600 leading-7">
        {description}
      </p>
    </div>
  );
};

export default FeatureItem;