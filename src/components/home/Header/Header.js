import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { MdClose } from "react-icons/md";
import { HiMenuAlt2 } from "react-icons/hi";
import { motion } from "framer-motion";
import { logo, logoLight } from "../../../assets/images";
import Image from "../../designLayouts/Image";
import { navBarList, paginationItems } from "../../../constants";
import Flex from "../../designLayouts/Flex";
import { FiChevronDown } from "react-icons/fi";
import { FaSearch, FaUser, FaShoppingCart,  FaHeart } from "react-icons/fa";
import { useSelector } from "react-redux";
import AccountLayout from "../../../pages/Account/AccountLayout";

const Header = () => {
  const [sidenav, setSidenav] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const products = useSelector((state) => state.orebiReducer.products);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    const filtered = paginationItems.filter((item) =>
      item.productName.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchQuery]);

  useEffect(() => {
    setIsSearchOpen(false);
  }, [location.pathname]);

  // Dropdown state
  const [accountDropdown, setAccountDropdown] = useState(false);

  return (
    <div className="w-full bg-white sticky top-0 z-50 border-b border-gray-200">
      {/* Mobile Header */}
      <div className="md:hidden w-full h-16 flex items-center justify-between px-4 shadow-sm relative">
        <Link to="/">
          <img src={logo} alt="logo" className="h-10 object-contain" />
        </Link>

        {/* Search toggle */}
        <FaSearch
          onClick={() => setIsSearchOpen((prev) => !prev)}
          className="w-5 h-5 text-gray-600 cursor-pointer"
        />

        {/* Search Input */}
        {isSearchOpen && (
          <div className="absolute top-full left-0 w-full bg-white p-2 shadow-lg z-50">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearch}
              placeholder="Search products..."
              className="w-full p-2 border border-gray-300 rounded outline-none"
            />
            {filteredProducts.length > 0 && (
              <div className="bg-white border mt-1 rounded shadow-md max-h-64 overflow-y-auto">
                {filteredProducts.map((item) => (
                  <div
                    key={item._id}
                    className="flex items-center gap-2 p-2 border-b cursor-pointer hover:bg-gray-100"
                    onClick={() => {
                      navigate(
                        `/product/${item.productName.toLowerCase().replace(/\s+/g, "")}`,
                        { state: { item } }
                      );
                      setSearchQuery("");
                      setIsSearchOpen(false);
                    }}
                  >
                    <img
                      src={item.img}
                      alt={item.productName}
                      className="w-10 h-10 object-cover"
                    />
                    <div>
                      <p className="text-sm font-medium">{item.productName}</p>
                      <p className="text-xs text-gray-500">₹{item.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        <Link to="/cart">
          <FaShoppingCart className="w-5 h-5 text-gray-600" />
        </Link>
        <button
          onClick={() => navigate("/login")}
          className="focus:outline-none"
          aria-label="Login"
        >
          <FaUser className="w-5 h-5 text-gray-600" />
        </button>
        <HiMenuAlt2
          onClick={() => setSidenav(true)}
          className="w-6 h-6 text-gray-600 cursor-pointer"
        />
      </div>

      {/* Mobile Menu */}
      {sidenav && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex">
          <motion.div
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-white w-4/5 h-full p-4 relative"
          >
            <div className="flex justify-between items-center mb-4">
              <img src={logo} alt="logo" className="h-8" />
              <MdClose
                onClick={() => setSidenav(false)}
                className="text-xl cursor-pointer"
              />
            </div>
            <ul className="space-y-2">
              {navBarList.map((item) => (
                <li key={item._id}>
                  <NavLink
                    to={item.link}
                    state={{ data: location.pathname.split("/")[1] }}
                    onClick={() => setSidenav(false)}
                    className="block py-2 text-gray-700 hover:text-black"
                  >
                    {item.title}
                  </NavLink>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      )}

      {/* Desktop Header */}
      <div className="hidden md:flex items-center justify-between px-8 py-4 max-w-screen-xl mx-auto">
        {/* Logo */}
        <Link to="/">
          <img src={logo} alt="logo" className="h-10 object-contain" />
        </Link>

        {/* Search Bar */}
        <div className="flex-1 mx-8 relative">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Search for products, brands and more"
            className="w-full p-2 pl-10 border rounded bg-blue-50 text-gray-800 outline-none"
          />
          <FaSearch className="absolute left-3 top-3 text-gray-500" />
          {searchQuery && (
            <div className="absolute top-12 left-0 right-0 bg-white border rounded shadow-lg z-50 max-h-80 overflow-y-auto">
              {filteredProducts.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center gap-2 p-2 border-b cursor-pointer hover:bg-gray-100"
                  onClick={() => {
                    navigate(`/product/${item.productName.toLowerCase().replace(/\s+/g, '')}`, {
                      state: { item },
                    });
                    setSearchQuery("");
                  }}
                >
                  <img src={item.img} alt={item.productName} className="w-12 h-12 object-cover" />
                  <div>
                    <p className="font-medium">{item.productName}</p>
                    <p className="text-sm text-gray-500">₹{item.price}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Icons */}
        <div className="flex items-center gap-6 relative">
          {/* Account Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setAccountDropdown(true)}
            onMouseLeave={() => setAccountDropdown(false)}
          >
            <button
              className="flex items-center gap-2 px-4 py-2 rounded hover:bg-blue-100 transition-colors duration-200 focus:outline-none"
              onClick={() => navigate("/login")}
              aria-label="Login"
            >
              <FaUser className="text-gray-700" />
              <span>Login</span>
              <FiChevronDown className={`ml-1 transition-transform duration-200 ${accountDropdown ? "rotate-180" : ""}`} />
            </button>
            {accountDropdown && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute right-0 mt-0 w-56 bg-white rounded-lg shadow-xl border z-50"
              >
                <Link
                  to="/account"
                  className="flex items-center gap-2 px-4 py-3 hover:bg-blue-50 transition-colors"
                  onClick={() => setAccountDropdown(false)}
                >
                  <FaUser className="text-blue-600" />
                  My Account
                </Link>
                <Link
                  to="/order"
                  className="flex items-center gap-2 px-4 py-3 hover:bg-blue-50 transition-colors"
                  onClick={() => setAccountDropdown(false)}
                >
                  <FaShoppingCart className="text-green-600" />
                  My Orders
                </Link>
                <Link
                  to="/wishlist"
                  className="flex items-center gap-2 px-4 py-3 hover:bg-blue-50 transition-colors"
                  onClick={() => setAccountDropdown(false)}
                >
                  <FaHeart className="text-red-500" />
                  Wishlist
                </Link>
                <Link
                  to="/signup"
                  className="flex items-center gap-2 px-4 py-3 hover:bg-blue-50 transition-colors"
                  onClick={() => setAccountDropdown(false)}
                >
                  <span className="material-icons text-gray-500">New customer?</span>
                  SignUp
                </Link>
                <div className="border-t my-1"></div>
                <Link
                  to="/logout"
                  className="flex items-center gap-2 px-4 py-3 hover:bg-blue-50 transition-colors"
                  onClick={() => setAccountDropdown(false)}
                >
                  <span className="material-icons text-gray-500">logout</span>
                  Logout
                </Link>
              </motion.div>
            )}
          </div>
          <Link to="/cart" className="flex items-center gap-2">
            <FaShoppingCart className="text-gray-700" />
            <span>Cart</span>
          </Link>
          <div className="flex items-center gap-2 cursor-pointer">
            <Link to="/wishlist" className="flex items-center gap-2">
              <FaHeart className="text-gray-700 hover:text-red-500" />
              <span>Wishlist</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
