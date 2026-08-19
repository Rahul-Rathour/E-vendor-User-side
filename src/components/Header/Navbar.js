import React from "react";
import { NavLink } from "react-router-dom";
import { FiChevronDown } from "react-icons/fi";

const Navbar = () => {
    const menuItems = [
        {
            title: "Home",
            link: "/",
        },
        // {
        //     title: "Men",
        //     link: "/category/men",
        //     dropdown: true,
        // },
        // {
        //     title: "Jackets",
        //     link: "/category/jackets",
        // },
        // {
        //     title: "T-Shirts",
        //     link: "/category/t-shirts",
        // },
        // {
        //     title: "Jeans",
        //     link: "/category/jeans",
        // },
        // {
        //     title: "Lowers",
        //     link: "/category/lowers",
        // },
        // {
        //     title: "New Arrivals",
        //     link: "/new-arrivals",
        // },
        {
            title: "Contact",
            link: "/contact",
        },
    ];

    return (
        <nav className="bg-black border-t border-[#202020] border-b border-[#202020]">

            <div className="max-w-[1400px] mx-auto px-6">

                <div className="h-[58px] flex items-center justify-between">

                    {/* Left Menu */}

                    <div className="flex items-center gap-8">
                        {menuItems.map((item) => (
                            <NavLink
                                key={item.title}
                                to={item.link}
                                className={({ isActive }) =>
                                    `flex items-center gap-1 text-sm font-medium tracking-wide transition-all duration-200
                                        ${isActive
                                        ? "text-[#D4AF37]"
                                        : "text-white hover:text-[#D4AF37]"
                                    }`
                                }
                            >
                                {item.title}

                                {item.dropdown && (
                                    <FiChevronDown size={16} />
                                )}
                            </NavLink>
                        ))}
                    </div>

                    {/* Dealer Login Button */}

                    <div className="flex items-center">
                        {/* <NavLink
                            to="/bulk-order"
                            className={({ isActive }) =>
                                `mr-4 text-sm font-medium tracking-wide transition-all duration-200 ${isActive
                                    ? "text-[#D4AF37]"
                                    : "text-white hover:text-[#D4AF37]"
                                }`
                            }
                        >
                            Bulk Order
                        </NavLink> */}

                        <a
                            href="https://bulk.blackhewzen.com/"
                            className="border border-[#D4AF37] text-[#D4AF37] px-5 py-2 rounded-md text-sm font-semibold hover:bg-[#D4AF37] hover:text-black transition-all duration-300"
                        >
                           Bulk Order
                        </a>

                    </div>

                </div>

            </div>

        </nav>
    );
};

export default Navbar;