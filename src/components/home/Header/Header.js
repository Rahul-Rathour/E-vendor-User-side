import React, { useEffect, useState, useRef } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { MdClose } from "react-icons/md";
import { HiMenuAlt2 } from "react-icons/hi";
import { motion } from "framer-motion";
import { logo } from "../../../assets/images";
import { navBarList } from "../../../constants";
import { FiChevronDown, FiGrid } from "react-icons/fi";
import { FaSearch, FaUser, FaShoppingCart, FaHeart, FaBoxOpen } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useCart } from "../../../context/CartContext";
import api from "../../../api"; // ensure this exists and uses baseURL

const Header = () => {
  const [sidenav, setSidenav] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [accountDropdown, setAccountDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [listening, setListening] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const products = useSelector((state) => state.orebiReducer.products);
  const cartCtx = useCart();
  const cartCount = cartCtx?.cartCount ?? 0;
  const isLoggedIn = !!localStorage.getItem("userToken");

  // debounce timer ref
  const debounceRef = useRef(null);

  // cancel token to abort previous request (optional improvement)
  const abortControllerRef = useRef(null);
  const recognitionRef = useRef(null);

  useEffect(() => {
    // close search dropdown on route change
    setShowResults(false);
    setIsSearchOpen(false);
  }, [location.pathname]);

  const startVoiceSearch = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Your browser does not support Voice Search");
      return;
    }


    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.lang = "en-US";
    recognitionRef.current.interimResults = false;


    recognitionRef.current.onstart = () => setListening(true);
    recognitionRef.current.onend = () => setListening(false);


    recognitionRef.current.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setSearchQuery(transcript);
      performSearch(transcript);
      setShowResults(true);
    };


    recognitionRef.current.start();
  };




  const handleLogout = () => {
    navigate("/logout");
  };

  const handleSearchChange = (e) => {
    const q = e.target.value;
    setSearchQuery(q);

    // show results box as user types
    if (q && q.trim().length > 0) {
      setShowResults(true);
    } else {
      setShowResults(false);
      setFilteredProducts([]);
    }

    // debounce
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      performSearch(q);
    }, 350);
  };

  const performSearch = async (q) => {
    // clean previous abort
    if (abortControllerRef.current) {
      try {
        abortControllerRef.current.abort();
      } catch (_) { }
    }

    if (!q || q.trim() === "") {
      setFilteredProducts([]);
      setSearchLoading(false);
      return;
    }

    setSearchLoading(true);
    abortControllerRef.current = new AbortController();

    try {
      const res = await api.get(`/products/search`, {
        params: { q: q.trim() },
        signal: abortControllerRef.current.signal,
      });
      if (res.data && res.data.status) {
        setFilteredProducts(res.data.data || []);
      } else {
        setFilteredProducts([]);
      }
    } catch (err) {
      if (err.name === "CanceledError" || err.name === "AbortError") {
        // request was cancelled — ignore
      } else {
        console.error("Search error", err);
      }
      setFilteredProducts([]);
    } finally {
      setSearchLoading(false);
    }
  };

  // click result
  const goToProduct = (product) => {
    // Depending on your ProductDetails route, navigate with id or slug
    // Your product route is: /product/:_id — if that expects numeric id use product.id
    navigate(`/product/${product.id}`, { state: { product } });
    setSearchQuery("");
    setFilteredProducts([]);
    setShowResults(false);
  };

  return (
    <div className="w-full bg-white sticky top-0 z-50 border-b border-gray-200">
      {/* Mobile header */}
      {/* Voice listening popup */}
      {listening && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[9999]">
          <div className="bg-white px-6 py-4 rounded-xl shadow-lg text-center animate-pulse">
            <p className="text-lg font-semibold">🎤 Listening...</p>
          </div>
        </div>
      )}
      <div className="md:hidden w-full bg-white sticky top-0 z-50 border-b border-gray-200">
        <div className="w-full h-16 flex items-center justify-between px-4">
          {/* Logo */}
          <Link to="/">
            <img src={logo} alt="logo" className="h-10 object-contain" />
          </Link>

          {/* Cart Icon */}
          <Link to="/cart" className="relative">
            <FaShoppingCart className="w-6 h-6 text-gray-700" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1.5 rounded-full">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Login / Logout */}
          {!isLoggedIn ? (
            <button onClick={() => navigate("/login")}>
              <FaUser className="w-6 h-6 text-gray-700" />
            </button>
          ) : (
            <button
              onClick={handleLogout}
              className="text-xs bg-gray-100 px-2 py-1 rounded hover:bg-gray-200"
            >
              Logout
            </button>
          )}

          {/* Menu Icon */}
          <HiMenuAlt2
            onClick={() => setSidenav(true)}
            className="w-7 h-7 text-gray-700 cursor-pointer"
          />
        </div>

        {/* Always visible Search Bar like Flipkart */}
        <div className="px-4 pb-3">
          <div className="flex gap-2 items-center">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search for products, brands and more"
              className="flex-1 p-2 border border-gray-300 rounded-md bg-blue-50"
            />

            {/* Voice Button */}
            <button
              onClick={startVoiceSearch}
              className="text-gray-500 hover:text-blue-600"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
                className="w-5 h-5"
              >
                <path d="M12 14a3 3 0 0 0 3-3V5a3 3 0 1 0-6 0v6a3 3 0 0 0 3 3zm5-3a5 5 0 0 1-10 0H5a7 7 0 0 0 14 0h-2zm-5 9a1 1 0 0 0 1-1v-2a1 1 0 1 0-2 0v2a1 1 0 0 0 1 1z" />
              </svg>
            </button>

            <button
              onClick={() => {
                if (searchQuery.trim()) {
                  navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
                }
              }}
              className="px-3 py-1 text-sm bg-primeColor text-white rounded-md hover:bg-black transition-all duration-200"
            >
              Search
            </button>
          </div>


          {/* Mobile search results */}
          {showResults && (
            <div className="bg-white border mt-1 rounded shadow-md max-h-64 overflow-y-auto">
              {searchLoading && (
                <div className="p-2 text-sm text-gray-500">Searching...</div>
              )}

              {!searchLoading &&
                filteredProducts.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-2 p-2 border-b cursor-pointer hover:bg-gray-100"
                    onClick={() => goToProduct(item)}
                  >
                    <img
                      src={
                        item.image
                          ? `${process.env.REACT_APP_API_URL}/public/${item.image}`
                          : "/placeholder.jpg"
                      } 
                      alt={item.image}
                      className="w-10 h-10 object-cover"
                    />
                    <div>
                      <p className="text-sm font-medium">{item.name}</p>
                      <p className="text-xs text-gray-500">₹{item.price}</p>
                    </div>
                  </div>
                ))}

              {!searchLoading && filteredProducts.length === 0 && (
                <div className="p-2 text-sm text-gray-500">No products found.</div>
              )}
            </div>
          )}
        </div>
      </div>


      {/* Mobile menu omitted for brevity, keep your existing code */}
      {/* Mobile Side Menu */}
      {sidenav && (
        <motion.div
          className="fixed inset-0 z-[999] bg-black/40"
          onClick={() => setSidenav(false)}
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
            className="w-72 h-full bg-white p-4 shadow-lg fixed left-0 top-0"
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold">Menu</h2>
              <MdClose
                onClick={() => setSidenav(false)}
                className="w-6 h-6 text-gray-700 cursor-pointer"
              />
            </div>

            {/* Menu Items */}
            <div className="flex flex-col gap-4">

              {!isLoggedIn ? (
                <button
                  onClick={() => {
                    navigate("/login");
                    setSidenav(false);
                  }}
                  className="flex items-center gap-3 p-2 border rounded hover:bg-gray-100"
                >
                  <FaUser className="text-gray-700" />
                  <span>Login</span>
                </button>
              ) : (
                <button
                  onClick={() => {
                    handleLogout();
                    setSidenav(false);
                  }}
                  className="flex items-center gap-3 p-2 border rounded hover:bg-gray-100"
                >
                  <FaUser className="text-gray-700" />
                  <span>Logout</span>
                </button>
              )}

              <button
                onClick={() => {
                  navigate("/cart");
                  setSidenav(false);
                }}
                className="flex items-center gap-3 p-2 border rounded hover:bg-gray-100"
              >
                <FaShoppingCart className="text-gray-700" />
                <span>Cart</span>
              </button>

              <button
                onClick={() => {
                  navigate("/categories");
                  setSidenav(false);
                }}
                className="flex items-center gap-3 p-2 border rounded hover:bg-gray-100"
              >
                <FiGrid className="text-gray-700" />
                <span>All Category</span>
              </button>

              <button
                onClick={() => {
                  navigate("/wishlist");
                  setSidenav(false);
                }}
                className="flex items-center gap-3 p-2 border rounded hover:bg-gray-100"
              >
                <FaHeart className="text-gray-700" />
                <span>Wishlist</span>
              </button>

              <button
                onClick={() => {
                  navigate("/order");
                  setSidenav(false);
                }}
                className="flex items-center gap-3 p-2 border rounded hover:bg-gray-100"
              >
                <FaBoxOpen className="text-gray-700" />
                <span>My Orders</span>
              </button>

              <button
                onClick={() => {
                  navigate("/profile");
                  setSidenav(false);
                }}
                className="flex items-center gap-3 p-2 border rounded hover:bg-gray-100"
              >
                <FaUser className="text-gray-700" />
                <span>My Profile</span>
              </button>

            </div>
          </motion.div>
        </motion.div>
      )}



      {/* Desktop header */}
      <div className="hidden md:flex items-center justify-between px-8 py-4 max-w-screen-xl mx-auto">
        <Link to="/">
          <img src={logo} alt="logo" className="h-10 object-contain" />
        </Link>

        <div className="flex-1 mx-8 relative flex items-center">
          <div className="relative w-full">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              onKeyDown={(e) => {
                if (e.key === "Enter" && searchQuery.trim()) {
                  navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
                  setShowResults(false);
                }
              }}
              placeholder="Search for products, brands and more"
              className="w-full p-2 pl-10 border rounded-l bg-blue-50 text-gray-800 outline-none"
            />

            <FaSearch className="absolute left-3 top-3 text-gray-500" />
          </div>

          {/* Voice Button Desktop */}
          <button
            onClick={startVoiceSearch}
            className="right-3 text-gray-500 hover:text-blue-600"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
              className="w-5 h-5"
            >
              <path d="M12 14a3 3 0 0 0 3-3V5a3 3 0 1 0-6 0v6a3 3 0 0 0 3 3zm5-3a5 5 0 0 1-10 0H5a7 7 0 0 0 14 0h-2zm-5 9a1 1 0 0 0 1-1v-2a1 1 0 1 0-2 0v2a1 1 0 0 0 1 1z" />
            </svg>
          </button>
          <button
            onClick={() => {
              if (searchQuery.trim()) {
                navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
                setShowResults(false);
              }
            }}
            className="bg-primeColor text-white px-4 py-2 rounded-r hover:bg-black transition-colors duration-200"
          >
            Search
          </button>

          {/* Results Dropdown */}
          {showResults && (
            <div className="absolute top-12 left-0 right-0 bg-white border rounded shadow-lg z-50 max-h-80 overflow-y-auto">
              {searchLoading && <div className="p-3 text-sm text-gray-500">Searching...</div>}

              {!searchLoading && filteredProducts.length === 0 && (
                <div className="p-3 text-sm text-gray-500">No products found.</div>
              )}

              {!searchLoading &&
                filteredProducts.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-2 p-2 border-b cursor-pointer hover:bg-gray-100"
                    onClick={() => goToProduct(item)}
                  >
                    <img
                      src={
                        item.image
                          ? `${process.env.REACT_APP_API_URL}/public/${item.image}`
                          : "/placeholder.jpg"
                      }
                      alt={item.name}
                      className="w-12 h-12 object-cover"
                    />
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-500">₹{item.price}</p>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>


        <div className="flex items-center gap-6 relative">
          {!isLoggedIn ? (
            <button onClick={() => navigate("/login")} className="flex items-center gap-2 px-4 py-2 rounded hover:bg-blue-100 transition-colors duration-200">
              <FaUser className="text-gray-700" />
              <span>Login</span>
            </button>
          ) : (
            <button onClick={handleLogout} className="text-sm bg-gray-100 px-2 py-1 rounded hover:bg-gray-200">
              Logout
            </button>
          )}

          <Link to="/cart" className="relative flex items-center gap-2">
            <FaShoppingCart className="text-gray-700" />
            <span>Cart</span>
            {cartCount > 0 && <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs px-1.5 rounded-full">{cartCount}</span>}
          </Link>

          <Link to="/wishlist" className="flex items-center gap-2">
            <FaHeart className="text-gray-700 hover:text-red-500" />
            <span>Wishlist</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
