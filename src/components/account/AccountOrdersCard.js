import React from "react";
import { Link } from "react-router-dom";
import {
  FiPackage,
  FiChevronRight,
} from "react-icons/fi";

const AccountOrdersCard = () => {
  return (
    <div
      className="
        bg-white
        rounded-2xl
        border
        border-[#ECECEC]
        shadow-sm
        overflow-hidden
      "
    >
      {/* Header */}

      <div className="px-6 py-5 border-b">

        <div className="flex items-center gap-3">

          <div
            className="
              w-12
              h-12
              rounded-xl
              bg-[#FFF7E8]
              flex
              items-center
              justify-center
            "
          >
            <FiPackage
              className="text-[#D4AF37]"
              size={24}
            />
          </div>

          <h3 className="text-2xl font-bold text-[#111]">
            MY ORDERS
          </h3>

        </div>

      </div>

      {/* Body */}

      <div className="divide-y">

        <Link
          to="/order"
          className="
            flex
            items-center
            justify-between
            px-6
            py-5
            hover:bg-[#FFFDF8]
            transition-all
          "
        >
          <div>

            <h4 className="font-semibold text-lg text-[#111]">
              My Orders
            </h4>

            <p className="text-sm text-gray-500 mt-1">
              View, track and manage all your orders
            </p>

          </div>

          <FiChevronRight
            className="text-gray-400"
            size={22}
          />

        </Link>

      </div>
    </div>
  );
};

export default AccountOrdersCard;