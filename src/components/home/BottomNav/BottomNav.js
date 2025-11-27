import React from "react";
import { AiOutlineHome } from "react-icons/ai";
import { FiPlay } from "react-icons/fi";
import { BsGrid } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
 
const BottomNav = () => {
  return (
    <div className="fixed bottom-0 w-full bg-white shadow-inner border-t border-gray-200 z-50 block md:hidden">
      <div className="flex justify-between px-4 py-2 text-center text-sm text-gray-600">
        <Link to="/" className="flex flex-col items-center justify-center">
          <AiOutlineHome size={22} />
          <span>Home</span>
        </Link>
        <Link to="/play" className="flex flex-col items-center justify-center">
          <FiPlay size={22} />
          <span>Play</span>
        </Link>
        <Link to="/categories" className="flex flex-col items-center justify-center">
          <BsGrid size={22} />
          <span>Categories</span>
        </Link>
        <Link to="/mobile-account" className="flex flex-col items-center justify-center">
          <FaUser size={22} />
          <span>Account</span>
        </Link>
        <Link to="/cart" className="relative flex flex-col items-center justify-center">
          <FaShoppingCart size={22} />
          <span>Cart</span>
          {/* <span className="absolute -top-1 right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">19</span> */}
        </Link>
      </div>
    </div>
  );
};

export default BottomNav;
