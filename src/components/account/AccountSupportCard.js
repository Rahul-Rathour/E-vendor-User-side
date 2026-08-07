import React from "react";
import { Link } from "react-router-dom";
import {
  FiHeadphones,
  FiHelpCircle,
  FiMessageCircle,
  FiPhone,
  FiChevronRight,
} from "react-icons/fi";

const AccountSupportCard = () => {
  const supportItems = [
    {
      title: "Help Center",
      subtitle: "FAQs & Common Questions",
      icon: <FiHelpCircle size={20} />,
      link: "/help",
    },
    {
      title: "Contact Support",
      subtitle: "We're here to help you",
      icon: <FiHeadphones size={20} />,
      link: "/contact",
    },
    {
      title: "Live Chat",
      subtitle: "Chat with our support team",
      icon: <FiMessageCircle size={20} />,
      link: "/chat",
    },
    {
      title: "Call Us",
      subtitle: "Customer Care Assistance",
      icon: <FiPhone size={20} />,
      link: "/contact",
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
            <FiHeadphones
              size={24}
              className="text-[#D4AF37]"
            />
          </div>

          <h3 className="text-2xl font-bold text-[#111]">
            HELP & SUPPORT
          </h3>

        </div>

      </div>

      {/* Support Links */}

      <div className="divide-y">

        {supportItems.map((item, index) => (
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
            {/* Left */}

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

            {/* Right Arrow */}

            <FiChevronRight
              size={22}
              className="text-gray-400"
            />
          </Link>
        ))}

      </div>

      {/* Footer */}

      <div className="px-6 py-5 bg-[#FFF9EA] border-t">

        <p className="text-sm text-gray-600 leading-6">
          Need assistance with your orders, payments or account? Our support
          team is available to help you.
        </p>

      </div>
    </div>
  );
};

export default AccountSupportCard;