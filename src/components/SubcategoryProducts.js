import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import api from "../api";
import { toast } from "react-toastify";

import Pagination from "../components/pageProps/shopPage/Pagination";
import ProductBanner from "../components/pageProps/shopPage/ProductBanner";
import ShopSideNav from "./pageProps/shopPage/ShopSideNav";

const SubcategoryProducts = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { addToCart } = useCart();

  const [products, setProducts] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [activeWishlist, setActiveWishlist] = useState([]);
  const [sortedProducts, setSortedProducts] = useState([]);

  // NEW → for mobile filter drawer
  const [showFilter, setShowFilter] = useState(false);

  // Fetch Category Products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get(`/subcategories/${id}/products`);
        setProducts(res.data.data || []);
        setSortedProducts(res.data.data || []);
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

  // SORTING FUNCTION
  const handleSort = (type) => {
    let sorted = [...products];

    switch (type) {
      case "New Arrival":
        sorted = sorted.filter((p) => p.product_type === "new");
        break;

      case "Featured":
        sorted = sorted.filter((p) => p.product_type === "special_offer");
        break;

      case "Final Offer":
        sorted = sorted.filter((p) => p.product_type === "hot_deal");
        break;

      default:
        sorted = [...products];
        break;
    }

    setSortedProducts(sorted);
  };

  // PRICE FILTER HANDLER DESKTOP
  const handlePriceFilter = (min, max) => {
    const filtered = products.filter(
      (p) => p.price >= min && p.price <= max
    );
    setSortedProducts(filtered);
  };

  // MOBILE FILTER HANDLER (auto-close drawer)
  const handleMobilePriceFilter = (min, max) => {
    handlePriceFilter(min, max);
    setShowFilter(false);
  };

  // Wishlist Logic
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

      <div className="w-full h-full flex pb-20 gap-10">

        {/* DESKTOP SIDEBAR */}
        <div className="w-[20%] lgl:w-[25%] hidden mdl:inline-flex h-full">
          <ShopSideNav onPriceSelect={handlePriceFilter} />
        </div>

        {/* RIGHT CONTENT */}
        <div className="w-full mdl:w-[80%] lgl:w-[75%] h-full flex flex-col gap-10">
          
          {/* PRODUCT BANNER (Mobile Filter Button Inside) */}
          <ProductBanner
            itemsPerPageFromBanner={itemsPerPageFromBanner}
            sortHandler={handleSort}
            onMobileFilterOpen={() => setShowFilter(true)}
          />

          {/* PRODUCT LIST */}
          {products.length === 0 ? (
            <p className="text-center text-gray-500 mt-10">
              No products found in this category.
            </p>
          ) : (
            <Pagination
              items={sortedProducts}
              itemsPerPage={itemsPerPage}
              wishlistHandler={handleAddToWishlist}
              activeWishlist={activeWishlist}
              addToCart={addToCart}
              navigate={navigate}
              cardType="CATEGORY"
            />
          )}
        </div>
      </div>

      {/* MOBILE FILTER DRAWER */}
      {showFilter && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 mdl:hidden">
          <div className="absolute bottom-0 left-0 w-full bg-white shadow-xl rounded-t-xl p-5 h-[70%] overflow-y-auto">

            {/* Drawer Header */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Filters</h2>
              <button
                onClick={() => setShowFilter(false)}
                className="text-red-500 text-2xl"
              >
                ✕
              </button>
            </div>

            {/* Mobile Filters (auto close) */} 
            <ShopSideNav onPriceSelect={handleMobilePriceFilter} />
          </div>
        </div>
      )}

    </div>
  );
};

export default SubcategoryProducts;
