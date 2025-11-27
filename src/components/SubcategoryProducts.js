import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import api from "../api";
import { FaShoppingCart } from "react-icons/fa";
import { BsSuitHeartFill, BsSuitHeart } from "react-icons/bs";
import { MdOutlineLabelImportant } from "react-icons/md";
import { GiReturnArrow } from "react-icons/gi";
import { toast } from "react-toastify";
import Breadcrumbs from "./pageProps/Breadcrumbs";

import ProductBanner from "./pageProps/shopPage/ProductBanner";
import Pagination from "./pageProps/shopPage/Pagination";

const SubcategoryProducts = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { addToCart } = useCart();

  const [products, setProducts] = useState([]);
  const [activeWishlist, setActiveWishlist] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(12);

  // ===========================================================================================
  // Fetch products under selected subcategory
  // ===========================================================================================
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get(`/subcategories/${id}/products`);
        setProducts(res.data.data || []);
      } catch (err) {
        console.error("Error fetching subcategory products:", err);
      }
    };
    fetchProducts();
  }, [id]);

  // ===========================================================================================
  // Wishlist Handler
  // ===========================================================================================
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
      } else {
        toast.info(res.data.message || "Already in wishlist");
      }

      setActiveWishlist((prev) =>
        prev.includes(productId) ? prev : [...prev, productId]
      );
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong while adding to wishlist");
    }
  };

  // ===========================================================================================
  // Items per page from ProductBanner
  // ===========================================================================================
  const itemsPerPageFromBanner = (value) => {
    setItemsPerPage(value);
  };

  // ===========================================================================================
  // Custom Product card - used by Pagination
  // ===========================================================================================
  const ProductCard = ({ prod }) => (
    <div
      key={prod.id}
      className="w-full relative group bg-white border rounded-md overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
    >
      {/* ❤️ Wishlist button */}
      <div className="absolute top-4 right-4 z-10">
        <div
          onClick={() => handleAddToWishlist(prod.id)}
          className={`flex items-center justify-center w-10 h-10 rounded-full bg-white text-xl shadow-md hover:shadow-lg cursor-pointer transition-all duration-300 ${
            activeWishlist.includes(prod.id)
              ? "text-brandColor"
              : "text-gray-400 hover:text-brandColor"
          }`}
        >
          {activeWishlist.includes(prod.id) ? (
            <BsSuitHeartFill />
          ) : (
            <BsSuitHeart />
          )}
        </div>
      </div>

      {/* Image */}
      <div className="relative overflow-hidden">
        {prod.is_new && (
          <span className="absolute top-4 left-4 bg-brandColor text-white text-sm px-3 py-1 rounded-md font-medium">
            New
          </span>
        )}
        <img
          src={
            prod.image
              ? `${process.env.REACT_APP_API_URL}/public/${prod.image}`
              : "/placeholder.jpg"
          }
          alt={prod.name}
          onClick={() => navigate(`/product/${prod.id}`)}
          className="w-full h-64 object-contain p-6 transition-transform duration-700 group-hover:scale-105"
        />

        {/* Hover Icons */}
        <div className="absolute bottom-[-100px] group-hover:bottom-6 left-1/2 transform -translate-x-1/2 flex items-center gap-4 transition-all duration-700">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white text-brandColor hover:bg-brandColor hover:text-white text-xl shadow-md hover:shadow-lg cursor-pointer">
            <GiReturnArrow />
          </div>

          <div
            onClick={() => addToCart(prod.id, prod.price)}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-white text-brandColor hover:bg-brandColor hover:text-white text-xl shadow-md hover:shadow-lg cursor-pointer"
          >
            <FaShoppingCart />
          </div>

          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white text-brandColor hover:bg-brandColor hover:text-white text-xl shadow-md hover:shadow-lg cursor-pointer">
            <MdOutlineLabelImportant />
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="px-5 py-4 border-t flex flex-col gap-1">
        <div className="flex items-center justify-between font-titleFont">
          <h3 className="text-lg font-bold text-primeColor truncate">
            {prod.name}
          </h3>
          <p className="text-[#767676] text-[15px] font-medium">₹ {prod.price}</p>
        </div>
        <p className="text-[#767676] text-[14px]">{prod.color || "Mixed"}</p>
      </div>
    </div>
  );

  return (
    <div className="max-w-container mx-auto px-4 py-8">
      <Breadcrumbs title="Products" />

      {/* Filter bar same as Shop page */}
      <ProductBanner itemsPerPageFromBanner={itemsPerPageFromBanner} />

      {/* Pagination Component - SAME AS SHOP COMPONENT */}
      <Pagination
        items={products.map((p) => ({ ...p, Component: ProductCard }))}
        itemsPerPage={itemsPerPage}
        customCard={(item) => <ProductCard prod={item} />}
      />
    </div>
  );
}; 

export default SubcategoryProducts;
