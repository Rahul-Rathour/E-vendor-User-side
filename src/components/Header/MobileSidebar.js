import React from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { MdClose } from "react-icons/md";

import {
  FiUser,
  FiHeart,
  FiShoppingCart,
  FiGrid,
} from "react-icons/fi";

import { FaBoxOpen } from "react-icons/fa";

const MobileSidebar = ({ open, onClose }) => {
  const navigate = useNavigate();

  const isLoggedIn = !!localStorage.getItem("userToken");

  const goTo = (url) => {
    navigate(url);
    onClose();
  };

  const handleLogout = () => {
    navigate("/logout");
    onClose();
  };

  const toggleOrderType = () => {
    const current =
      localStorage.getItem("orderType") || "general_price";

    const next =
      current === "general_price"
        ? "wholesale_price"
        : "general_price";

    localStorage.setItem("orderType", next);

    onClose();

    window.location.href = "https://bulk.blackhewzen.com/";
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[999] bg-black/40"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="fixed left-0 top-0 w-72 h-full bg-white shadow-xl p-5"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">
                Menu
              </h2>

              <MdClose
                onClick={onClose}
                className="w-6 h-6 cursor-pointer text-gray-700 hover:text-black"
              />
            </div>

            {/* Menu */}
            <div className="flex flex-col gap-3">

              {!isLoggedIn ? (
                <button
                  onClick={() => goTo("/login")}
                  className="flex items-center gap-3 p-3 border rounded-md hover:bg-gray-100 transition"
                >
                  <FiUser />
                  <span>Login</span>
                </button>
              ) : (
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 p-3 border rounded-md hover:bg-gray-100 transition"
                >
                  <FiUser />
                  <span>Logout</span>
                </button>
              )}

              <button
                onClick={() => goTo("/cart")}
                className="flex items-center gap-3 p-3 border rounded-md hover:bg-gray-100 transition"
              >
                <FiShoppingCart />
                <span>Cart</span>
              </button>

              <button
                onClick={() => goTo("/categories")}
                className="flex items-center gap-3 p-3 border rounded-md hover:bg-gray-100 transition"
              >
                <FiGrid />
                <span>All Categories</span>
              </button>

              <button
                onClick={() => goTo("/wishlist")}
                className="flex items-center gap-3 p-3 border rounded-md hover:bg-gray-100 transition"
              >
                <FiHeart />
                <span>Wishlist</span>
              </button>

              <button
                onClick={() => goTo("/order")}
                className="flex items-center gap-3 p-3 border rounded-md hover:bg-gray-100 transition"
              >
                <FaBoxOpen />
                <span>My Orders</span>
              </button>

              <button
                onClick={() => goTo("/profile")}
                className="flex items-center gap-3 p-3 border rounded-md hover:bg-gray-100 transition"
              >
                <FiUser />
                <span>My Profile</span>
              </button>

              <button
                onClick={toggleOrderType}
                className="flex items-center gap-3 p-3 border rounded-md hover:bg-gray-100 transition"
              >
                <FiUser />
                <span>Switch to Bulk Order</span>
              </button>

            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileSidebar;