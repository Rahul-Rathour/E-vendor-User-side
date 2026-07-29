import React, { useEffect, useState } from "react";
import { FiHeart, FiEye, FiArrowRight, FiArrowLeft } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import api from "../../../api";

const RecommendedProducts = () => {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const res = await api.get("/products");

      if (Array.isArray(res.data)) {
        setProducts(res.data.slice(0, 4));
      } else if (res.data.data) {
        setProducts(res.data.data.slice(0, 4));
      }
    } catch (err) {
      console.log(err);
    }
  };

  const addToCart = (product) => {
    // We'll connect with your CartContext later
    console.log(product);
  };

  return (
    <section className="mt-14">

      {/* Heading */}

      <div className="flex justify-between items-center mb-7">

        <div className="flex items-center gap-2">

          <span className="text-[#D4AF37] text-xl">✦</span>

          <h2 className="text-3xl font-bold">
            YOU MAY ALSO LIKE
          </h2>

        </div>

        <button
          onClick={() => navigate("/shop")}
          className="flex items-center gap-2 text-[#D4AF37] font-medium hover:underline"
        >
          View All
          <FiArrowRight />
        </button>

      </div>

      <div className="relative">

        {/* Left Arrow */}

        <button
          className="
          hidden lg:flex
          absolute
          -left-6
          top-1/2
          -translate-y-1/2
          w-10
          h-10
          rounded-full
          border
          bg-white
          shadow
          items-center
          justify-center
        "
        >
          <FiArrowLeft />
        </button>

        {/* Products */}

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">

          {products.map((product) => (

            <div
              key={product.id}
              className="
              bg-white
              rounded-2xl
              border
              overflow-hidden
              hover:shadow-xl
              transition
            "
            >

              {/* Image */}

              <div className="relative">

                <img
                  src={
                    product.image
                      ? `${process.env.REACT_APP_API_URL}/public/${product.image}`
                      : "/placeholder.jpg"
                  }
                  alt={product.name}
                  className="
                  w-full
                  h-72
                  object-cover
                  cursor-pointer
                "
                  onClick={() =>
                    navigate(`/product/${product.id}`)
                  }
                />

                <button
                  className="
                  absolute
                  top-4
                  right-4
                  bg-white
                  rounded-full
                  w-10
                  h-10
                  flex
                  items-center
                  justify-center
                  shadow
                "
                >
                  <FiHeart />
                </button>

              </div>

              {/* Content */}

              <div className="p-4">

                <h3 className="font-semibold text-lg mb-2 line-clamp-2">
                  {product.name}
                </h3>

                <p className="text-[#D4AF37] font-bold text-xl mb-4">
                  ₹{Number(product.price).toFixed(2)}
                </p>

                <div className="flex gap-3">

                  <button
                    onClick={() => addToCart(product)}
                    className="
                    flex-1
                    border
                    border-[#D4AF37]
                    rounded-lg
                    py-3
                    text-[#D4AF37]
                    font-medium
                    hover:bg-[#D4AF37]
                    hover:text-white
                    transition
                  "
                  >
                    + Add to Cart
                  </button>

                  <button
                    onClick={() =>
                      navigate(`/product/${product.id}`)
                    }
                    className="
                    w-12
                    border
                    border-[#D4AF37]
                    rounded-lg
                    flex
                    items-center
                    justify-center
                    hover:bg-[#D4AF37]
                    hover:text-white
                    transition
                  "
                  >
                    <FiEye />
                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>

        {/* Right Arrow */}

        <button
          className="
          hidden lg:flex
          absolute
          -right-6
          top-1/2
          -translate-y-1/2
          w-10
          h-10
          rounded-full
          border
          bg-white
          shadow
          items-center
          justify-center
        "
        >
          <FiArrowRight />
        </button>

      </div>

    </section>
  );
};

export default RecommendedProducts;