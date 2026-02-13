import React, { useEffect, useState } from "react";
import { ImPlus } from "react-icons/im";
import NavTitle from "./NavTitle";
import { useNavigate } from "react-router-dom";
import api from "../../../../api";

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [openCatId, setOpenCatId] = useState(null);
  const [showCategories, setShowCategories] = useState(true);
  const navigate = useNavigate();

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await api.get("/categories");
        setCategories(res.data.data || []);
      } catch (err) {
        console.error("Category fetch error:", err);
      }
    };

    fetchCategories();
  }, []);

  const toggleDropdown = (id) => {
    setOpenCatId(openCatId === id ? null : id);
  };

  return (
    <div className="w-full">
      {/* SAME AS COLOR COMPONENT */}
      <div onClick={() => setShowCategories(!showCategories)} className="cursor-pointer">
        <NavTitle title="Shop by Category" icons={true} />
      </div>

      {showCategories && (
        <ul className="flex flex-col gap-4 text-sm lg:text-base text-[#767676]">
          {categories.map((cat) => (
            <li
              key={cat.id}
              className="border-b-[1px] border-b-[#F0F0F0] pb-2"
            >
              <div className="flex items-center justify-between">
                <span
                  onClick={() => navigate(`/category/${cat.id}`)}
                  className="cursor-pointer hover:text-black duration-200"
                >
                  {cat.name}
                </span>

                {cat.subcategories?.length > 0 && (
                  <span
                    onClick={() => toggleDropdown(cat.id)}
                    className="text-[10px] lg:text-xs cursor-pointer text-gray-400 hover:text-primeColor duration-300"
                  >
                    <ImPlus />
                  </span>
                )}
              </div>

              {openCatId === cat.id && cat.subcategories?.length > 0 && (
                <ul className="ml-4 mt-2 flex flex-col gap-2">
                  {cat.subcategories.map((sub) => (
                    <li
                      key={sub.id}
                      onClick={() => navigate(`/subcategory/${sub.id}`)}
                      className="cursor-pointer hover:text-black text-[13px] text-gray-600 duration-200"
                    >
                      {sub.name}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Category;
