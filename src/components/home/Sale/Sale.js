import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../../api";
import Image from "../../designLayouts/Image";
import Heading from "../Products/Heading";

const Sale = () => {
  const [newArrivals, setNewArrivals] = useState([]);
  const navigate = useNavigate();

  const handleProductDetails = (productItem) => {
    navigate(`/product/${productItem.id}`, {
      state: { product: productItem },
    });
  };

  // Fetch 3 images from new arrivals API
  const fetchNewArrivals = async () => {
    try {
      const res = await api.get("products/new-arrivals");
      const items = res.data.data || [];
      setNewArrivals(items.slice(0, 5)); // only first 5
    } catch (err) {
      console.error("Error fetching new arrivals:", err);
    }
  };

  useEffect(() => {
    fetchNewArrivals();
  }, []);

  return (
    <>
      <Heading heading="New Arrivals" />
      <p className="text-gray-600 mb-6">
      Discover our latest additions – hand-picked styles crafted to elevate your wardrobe.
    </p>

      {/* DESKTOP VIEW (3 Columns → 1 + 2 + 2) */}
      <div className="hidden md:grid md:grid-cols-3 gap-4 p-4">

        {/* LEFT BIG IMAGE */}
        <div
          onClick={() => handleProductDetails(newArrivals[0])}
          className="h-[380px] flex items-center justify-center "
        >
          <img
            src={
              newArrivals[0]?.image
                ? `${process.env.REACT_APP_API_URL}/public/${newArrivals[0].image}`
                : "/placeholder.jpg"
            }
            className="max-w-full max-h-full object-contain rounded-2xl overflow-hidden bg-white border shadow"
            alt=""
          />
        </div>

        {/* MIDDLE 2 STACKED IMAGES */}
        <div className="grid grid-rows-2 gap-4">
          {/* 1 */}
          <div
            onClick={() => handleProductDetails(newArrivals[1])}
            className="h-[180px] flex items-center justify-center "
          >
            <img
              src={
                newArrivals[1]?.image
                  ? `${process.env.REACT_APP_API_URL}/public/${newArrivals[1].image}`
                  : "/placeholder.jpg"
              }
              className="max-w-full max-h-full object-contain rounded-2xl overflow-hidden bg-white border shadow"
              alt=""
            />
          </div>

          {/* 2 */}
          <div
            onClick={() => handleProductDetails(newArrivals[2])}
            className="h-[180px] flex items-center justify-center "
          >
            <img
              src={
                newArrivals[2]?.image
                  ? `${process.env.REACT_APP_API_URL}/public/${newArrivals[2].image}`
                  : "/placeholder.jpg"
              }
              className="max-w-full max-h-full object-contain rounded-2xl overflow-hidden bg-white border shadow"
              alt=""
            />
          </div>
        </div>

        {/* RIGHT 2 STACKED IMAGES */}
        <div className="grid grid-rows-2 gap-4">
          {/* 3 */}
          <div
            onClick={() => handleProductDetails(newArrivals[3])}
            className="h-[180px] flex items-center justify-center "
          >
            <img
              src={
                newArrivals[3]?.image
                  ? `${process.env.REACT_APP_API_URL}/public/${newArrivals[3].image}`
                  : "/placeholder.jpg"
              }
              className="max-w-full max-h-full object-contain rounded-2xl overflow-hidden bg-white border shadow"
              alt=""
            />
          </div>

          {/* 4 */}
          <div
            onClick={() => handleProductDetails(newArrivals[4])}
            className="h-[180px] flex items-center justify-center "
          >
            <img
              src={
                newArrivals[4]?.image
                  ? `${process.env.REACT_APP_API_URL}/public/${newArrivals[4].image}`
                  : "/placeholder.jpg"
              }
              className="max-w-full max-h-full object-contain rounded-2xl overflow-hidden bg-white border shadow"
              alt=""
            />
          </div>
        </div>
      </div>

      {/* MOBILE VIEW */}
      <div className="md:hidden p-4">

        {/* FIRST ROW → 1 IMAGE */}
        <div
          onClick={() => handleProductDetails(newArrivals[0])}
          className="h-[300px] mb-4 flex items-center justify-center "
        >
          <img
            src={
              newArrivals[0]?.image
                ? `${process.env.REACT_APP_API_URL}/public/${newArrivals[0].image}`
                : "/placeholder.jpg"
            }
            className="max-w-full max-h-full object-contain rounded-2xl overflow-hidden bg-white border shadow"
            alt=""
          />
        </div>

        {/* SECOND ROW → 4 IMAGES IN 2×2 GRID */}
        <div className="grid grid-cols-2 gap-4">

          {[newArrivals[1], newArrivals[2], newArrivals[3], newArrivals[4]].map(
            (item, i) => (
              <div
                key={i}
                onClick={() => handleProductDetails(item)}
                className="h-[150px] flex items-center justify-center "
              >
                <img
                  src={
                    item?.image
                      ? `${process.env.REACT_APP_API_URL}/public/${item.image}`
                      : "/placeholder.jpg"
                  }
                  className="max-w-full max-h-full object-contain rounded-2xl overflow-hidden bg-white border shadow"
                  alt=""
                />
              </div>
            )
          )}
        </div>
      </div>
    </>
  );


};

export default Sale;
