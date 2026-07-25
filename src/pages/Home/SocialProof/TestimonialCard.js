import React from "react";
import {
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import { FaStar } from "react-icons/fa";

// Temporary avatar
// import userImg from "../../../assets/images/user.png";

const TestimonialCard = () => {
  return (
    <div
      className="
        bg-white
        border
        border-gray-200
        rounded-xl
        p-8
      "
    >
      {/* Rating */}

      <div className="flex items-center gap-1 text-[#D4AF37] mb-6">

        <FaStar />
        <FaStar />
        <FaStar />
        <FaStar />
        <FaStar />

      </div>

      {/* Review */}

      <p className="text-gray-600 leading-8 text-[15px]">
        Black Hewzen has consistently delivered premium quality
        apparel with excellent finishing. Their customer service
        and timely delivery make them our preferred manufacturing
        partner.
      </p>

      {/* Customer */}

      <div className="flex items-center mt-8">

        <img
          src='userImg'
          alt="Customer"
          className="w-14 h-14 rounded-full object-cover"
        />

        <div className="ml-4">

          <h4 className="font-bold text-[17px]">
            Rahul Sharma
          </h4>

          <p className="text-gray-500 text-sm">
            Verified Retail Partner
          </p>

        </div>

      </div>

      {/* Bottom */}

      <div className="flex justify-between items-center mt-8">

        <span className="text-sm text-gray-400">
          01 / 05
        </span>

        <div className="flex gap-3">

          <button
            className="
              w-10
              h-10
              rounded-full
              border
              flex
              items-center
              justify-center
              hover:bg-black
              hover:text-white
              transition
            "
          >
            <FiChevronLeft />
          </button>

          <button
            className="
              w-10
              h-10
              rounded-full
              bg-black
              text-white
              flex
              items-center
              justify-center
              hover:bg-[#D4AF37]
              hover:text-black
              transition
            "
          >
            <FiChevronRight />
          </button>

        </div>

      </div>

    </div>
  );
};

export default TestimonialCard;