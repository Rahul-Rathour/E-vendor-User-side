import React from "react";
import { FiArrowRight } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const CategoryCard = ({ id, title, image }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/category/${id}`)}
      className="
        group
        relative
        overflow-hidden
        rounded-2xl
        cursor-pointer
        h-[260px]
        lg:h-[320px]
      "
    >
      {/* Category Image */}
      <img
        src={
          image
            ? `${process.env.REACT_APP_API_URL}/public/${image}`
            : "/placeholder.jpg"
        }
        alt={title}
        className="
          w-full
          h-full
          object-cover
          transition-transform
          duration-700
          group-hover:scale-110
        "
      />

      {/* Gradient Overlay */}
      <div
        className="
          absolute
          inset-0
          bg-gradient-to-t
          from-black/80
          via-black/20
          to-transparent
        "
      />

      {/* Content */}
      <div
        className="
          absolute
          bottom-0
          left-0
          w-full
          p-6
          text-white
        "
      >
        <h3 className="text-2xl font-bold mb-3">
          {title}
        </h3>

        <button
          className="
            flex
            items-center
            gap-2
            text-sm
            font-semibold
            uppercase
            tracking-wide
            group-hover:text-[#D4AF37]
            transition-all
          "
        >
          Shop Collection

          <FiArrowRight
            className="
              transition-transform
              duration-300
              group-hover:translate-x-2
            "
          />
        </button>
      </div>
    </div>
  );
};

export default CategoryCard;