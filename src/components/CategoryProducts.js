import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import api from "../api";
import { toast } from "react-toastify";
import Breadcrumbs from "./pageProps/Breadcrumbs";

// ⬇️ IMPORT PAGINATION + BANNER (same as Shop)
import Pagination from "../components/pageProps/shopPage/Pagination";
import ProductBanner from "../components/pageProps/shopPage/ProductBanner";

const CategoryProducts = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { addToCart } = useCart();

  const [products, setProducts] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [activeWishlist, setActiveWishlist] = useState([]);

  // Fetch Category Products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get(`/categories/${id}/products`);
        setProducts(res.data.products || []);
      } catch (err) {
        console.log(err);
      }
    };

    fetchProducts();
  }, [id]);

  // Items Per Page Handler
  const itemsPerPageFromBanner = (value) => {
    setItemsPerPage(value);
  };

  // ❤️ Wishlist Logic
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
        setActiveWishlist((prev) => [...prev, productId]);
      } else {
        toast.info(res.data.message || "Already in wishlist");
        setActiveWishlist((prev) =>
          prev.includes(productId) ? prev : [...prev, productId]
        );
      }
    } catch (err) {
      toast.error("Something went wrong while adding to wishlist");
    }
  };

  return (
    <div className="max-w-container mx-auto px-4 py-8">
      <Breadcrumbs title="Products" />

      {/* Product Banner (Sort + Show) */}
      <ProductBanner itemsPerPageFromBanner={itemsPerPageFromBanner} />

      {/* If No Products */}
      {products.length === 0 ? (
        <p className="text-center text-gray-500 mt-10">
          No products found in this category.
        </p>
      ) : (
        // 🎯 Pagination component (same as Shop)
        <Pagination
          items={products}
          itemsPerPage={itemsPerPage}
          wishlistHandler={handleAddToWishlist}
          activeWishlist={activeWishlist}
          addToCart={addToCart}
          navigate={navigate}
          cardType="CATEGORY"
        />
      )}
    </div>
  );
};
 
export default CategoryProducts;
