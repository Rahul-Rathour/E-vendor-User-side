import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import api from "../../api";
import { toast } from "react-toastify";
import { BsFillSuitHeartFill, BsSuitHeart } from "react-icons/bs";
import { MdOutlineLabelImportant } from "react-icons/md";
import { FaShoppingCart } from "react-icons/fa";
import { GiReturnArrow } from "react-icons/gi";
import { useCart } from "../../context/CartContext";

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [activeWishlist, setActiveWishlist] = useState([]); // store highlighted product ID
  const { addToCart } = useCart();
  useEffect(() => {
    const fetchResults = async () => {
      if (!query.trim()) return;
      setLoading(true);
      try {
        const res = await api.get(`/products/search`, { params: { q: query.trim() } });
        if (res.data.status) {
          setProducts(res.data.data);
        } else {
          setProducts([]);
        }
      } catch (err) {
        console.error("Search results error:", err);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchResults();
  }, [query]);

  //  Handle Add to Wishlist
  const handleAddToWishlist = async (productId) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      toast.warning("Please login to add to wishlist");
      return;
    }

    try {
      const res = await api.post("/wishlist", {
        user_id: user.id,
        product_id: productId,
      });

      if (res.data.status) {
        toast.success(res.data.message || "Added to wishlist ❤️");
        // ✅ Add this productId to wishlistItems if not already there
        setActiveWishlist((prev) => [...prev, productId]);
      } else {
        toast.info(res.data.message || "Already in wishlist");
        // ✅ Still highlight it even if already in wishlist
        setActiveWishlist((prev) =>
          prev.includes(productId) ? prev : [...prev, productId]
        );
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong while adding to wishlist");
    }
  }

  return (
    <div className="max-w-container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6 text-primeColor text-center md:text-left">
        Search Results for <span className="text-brandColor">“{query}”</span>
      </h2>

      {loading ? (
        <p className="text-center text-gray-500 mt-10">Loading products...</p>
      ) : products.length === 0 ? (
        <p className="text-center text-gray-500 mt-10">No products found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((item) => (
            <div
              key={item.id}
              className="w-full relative group bg-white border rounded-md overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
            >
              {/* Wishlist heart */}
              <div className="absolute top-4 right-4 z-10">
                <div
                  onClick={() => handleAddToWishlist(item.id)}
                  className={`flex items-center justify-center w-10 h-10 rounded-full bg-white text-xl shadow-md hover:shadow-lg cursor-pointer transition-all duration-300 ${activeWishlist.includes(item.id)
                      ? "text-brandColor"
                      : "text-gray-400 hover:text-brandColor"
                    }`}
                >
                  {activeWishlist.includes(item.id) ? (
                    <BsFillSuitHeartFill />
                  ) : (
                    <BsSuitHeart />
                  )}
                </div>
              </div>

              {/* Image Section */}
              <div className="relative overflow-hidden">
                {item.is_new && (
                  <span className="absolute top-4 left-4 bg-brandColor text-white text-sm px-3 py-1 rounded-md font-medium">
                    New
                  </span>
                )}

                <img
                  src={
                    item.image
                      ? `${process.env.REACT_APP_API_URL}/storage/${item.image}`
                      : "/placeholder.jpg"
                  }
                  alt={item.name}
                  onClick={() =>
                    navigate(`/product/${item.id}`, {
                      state: { product: item },
                    })
                  }
                  className="w-full h-64 object-contain p-6 transition-transform duration-700 group-hover:scale-105 cursor-pointer"
                />

                {/* Hover Action Icons */}
                <div className="absolute bottom-[-100px] group-hover:bottom-6 left-1/2 transform -translate-x-1/2 flex items-center gap-4 transition-all duration-700">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white text-brandColor hover:bg-brandColor hover:text-white text-xl shadow-md hover:shadow-lg cursor-pointer">
                    <GiReturnArrow />
                  </div>

                  <div
                    onClick={() => addToCart(item.id, item.price)}
                    className="flex items-center justify-center w-10 h-10 rounded-full bg-white text-brandColor hover:bg-brandColor hover:text-white text-xl shadow-md hover:shadow-lg cursor-pointer"
                  >
                    <FaShoppingCart />
                  </div>

                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white text-brandColor hover:bg-brandColor hover:text-white text-xl shadow-md hover:shadow-lg cursor-pointer">
                    <MdOutlineLabelImportant />
                  </div>
                </div>
              </div>

              {/* Product Info Section */}
              <div className="px-5 py-4 border-t flex flex-col gap-1">
                <div className="flex items-center justify-between font-titleFont">
                  <h3
                    onClick={() =>
                      navigate(`/product/${item.id}`, {
                        state: { product: item },
                      })
                    }
                    className="text-lg font-bold text-primeColor truncate cursor-pointer"
                  >
                    {item.name}
                  </h3>

                  <p className="text-[#767676] text-[15px] font-medium">
                    ₹ {item.price}
                  </p>
                </div>

                <p className="text-[#767676] text-[14px]">
                  {item.category_name || "General"}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>

  );
};

export default SearchResults;
