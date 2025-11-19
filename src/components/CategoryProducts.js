import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import api from "../api";
import { FaShoppingCart } from "react-icons/fa";
import { BsSuitHeartFill, BsSuitHeart } from "react-icons/bs";
import { MdOutlineLabelImportant } from "react-icons/md";
import { GiReturnArrow } from "react-icons/gi";
import { toast } from "react-toastify";

const CategoryProducts = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [activeWishlist, setActiveWishlist] = useState([]); // store highlighted product ID

  useEffect(() => {
    api
      .get(`/categories/${id}/products`)
      .then((res) => setProducts(res.data.products || []))
      .catch((err) => console.log(err));
  }, [id]);

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
        Products
      </h2>

      {products.length === 0 ? (
        <p className="text-center text-gray-500 mt-10">
          No products found in this category.
        </p>
      ) : (

        <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              // onClick={() => navigate(`/product/${product.id}`)}
              className="w-full relative group bg-white border rounded-md overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
            >
              {/*  Fixed Heart Icon */}
              <div className="absolute top-4 right-4 z-10">
                <div
                  onClick={() => handleAddToWishlist(product.id)}
                  className={`flex items-center justify-center w-10 h-10 rounded-full bg-white text-xl shadow-md hover:shadow-lg cursor-pointer transition-all duration-300 ${activeWishlist.includes(product.id)
                    ? "text-[#9F2B68]"
                    : "text-gray-400 hover:text-[#9F2B68]"
                    }`}
                >
                  {activeWishlist.includes(product.id) ? (
                    <BsSuitHeartFill />
                  ) : (
                    <BsSuitHeart />
                  )}
                </div>
              </div>
              {/* Image section */}
              <div className="relative overflow-hidden">
                {product.is_new && (
                  <span className="absolute top-4 left-4 bg-[#9F2B68] text-white text-sm px-3 py-1 rounded-md font-medium">
                    New
                  </span>
                )}
                <img
                  src={
                    product.image
                      ? `${process.env.REACT_APP_API_URL}/storage/${product.image}`
                      : "/placeholder.jpg"
                  }
                  alt={product.name}
                  onClick={() => navigate(`/product/${product.id}`)}
                  className="w-full h-64 object-contain p-6 transition-transform duration-700 group-hover:scale-105"
                />

                {/* Hover Icons */}
                <div className="absolute bottom-[-100px] group-hover:bottom-6 left-1/2 transform -translate-x-1/2 flex items-center gap-4 transition-all duration-700">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white text-[#9F2B68] hover:bg-[#9F2B68] hover:text-white text-xl shadow-md hover:shadow-lg cursor-pointer">
                    <GiReturnArrow />
                  </div>
                  <div
                    onClick={() => addToCart(product.id, product.price)}
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
                    {product.name}
                  </h3>
                  <p className="text-[#767676] text-[15px] font-medium">
                    ₹ {product.price}
                  </p>
                </div>
                <p className="text-[#767676] text-[14px]">
                  {product.color || "Mixed"}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryProducts;
