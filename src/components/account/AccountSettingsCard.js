import React from "react";
import { Link } from "react-router-dom";
import {
  FiSettings,
  FiUser,
  FiMapPin,
  FiLock,
  FiChevronRight,
} from "react-icons/fi";

const AccountSettingsCard = () => {
  const settings = [
    {
      title: "Profile Information",
      subtitle: "Name, Email & Phone Number",
      icon: <FiUser size={20} />,
      link: "/profile",
    },
    {
      title: "Manage Addresses",
      subtitle: "Home, Office & Other Addresses",
      icon: <FiMapPin size={20} />,
      link: "/addresses",
    },
    {
      title: "PAN & Password Settings",
      subtitle: "Security & Account Verification",
      icon: <FiLock size={20} />,
      link: "/account/pan-password",
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
            <FiSettings
              size={24}
              className="text-[#D4AF37]"
            />
          </div>

          <h3 className="text-2xl font-bold text-[#111]">
            ACCOUNT SETTINGS
          </h3>

        </div>

      </div>

      {/* Settings */}

      <div className="divide-y">

        {settings.map((item, index) => (
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
    </div>
  );
};

export default AccountSettingsCard;