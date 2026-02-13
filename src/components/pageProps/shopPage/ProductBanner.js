import React from "react";
import { GoTriangleDown } from "react-icons/go";

const ProductBanner = ({
  itemsPerPageFromBanner,
  sortHandler,
  onMobileFilterOpen,
}) => {
  return (
    <div className="w-full flex flex-col md:flex-row md:items-center justify-between">

      {/* =====================================
           LEFT SIDE — MOBILE FILTER BUTTON
         ===================================== */}
      <div className="flex mdl:hidden">
        <button
          onClick={onMobileFilterOpen}
          className="px-4 py-2 bg-primeColor text-white rounded-md shadow"
        >
          Filters
        </button>
      </div>

      {/* =====================================
           RIGHT SIDE — SORT + SHOW
         ===================================== */}
      <div className="flex items-center gap-4 mt-4 md:mt-0">

        {/* Sort Dropdown */}
        <div className="flex items-center gap-2 text-base text-[#767676] relative">
          <label>Sort by:</label>
          <select
            onChange={(e) => sortHandler(e.target.value)}
            className="w-32 md:w-52 border border-gray-200 py-1 px-4 cursor-pointer text-primeColor text-base"
          >
            <option value="Best Sellers">Best Sellers</option>
            <option value="New Arrival">New Arrival</option>
            <option value="Featured">Featured</option>
            <option value="Final Offer">Final Offer</option>
          </select>
          <span className="absolute right-2 md:right-4 top-2.5">
            <GoTriangleDown />
          </span>
        </div>

        {/* Items Per Page */}
        <div className="flex items-center gap-2 text-[#767676] relative">
          <label>Show:</label>
          <select
            onChange={(e) => itemsPerPageFromBanner(+e.target.value)}
            className="w-16 md:w-20 border border-gray-200 py-1 px-4 cursor-pointer text-primeColor text-base appearance-none"
          >
            <option value="12">12</option>
            <option value="24">24</option>
            <option value="36">36</option>
            <option value="48">48</option>
          </select>
          <span className="absolute right-3 top-2.5">
            <GoTriangleDown />
          </span>
        </div>

      </div>
    </div>
  );
};

export default ProductBanner;
