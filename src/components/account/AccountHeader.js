import React from "react";
import {
  FiUser,
  FiAward,
} from "react-icons/fi";
import { FaCrown } from "react-icons/fa";

const AccountHeader = ({ user }) => {
  return (
    <div
      className="
        bg-white
        rounded-2xl
        border
        border-gray-200
        shadow-sm
        p-6
      "
    >
      <div className="flex flex-col lg:flex-row justify-between gap-8">

        {/* ================= LEFT ================= */}

        <div className="flex items-center gap-5">

          {/* Avatar */}

          <div
            className="
              w-24
              h-24
              rounded-full
              overflow-hidden
              bg-black
              flex
              items-center
              justify-center
              border-4
              border-[#D4AF37]
              shadow-md
            "
          >
            {user?.profile_image ? (
              <img
                src={`${process.env.REACT_APP_API_URL}/storage/${user.profile_image}`}
                alt={user.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <FiUser
                size={46}
                className="text-[#D4AF37]"
              />
            )}
          </div>

          {/* User Info */}

          <div>

            <div className="flex flex-wrap items-center gap-3">

              <h2 className="text-3xl font-bold text-[#111] capitalize">
                {user?.name}
              </h2>

              <span
                className="
                  bg-[#FFF4D8]
                  text-[#9A6B00]
                  text-xs
                  font-semibold
                  uppercase
                  px-3
                  py-1
                  rounded-full
                  tracking-wide
                "
              >
                {user?.membership || "Standard Member"}
              </span>

            </div>

            <p className="text-gray-500 mt-3 text-lg">
              {user?.email}
            </p>

            {user?.phone && (
              <p className="text-gray-400 mt-1">
                +91 {user.phone}
              </p>
            )}

          </div>

        </div>

        {/* ================= RIGHT ================= */}

        <div
          className="
            flex
            items-center
            gap-4
            lg:border-l
            lg:pl-10
          "
        >
          <div
            className="
              w-16
              h-16
              rounded-full
              bg-[#FFF7E8]
              flex
              items-center
              justify-center
            "
          >
            <FaCrown
              className="text-[#D4AF37]"
              size={28}
            />
          </div>

          <div>

            <h3 className="text-2xl font-bold text-[#D4AF37]">
              Welcome Back!
            </h3>

            <p className="text-gray-500 mt-1 leading-7">
              Manage your account,
              <br />
              orders and preferences.
            </p>

            <div className="mt-4 flex items-center gap-2 text-sm text-[#D4AF37] font-semibold">
              <FiAward />
              Premium Shopping Experience
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default AccountHeader;