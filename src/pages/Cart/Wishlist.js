import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useCart } from "../../context/CartContext";
import { Link, useNavigate } from "react-router-dom";
import { FaTrash, FaCartPlus, FaShoppingCart } from "react-icons/fa";
import api from "../../api"; // ✅ your axios instance
import { toast } from "react-toastify";
import { MdOutlineLabelImportant } from "react-icons/md";
import { GiReturnArrow } from "react-icons/gi";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";

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
              ? `${process.env.REACT_APP_API_URL}/public/${w.product.image}`
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
    <Breadcrumbs title="Products" />
    <h1 className="text-2xl font-bold mb-6 text-primeColor">
      My Wishlist
    </h1>

    {wishlistItems.length === 0 ? (
      <p className="text-center text-gray-500 mt-10">Your wishlist is empty.</p>
    ) : (
      <div className="flex flex-col gap-5">
        {wishlistItems.map((item) => (
          <div
            key={item.id}
            className="flex flex-col md:flex-row items-center md:items-start bg-white border rounded-lg shadow-sm p-4 relative"
          >
            {/* ❌ Remove icon */}
            <button
              onClick={() => handleRemove(item.id)}
              className="absolute top-3 right-3 text-red-500 hover:text-red-700"
            >
              <FaTrash size={20} />
            </button>

            {/* 📦 Left Image */}
            <div className="w-full md:w-40 flex justify-center items-center">
              <img
                src={item.image}
                alt={item.name}
                className="w-32 h-32 object-contain cursor-pointer"
                onClick={() => navigate(`/product/${item.id}`)}
              />
            </div>

            {/* 📄 Right Details */}
            <div className="flex flex-col md:ml-5 mt-3 md:mt-0 w-full">
              {/* "Currently unavailable" */}
              <p className="text-sm text-red-500 font-semibold mb-1">
                Currently unavailable
              </p>

              {/* Title */}
              <h3 className="text-lg font-bold text-gray-800 truncate">
                {item.name}
              </h3>

              {/* Price */}
              <p className="text-xl font-semibold text-gray-900 mt-1">
                ₹ {item.price}
              </p>

              {/* Color */}
              <p className="text-gray-500 text-sm">
                {item.color || "Mixed"}
              </p>

              {/* Buttons */}
              <div className="flex items-center gap-4 mt-3">
                <button className="p-2 rounded-full border text-purple-600 hover:bg-purple-600 hover:text-white transition">
                  <GiReturnArrow size={18} />
                </button>

                <button
                  onClick={() => addToCart(item.id, item.price)}
                  className="p-2 rounded-full border text-purple-600 hover:bg-purple-600 hover:text-white transition"
                >
                  <FaShoppingCart size={18} />
                </button>

                <button className="p-2 rounded-full border text-purple-600 hover:bg-purple-600 hover:text-white transition">
                  <MdOutlineLabelImportant size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
);


};

export default WishlistPage;
