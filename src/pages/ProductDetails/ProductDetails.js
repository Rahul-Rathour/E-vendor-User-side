import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import ProductInfo from "../../components/pageProps/productDetails/ProductInfo";
import ProductsOnSale from "../../components/pageProps/productDetails/ProductsOnSale";
import api from "../../api"; // your axios instance

const ProductDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  const [prevLocation, setPrevLocation] = useState("");
  const [productInfo, setProductInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setPrevLocation(location.pathname);
    const fetchProduct = async () => {
      try {
        const res = await api.get(`/product/${id}`);
        if (res.data.status) {
          setProductInfo(res.data.data);
        } else {
          setProductInfo(null);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, location.pathname]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-[60vh] text-gray-500 text-lg">
        Loading product details...
      </div>
    );

  if (!productInfo)
    return (
      <div className="text-center mt-20 text-xl font-medium text-red-500">
        Product not found!
      </div>
    );

  return (
    <div className="w-full mx-auto border-b border-gray-300 bg-white">
      <div className="max-w-container mx-auto px-4">
        <div className="xl:-mt-10 -mt-7">
          <Breadcrumbs title={productInfo.name} prevLocation={prevLocation} />
        </div>

        <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-6 gap-4 h-full -mt-5 xl:-mt-8 pb-10 bg-gray-100 p-4 rounded-lg">
          {/* Left Section - Related/Offers */}
          <div className="h-full">
            <ProductsOnSale />
          </div>

          {/* Product Image */}
          <div className="h-full xl:col-span-2 flex justify-center items-center">
            <img
              className="w-full h-full object-cover rounded-md shadow-md"
              src={
                productInfo.image
                  ? `${process.env.REACT_APP_API_URL}/storage/${productInfo.image}`
                  : "/placeholder.jpg"
              }
              alt={productInfo.name}
            />
          </div>

          {/* Product Info */}
          <div className="h-full w-full md:col-span-2 xl:col-span-3 xl:p-14 flex flex-col gap-6 justify-center">
            <ProductInfo productInfo={productInfo} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
