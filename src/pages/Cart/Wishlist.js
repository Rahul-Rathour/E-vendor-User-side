import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useCart } from "../../context/CartContext";
import { Link, useNavigate } from "react-router-dom";
import { FaTrash, FaCartPlus, FaShoppingCart } from "react-icons/fa";
import api from "../../api"; // ✅ your axios instance
import { toast } from "react-toastify";
import { MdOutlineLabelImportant } from "react-icons/md";
import { GiReturnArrow } from "react-icons/gi";

const WishlistPage = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const dispatch = useDispatch();
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Get wishlist from backend
  useEffect(() => {
    const fetchWishlist = async () => {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user) {
        navigate('/login');
        toast.warning("Please login to see your wishlist");
        setLoading(false);
        return;
      }

      try {
        const res = await api.get(`/wishlist/${user.id}`);
        if (res.data.status) {
          // backend returns wishlist items with "product" relation
          const items = res.data.data.map((w) => ({
            id: w.product.id,
            name: w.product.name,
            price: w.product.price,
            image: w.product.image
              ? `${process.env.REACT_APP_API_URL}/storage/${w.product.image}`
              : "/placeholder.jpg",
          }));
          setWishlistItems(items);
        }
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch wishlist");
      } finally {
        setLoading(false);
      }
    };

    fetchWishlist();
  }, []);

  // ✅ Handle remove wishlist item
  const handleRemove = async (productId) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      toast.warning("Please login first");
      return;
    }
    try {
      // Assuming you have DELETE /wishlist/{user_id}/{product_id}
      await api.delete(`/wishlist/${user.id}/${productId}`);
      toast.success("Removed from wishlist");
      setWishlistItems((prev) => prev.filter((item) => item.id !== productId));
    } catch (err) {
      console.error(err);
      toast.error("Failed to remove item from wishlist");
    }
  };

  if (loading) return <p className="p-4">Loading wishlist...</p>;

  return (
    <div className="max-w-container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6 text-primeColor text-center md:text-left">
        My Wishlist
      </h1>

      {wishlistItems.length === 0 ? (
        <p className="text-center text-gray-500 mt-10">Your wishlist is empty.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {wishlistItems.map((item) => (
            <div
              key={item.id}
              className="w-full relative group bg-white border rounded-md overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
            >
              {/* ❤️ Remove from wishlist */}
              <div className="absolute top-4 right-4 z-10">
                <div
                  onClick={() => handleRemove(item.id)}
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-white text-xl shadow-md hover:shadow-lg cursor-pointer transition-all duration-300 text-red-500 hover:text-red-600"
                >
                  <FaTrash />
                </div>
              </div>

              {/* Image Section */}
              <div className="relative overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  onClick={() => navigate(`/product/${item.id}`)}
                  className="w-full h-64 object-contain p-6 transition-transform duration-700 group-hover:scale-105"
                />

                {/* Hover Icons */}
                <div className="absolute bottom-[-100px] group-hover:bottom-6 left-1/2 transform -translate-x-1/2 flex items-center gap-4 transition-all duration-700">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white text-[#9F2B68] hover:bg-[#9F2B68] hover:text-white text-xl shadow-md hover:shadow-lg cursor-pointer">
                    <GiReturnArrow />
                  </div>
                  <div
                    onClick={() => addToCart(item.id, item.price)}
                    className="flex items-center justify-center w-10 h-10 rounded-full bg-white text-[#9F2B68] hover:bg-[#9F2B68] hover:text-white text-xl shadow-md hover:shadow-lg cursor-pointer"
                  >
                    <FaShoppingCart />
                  </div>
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white text-[#9F2B68] hover:bg-[#9F2B68] hover:text-white text-xl shadow-md hover:shadow-lg cursor-pointer">
                    <MdOutlineLabelImportant />
                  </div>

                </div>
              </div>

              {/* Info section */}
              <div className="px-5 py-4 border-t flex flex-col gap-1">
                <div className="flex items-center justify-between font-titleFont">
                  <h3 className="text-lg font-bold text-primeColor truncate">
                    {item.name}
                  </h3>
                  <p className="text-[#767676] text-[15px] font-medium">
                    ₹ {item.price}
                  </p>
                </div>
                <p className="text-[#767676] text-[14px]">
                  {item.color || "Mixed"}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

};

export default WishlistPage;
