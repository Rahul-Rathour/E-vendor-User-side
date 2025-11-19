import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useCart } from "../../context/CartContext";
import { Link, useNavigate } from "react-router-dom";
import { FaTrash, FaCartPlus } from "react-icons/fa";
import api from "../../api"; // ✅ your axios instance
import { toast } from "react-toastify";

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
    <div className="p-4 md:p-5">
      <h1 className="text-2xl font-bold mb-4">My Wishlist</h1>

      {wishlistItems.length === 0 ? (
        <p>Your wishlist is empty.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {wishlistItems.map((item) => (
            <div
              key={item.id}
              className="border p-2 rounded-xl shadow-md relative group"
            >
              <Link to={`/product/${item.id}`}>
                <img
                  src={item.image}
                  alt={`Image of ${item.name}`}
                  className="w-full h-48 object-contain"
                />
                <h2 className="text-lg font-semibold mt-2">{item.name}</h2>
              </Link>

              <p className="text-green-600 font-bold mt-1">₹{item.price}</p>

              {/* Add to Cart Button */}
              <button
                onClick={() => addToCart(item.id, item.price)}
                className="mt-2 flex items-center gap-2 text-sm text-white bg-blue-600 px-3 py-1 rounded hover:bg-blue-700"
              >
                <FaCartPlus /> Add to Cart
              </button>

              {/* Remove from Wishlist */}
              <button
                onClick={() => handleRemove(item.id)}
                className="absolute top-2 right-2 text-red-500 hover:text-red-700"
              >
                <FaTrash />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistPage;
