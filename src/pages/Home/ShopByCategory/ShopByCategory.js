import React, { useEffect, useState } from "react";
import api from "../../../api";
import CategoryCard from "./CategoryCard";

const ShopByCategory = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => { 
      try {
        const res = await api.get("/categories");

        if (res.data.data) {
          // Client design shows only 4 categories
          setCategories(res.data.data.slice(0, 4));
        }
      } catch (err) {
        console.error("Error fetching categories:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return (
      <section className="py-20">
        <div className="max-w-[1400px] mx-auto px-6 text-center">
          Loading Categories...
        </div>
      </section>
    );
  }
  return (
    <section className="py-2 bg-white">

      <div className="max-w-[1400px] mx-auto px-6">

        {/* Heading */}

        <div className="text-center mb-16">

          <span className="uppercase tracking-[4px] text-[#C9A227] font-semibold text-sm">
            Shop By Category
          </span>

          <h2 className="text-4xl lg:text-5xl font-bold mt-3 text-[#111111]">
            Explore Our Collections
          </h2>

          <p className="text-gray-500 mt-5 max-w-2xl mx-auto">
            Browse premium apparel collections designed for comfort,
            durability and modern style.
          </p>

        </div>

        {/* Category Grid */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {categories.map((category) => (

            <CategoryCard
              key={category.id}
              id={category.id}
              title={category.name}
              image={category.image}
            />

          ))}

        </div>

      </div>

    </section>
  );
};

export default ShopByCategory;