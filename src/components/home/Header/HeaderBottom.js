import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../api";

const CategoryBar = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await api.get("/categories");
        setCategories(res.data.data || []);
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };
    fetchCategories();
  }, []);

  return (
    <div className="relative w-full bg-white border-b py-4 px-2 overflow-x-auto whitespace-nowrap flex gap-4 scrollbar-hide z-1 md:justify-center md:flex-wrap md:overflow-visible">
      {categories.map((cat) => (
        <div
          key={cat.id}
          className="relative group flex flex-col items-center justify-start min-w-[90px] cursor-pointer"
        >
          {/* Main Category Image + Name */}
          <div
            onClick={() => navigate(`/category/${cat.id}`)}
            className="flex flex-col items-center hover:scale-105 transition-transform duration-200"
          >
            <img
              src={
                cat.image
                  ? `${process.env.REACT_APP_API_URL}/storage/${cat.image}`
                  : "/placeholder.jpg"
              }
              alt={cat.name}
              className="w-14 h-14 mb-1 object-cover rounded-full border border-gray-200"
            />
            <span className="text-sm text-gray-900 text-center font-bold flex items-center gap-1 relative">
              {cat.name}

              {/* Optional dropdown arrow indicator if subcategories exist */}
              {cat.subcategories && cat.subcategories.length > 0 && (
                <>
                  <span className="text-xs group-hover:hidden hidden sm:inline">▲</span>
                  <span className="text-xs hidden group-hover:inline">▼</span>
                </>
              )}
            </span>
          </div>

          {/* Dropdown subcategories */}
          {cat.subcategories && cat.subcategories.length > 0 && (
            <div className="absolute top-full mt-0 left-1/2 -translate-x-1/2 bg-white shadow-lg rounded-md p-2 hidden group-hover:flex flex-col gap-1 min-w-[160px] z-[999]">
              {cat.subcategories.map((sub, i) => (
                <span
                  key={i}
                  onClick={() => navigate(`/subcategory/${sub.id}`)}
                  className="text-sm text-gray-900 hover:text-black px-7 py-1 hover:bg-blue-100 cursor-pointer rounded"
                >
                  {sub.name}
                </span>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default CategoryBar;
