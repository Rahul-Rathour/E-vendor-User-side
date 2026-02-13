import React, { useState, useEffect } from "react";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import Pagination from "../../components/pageProps/shopPage/Pagination";
import ProductBanner from "../../components/pageProps/shopPage/ProductBanner";
import ShopSideNav from "../../components/pageProps/shopPage/ShopSideNav";
import api from "../../api";

const Shop = () => {
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [products, setProducts] = useState([]);
  const [sortedProducts, setSortedProducts] = useState([]);

  const [showFilter, setShowFilter] = useState(false); // mobile drawer

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get("/products");

        if (res.data.status) {
          setProducts(res.data.data);
          setSortedProducts(res.data.data);
        }
      } catch (error) {
        console.log("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const itemsPerPageFromBanner = (itemsPerPage) => {
    setItemsPerPage(itemsPerPage);
  };

  // DESKTOP PRICE FILTER HANDLER
  const handlePriceFilter = (min, max) => {
    const filtered = products.filter(
      (p) => p.price >= min && p.price <= max
    );
    setSortedProducts(filtered);
  };

  // MOBILE AUTO-CLOSE FILTER HANDLER
  const handleMobileFilterSelect = (min, max) => {
    handlePriceFilter(min, max);
    setShowFilter(false); // auto-close drawer
  };

  // Sorting function
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
        sorted = sorted.filter((p) => p.product_type === "none");
        break;
    }

    setSortedProducts(sorted);
  };

  return (
    <div className="max-w-container mx-auto px-4">

      {/* MOBILE FILTER BUTTON */}
      <div className="w-full flex justify-end mdl:hidden mb-4 mt-4">
        <button
          onClick={() => setShowFilter(true)}
          className="px-4 py-2 bg-primeColor text-white rounded-md shadow"
        >
          Filters
        </button>
      </div>

      <div className="w-full h-full flex pb-20 gap-10">
        
        {/* DESKTOP FILTER SIDEBAR */}
        <div className="w-[20%] lgl:w-[25%] hidden mdl:inline-flex h-full">
          <ShopSideNav onPriceSelect={handlePriceFilter} />
        </div>

        {/* RIGHT SECTION */}
        <div className="w-full mdl:w-[80%] lgl:w-[75%] h-full flex flex-col gap-10">
          <ProductBanner
            itemsPerPageFromBanner={itemsPerPageFromBanner}
            sortHandler={handleSort}
            onMobileFilterOpen={() => setShowFilter(true)}
          />
          <Pagination items={sortedProducts} itemsPerPage={itemsPerPage} />
        </div>
      </div>

      {/* MOBILE FILTER DRAWER */}
      {showFilter && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 mdl:hidden">
          <div className="absolute bottom-0 left-0 w-full bg-white shadow-xl rounded-t-xl p-5 h-[70%] overflow-y-auto">

            {/* HEADER */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Filters</h2>
              <button
                onClick={() => setShowFilter(false)}
                className="text-red-500 text-2xl"
              >
                ✕
              </button>
            </div>

            {/* MOBILE FILTERS (AUTO CLOSE) */}
            <ShopSideNav onPriceSelect={handleMobileFilterSelect} />
          </div>
        </div>
      )}

    </div>
  );
};

export default Shop;
