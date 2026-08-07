import React from "react";
import { Link } from "react-router-dom";
import {
  FiEdit2,
  FiShoppingBag,
  FiHeart,
  FiMapPin,
  FiChevronRight,
} from "react-icons/fi";

const actions = [
  {
    title: "Edit Profile",
    description: "Update your personal information",
    icon: <FiEdit2 size={28} />,
    link: "/profile",
  },
  {
    title: "Orders",
    description: "View and track your orders",
    icon: <FiShoppingBag size={28} />,
    link: "/order",
  },
  {
    title: "Wishlist",
    description: "Your favorite products",
    icon: <FiHeart size={28} />,
    link: "/wishlist",
  },
  {
    title: "Saved Address",
    description: "Manage your saved addresses",
    icon: <FiMapPin size={28} />,
    link: "/addresses",
  },
];

const AccountQuickActions = () => {
  return (
    <>
      {actions.map((item, index) => (
        <Link
          key={index}
          to={item.link}
          className="
            group
            bg-white
            rounded-2xl
            border
            border-[#ECECEC]
            hover:border-[#D4AF37]
            hover:shadow-lg
            transition-all
            duration-300
            p-6
            flex
            items-center
            justify-between
          "
        >
          {/* Left */}
          <div className="flex items-center gap-5">

            {/* Icon */}
            <div
              className="
                w-16
                h-16
                rounded-2xl
                bg-[#111]
                text-[#D4AF37]
                flex
                items-center
                justify-center
                transition-all
                duration-300
                group-hover:bg-[#D4AF37]
                group-hover:text-black
              "
            >
              {item.icon}
            </div>

            {/* Text */}
            <div>

              <h3 className="text-xl font-bold text-[#111]">
                {item.title}
              </h3>

              <p className="text-gray-500 mt-2 text-sm leading-6">
                {item.description}
              </p>

            </div>

          </div>

          {/* Arrow */}

          <FiChevronRight
            size={24}
            className="
              text-gray-400
              group-hover:text-[#D4AF37]
              group-hover:translate-x-1
              transition-all
            "
          />

        </Link>
      ))}
    </>
  );
};

export default AccountQuickActions;