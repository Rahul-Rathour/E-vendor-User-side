import React, { useState, useEffect } from "react";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import Pagination from "../../components/pageProps/shopPage/Pagination";
import ProductBanner from "../../components/pageProps/shopPage/ProductBanner";
import ShopSideNav from "../../components/pageProps/shopPage/ShopSideNav";
import api from "../../api";

const Shop = () => {
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [products, setProducts] = useState([]);

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get("/products");

        if (res.data.status) {
          setProducts(res.data.data);
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

  return (
    <div className="max-w-container mx-auto px-4">
      <Breadcrumbs title="Products" />

      <div className="w-full h-full flex pb-20 gap-10">
        <div className="w-[20%] lgl:w-[25%] hidden mdl:inline-flex h-full">
          <ShopSideNav />
        </div>

        <div className="w-full mdl:w-[80%] lgl:w-[75%] h-full flex flex-col gap-10">
          <ProductBanner itemsPerPageFromBanner={itemsPerPageFromBanner} />

          {/* Pass API products to Pagination */}
          <Pagination items={products} itemsPerPage={itemsPerPage} /> 
        </div>
      </div>
    </div>
  );
};

export default Shop;
