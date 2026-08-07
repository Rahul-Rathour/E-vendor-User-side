import React from "react";
import { Link } from "react-router-dom";
import {
  FiStar,
  FiHeart,
  FiMessageSquare,
  FiChevronRight,
} from "react-icons/fi";

const AccountMyStuffCard = () => {
  const items = [
    {
      title: "Wishlist",
      subtitle: "Your favourite products",
      icon: <FiHeart size={20} />,
      link: "/wishlist",
    },
    {
      title: "My Reviews",
      subtitle: "View your product reviews",
      icon: <FiMessageSquare size={20} />,
      link: "/reviews",
    },
  ];

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
            <FiStar
              className="text-[#D4AF37]"
              size={24}
            />
          </div>

          <h3 className="text-2xl font-bold text-[#111]">
            MY STUFF
          </h3>

        </div>

      </div>

      {/* Items */}

      <div className="divide-y">

        {items.map((item, index) => (
          <Link
            key={index}
            to={item.link}
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
            <div className="flex items-center gap-4">

              <div
                className="
                  w-11
                  h-11
                  rounded-xl
                  bg-[#F8F8F8]
                  flex
                  items-center
                  justify-center
                  text-[#D4AF37]
                "
              >
                {item.icon}
              </div>

              <div>

                <h4 className="font-semibold text-lg text-[#111]">
                  {item.title}
                </h4>

                <p className="text-sm text-gray-500 mt-1">
                  {item.subtitle}
                </p>

              </div>

            </div>

            <FiChevronRight
              className="text-gray-400"
              size={22}
            />
          </Link>
        ))}

      </div>
    </div>
  );
};

export default AccountMyStuffCard;