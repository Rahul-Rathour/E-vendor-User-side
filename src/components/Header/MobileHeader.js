import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { HiMenuAlt2 } from "react-icons/hi";
import { FiShoppingCart, FiUser } from "react-icons/fi";

import { logo } from "../../assets/images";
import { useCart } from "../../context/CartContext";

import SearchBox from "./SearchBox";

const MobileHeader = ({ onMenuClick }) => {
    const navigate = useNavigate();

    const { cartCount = 0 } = useCart();

    const isLoggedIn = !!localStorage.getItem("userToken");

    return (
        <div className="bg-black border-b border-[#2A2A2A]">

            {/* Top Row */}

            <div className="h-16 px-4 flex items-center justify-between">

                {/* Left */}

                <button
                    onClick={onMenuClick}
                    className="text-white"
                >
                    <HiMenuAlt2 size={28} />
                </button>

                {/* Logo */}

                <Link
                    to="/"
                    className="flex items-center justify-center"
                >
                    <img
                        src={logo}
                        alt="Logo"
                        className="h-10 object-contain"
                    />
                </Link>

                {/* Right */}

                <div className="flex items-center gap-5">
                    {/* Account */}

                    <button
                        onClick={() =>
                            navigate(isLoggedIn ? "/profile" : "/login")
                        }
                        className="text-white"
                    >
                        <FiUser size={22} />
                    </button>

                    {/* Cart */}

                    <button
                        onClick={() => navigate("/cart")}
                        className="relative text-white"
                    >
                        <FiShoppingCart size={24} />

                        {cartCount > 0 && (
                            <span
                                className="
                  absolute
                  -top-2
                  -right-2
                  w-5
                  h-5
                  rounded-full
                  bg-[#D4AF37]
                  text-black
                  text-[10px]
                  font-semibold
                  flex
                  items-center
                  justify-center
                "
                            >
                                {cartCount}
                            </span>
                        )}
                    </button>

                </div>

            </div>
            {/* Search */}

            <div className="px-4 pb-4">

                <SearchBox mobile={true} />

            </div>
            {/* Quick Actions */}
            <div className="px-4 pb-4">

                <div className="grid grid-cols-3 gap-3">

                    <button
                        onClick={() => navigate('/wishlist')}
                        className="bg-[#111111] border border-[#2A2A2A] rounded-lg py-3 text-white text-sm font-medium hover:border-[#D4AF37] transition-all duration-200"
                    >
                        Wishlist
                    </button>

                    <button
                        onClick={() => navigate('/order')}
                        className="bg-[#111111] border border-[#2A2A2A] rounded-lg py-3 text-white text-sm font-medium hover:border-[#D4AF37] transition-all duration-200"
                    >
                        Orders
                    </button>

                    <button
                        onClick={() => window.location.href="https://bulk.blackhewzen.com/"}
                        className="bg-[#D4AF37] rounded-lg py-3 text-black text-sm font-semibold hover:bg-[#c79d17] transition-all duration-200"
                    > 
                        Bulk
                    </button>

                </div>

            </div>

        </div>
    );
};

export default MobileHeader;