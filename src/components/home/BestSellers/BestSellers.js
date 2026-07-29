import React, { useEffect, useState } from "react";
import { FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";

import Product from "../Products/Product";
import api from "../../../api";

const BestSellers = () => {
  const [product_info, setProductInfo] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await api.get("/products/new-arrivals");

        if (res.data.status) {
          setProductInfo((res.data.data || []).slice(0, 4));
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, []);
  if (loading) {
    return (
      <section className="py-20 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 text-center">
          Loading Products...
        </div>
      </section>
    );
  }
  return (
    <section className="py-4 bg-white">

      <div className="max-w-[1400px] mx-auto px-6">
        <div className="text-center mb-16">

          <span className="uppercase tracking-[4px] text-[#C9A227] font-semibold text-sm">
            New Arrivals
          </span>

          <h2 className="text-4xl lg:text-5xl font-bold mt-3 text-[#111111]">
            Explore Our Collections
          </h2>

          <p className="text-gray-500 mt-5 max-w-2xl mx-auto">
            Browse premium apparel collections designed for comfort,
            durability and modern style.
          </p>
          <Link
            to="/shop"
            className="
            flex
            items-center
            gap-2
            text-[#111]
            font-semibold
            hover:text-[#C9A227]
            transition
        "
          >
            View All

            <FiArrowRight />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

          {product_info.map((item) => (

            <Product
              key={item.id}
              _id={item.id}
              img={`${process.env.REACT_APP_API_URL}/public/${item.image}`}
              productName={item.name}
              price={item.price}
              badge={true}
              badge_text="NEW"
              des={item.short_description}
            />

          ))}

        </div>
      </div>

    </section>
  );
};

export default BestSellers;