import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromWishlist, addToCart } from "../../redux/orebiSlice";
import { Link } from "react-router-dom";
import { FaTrash, FaCartPlus } from "react-icons/fa";

const WishlistPage = () => {
  const wishlistItems = useSelector((state) => state.orebiReducer.wishlist);
  const dispatch = useDispatch();

  if (!wishlistItems) return <p className="p-4">Loading wishlist...</p>;

  return (
    <div className="p-4 md:p-5">
      <h1 className="text-2xl font-bold mb-4">My Wishlist</h1>

      {wishlistItems.length === 0 ? (
        <p>Your wishlist is empty.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {wishlistItems.map((item) => (
            <div
              key={item._id}
              className="border p-2 rounded-xl shadow-md relative group"
            >
              <Link to={`/product/${item._id}`}>
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
                onClick={() => dispatch(addToCart({ ...item, quantity: 1 }))}
                className="mt-2 flex items-center gap-2 text-sm text-white bg-blue-600 px-3 py-1 rounded hover:bg-blue-700"
              >
                <FaCartPlus /> Add to Cart
              </button>

              {/* Remove from Wishlist */}
              <button
                onClick={() => {
                  if (window.confirm("Remove this item from your wishlist?")) {
                    dispatch(removeFromWishlist(item._id));
                  }
                }}
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
