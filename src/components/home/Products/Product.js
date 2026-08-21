import React, { useState } from "react";
import { BsSuitHeart, BsSuitHeartFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../../context/CartContext";
import { toast } from "react-toastify";
import api from "../../../api";
import Badge from "./Badge";

const Product = (props) => {
  const navigate = useNavigate();

  const { addToCart } = useCart();

  const [activeWishlist, setActiveWishlist] = useState([]);

  const productItem = props;

  const handleProductDetails = () => {
    navigate(`/product/${props._id}`, {
      state: { product: productItem },
    });
  };

  const handleAddToWishlist = async (productId) => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      toast.warning("Please login to add to wishlist");
      return;
    }

    try {
      const res = await api.post("/wishlist", {
        user_id: user.id,
        product_id: productId,
      });

      if (res.data.status) {
        toast.success(res.data.message);

        setActiveWishlist((prev) =>
          prev.includes(productId)
            ? prev
            : [...prev, productId]
        );
      } else {
        toast.info(res.data.message);

        setActiveWishlist((prev) =>
          prev.includes(productId)
            ? prev
            : [...prev, productId]
        );
      }
    } catch (err) {
      toast.error("Unable to add wishlist");
    }
  };

  return (

    <div
      className="
        group
        cursor-pointer
        bg-white
        rounded-xl
        overflow-hidden
        transition-all
        duration-300
        hover:shadow-xl
    "
    >
      <div
        className="
        relative
        overflow-hidden
        bg-[#F8F8F8]
        rounded-xl
    "
      >
        {props.badge && (

          <div className="absolute top-4 left-4 z-20">

            <Badge text={props.badge_text} />

          </div>

        )}
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleAddToWishlist(props._id);
          }}
          className="
        absolute
        top-4
        right-4
        z-20
        w-10
        h-10
        rounded-full
        bg-white
        shadow-md
        flex
        items-center
        justify-center
        transition-all
        duration-300
        hover:scale-110
    "
        >

          {
            activeWishlist.includes(props._id)

              ?

              <BsSuitHeartFill
                className="text-red-500 text-lg"
              />

              :

              <BsSuitHeart
                className="text-gray-500 text-lg"
              />

          }

        </button>
        <img
          src={props.img}
          alt={props.productName}
          onClick={handleProductDetails}
          className="
        w-full
        h-[300px]
        object-cover
        transition-transform
        duration-500
        group-hover:scale-110
    "
        />
      </div>
      {/* Product Info */}
      <div
        className="p-5"
        onClick={handleProductDetails}
      >
        {/* Color Options */}
        <div className="flex items-center gap-2 mb-4">
          <span className="w-3 h-3 rounded-full bg-black border border-gray-300"></span>
          <span className="w-3 h-3 rounded-full bg-gray-500 border border-gray-300"></span>
          <span className="w-3 h-3 rounded-full bg-[#D4AF37] border border-gray-300"></span>
        </div>

        {/* Product Name */}
        <h3
          className="
            text-[16px]
            font-semibold
            text-gray-900
            leading-6
            line-clamp-2
            min-h-[52px]
            hover:text-[#D4AF37]
            transition-colors
            duration-300
          "
        >
          {props.productName}
        </h3>

        {/* Price */}
        <div className="flex items-center justify-between mt-3">

          <span className="text-xl font-bold text-black">
            ₹ {props.price}
          </span>

          <button
            onClick={(e) => {
              e.stopPropagation();
              addToCart(props._id, props.price);
            }}
            className="
              opacity-0
              group-hover:opacity-100
              transition-all
              duration-300
              bg-black
              hover:bg-[#D4AF37]
              hover:text-black
              text-white
              px-2
              py-2
              rounded-md
              text-sm
              font-medium
            "
          >
            Add
          </button>

        </div>

      </div>

    </div>
  );
};

export default Product;