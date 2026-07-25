import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiUser, FiHeart, FiShoppingCart } from "react-icons/fi";
import { logo } from "../../assets/images";
import SearchBox from "./SearchBox";
import { useCart } from "../../context/CartContext";

const TopHeader = () => {
    const navigate = useNavigate();

    const { cartCount = 0 } = useCart();

    const isLoggedIn = !!localStorage.getItem("userToken");

    const handleLogout = () => {
        navigate("/logout");
    };

    return (
        <div className="w-full bg-black border-b border-[#2A2A2A]">

            <div className="max-w-[1400px] mx-auto h-[82px] px-6 flex items-center justify-between gap-8">

                {/* =========================
              Logo
        ========================== */}

                <Link
                    to="/"
                    className="flex items-center shrink-0"
                >
                    <img
                        src={logo}
                        alt="Logo"
                        className="h-14 object-contain"
                    />
                </Link>

                {/* =========================
              Search
        ========================== */}

                <div className="flex-1 max-w-3xl">
                    <SearchBox />
                </div>

                {/* =========================
              Right Menu
        ========================== */}

                <div className="flex items-center gap-7">
                    {!isLoggedIn ? (
                        <button
                            onClick={() => navigate("/login")}
                            className="flex items-center gap-2 text-white hover:text-[#D4AF37] transition-all duration-200"
                        >
                            <FiUser size={20} />

                            <div className="text-left leading-tight">
                                <p className="text-xs text-gray-400">
                                    Account
                                </p>

                                <p className="text-sm font-medium">
                                    Login / Register
                                </p>
                            </div>
                        </button>
                    ) : (
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 text-white hover:text-[#D4AF37] transition-all duration-200"
                        >
                            <FiUser size={20} />

                            <div className="text-left leading-tight">
                                <p className="text-xs text-gray-400">
                                    Account
                                </p>

                                <p className="text-sm font-medium">
                                    Logout
                                </p>
                            </div>
                        </button>
                    )}
                    <button
                        onClick={() => navigate("/wishlist")}
                        className="flex items-center gap-2 text-white hover:text-[#D4AF37] transition-all duration-200"
                    >
                        <FiHeart size={20} />

                        <div className="text-left leading-tight">
                            <p className="text-xs text-gray-400">
                                Favourite
                            </p>

                            <p className="text-sm font-medium">
                                Wishlist
                            </p>
                        </div>
                    </button>
                    {/* =========================
                Cart
          ========================== */}

                    <button
                        onClick={() => navigate("/cart")}
                        className="relative flex items-center gap-2 text-white hover:text-[#D4AF37] transition-all duration-200"
                    >
                        <div className="relative">
                            <FiShoppingCart size={22} />

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
                    text-[11px]
                    font-semibold
                    flex
                    items-center
                    justify-center
                  "
                                >
                                    {cartCount}
                                </span>
                            )}
                        </div>

                        <div className="text-left leading-tight">
                            <p className="text-xs text-gray-400">
                                Shopping
                            </p>

                            <p className="text-sm font-medium">
                                Cart
                            </p>
                        </div>
                    </button>
                </div>

            </div>

        </div>
    );
};

export default TopHeader;