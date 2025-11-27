import React, { useState } from "react";
import { BsSuitHeart, BsSuitHeartFill } from "react-icons/bs";
import { GiReturnArrow } from "react-icons/gi";
import { FaShoppingCart } from "react-icons/fa";
import { MdOutlineLabelImportant } from "react-icons/md";
import Image from "../../designLayouts/Image";
import Badge from "./Badge";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useCart } from "../../../context/CartContext";
import { toast } from "react-toastify";
import api from "../../../api";
// import { addToCart } from "../../../redux/orebiSlice";
// import { addToWishlist } from "../../../redux/orebiSlice";

const Product = (props) => {
  const [activeWishlist, setActiveWishlist] = useState([]); // store highlighted product ID
  const { addToCart } = useCart();
  const dispatch = useDispatch();
  const _id = props.productName;
  const idString = (_id) => {
    return String(_id).toLowerCase().split(" ").join("");
  };
  const rootId = idString(_id);

  const navigate = useNavigate();
  const productItem = props;
  const handleProductDetails = () => {
    navigate(`/product/${props._id}`, {
    state: { product: productItem },
    });
  };
  //  Handle Add to Wishlist
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
        toast.success(res.data.message || "Added to wishlist ❤️");
        // ✅ Add this productId to wishlistItems if not already there
        setActiveWishlist((prev) => [...prev, productId]);
      } else {
        toast.info(res.data.message || "Already in wishlist");
        // ✅ Still highlight it even if already in wishlist
        setActiveWishlist((prev) =>
          prev.includes(productId) ? prev : [...prev, productId]
        );
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong while adding to wishlist");
    }
  }

  return (
    <div className="w-full relative group">
      <div className="max-w-80 max-h-80 relative overflow-y-hidden ">
        <div onClick={handleProductDetails} className="cursor-pointer">
          <Image className="w-full h-full" imgSrc={props.img} />
        </div>
        <div className="absolute top-6 left-8"> 
          {props.badge && <Badge text="New" />} 
        </div>
        <div className="w-full h-32 absolute -bottom-[130px] group-hover:bottom-0 duration-700 flex items-center justify-center">
          <ul className="flex items-center justify-center gap-4 font-titleFont">
            <li
              className="w-12 h-12 flex items-center justify-center rounded-full bg-white text-brandColor hover:bg-brandColor hover:text-white shadow-md hover:shadow-lg duration-300 cursor-pointer text-2xl"
              title="Compare">

              <GiReturnArrow />
            </li>
            <li
              onClick={() => addToCart(props._id, props.price)}
              className="flex items-center justify-center w-10 h-10 rounded-full bg-white text-brandColor hover:bg-brandColor hover:text-white text-xl shadow-md hover:shadow-lg cursor-pointer"
            >
              <FaShoppingCart />
            </li>
            <li
              onClick={handleProductDetails}
              className="w-12 h-12 flex items-center justify-center rounded-full bg-white text-brandColor hover:bg-brandColor hover:text-white shadow-md hover:shadow-lg duration-300 cursor-pointer text-2xl"
              title="View Details"
            >
              <MdOutlineLabelImportant />
            </li>
            <li
              onClick={() => handleAddToWishlist(props._id)}
              className={`flex items-center justify-center w-10 h-10 rounded-full bg-white text-xl shadow-md hover:shadow-lg cursor-pointer transition-all duration-300 ${activeWishlist.includes(props._id)
                ? "text-brandColor"
                : "text-gray-400 hover:text-brandColor"
                }`}
            >
              {activeWishlist.includes(props._id) ? (
                <BsSuitHeartFill />
              ) : (
                <BsSuitHeart />
              )}
            </li>

          </ul>
        </div>
      </div>
      <div className="max-w-80 py-6 flex flex-col gap-1 border-[1px] border-t-0 px-4">
        <div className="flex items-center justify-between font-titleFont">
          <h2 className="text-lg text-primeColor font-bold">
            {props.productName}
          </h2>
          <p className="text-[#767676] text-[14px]"> ₹ {props.price}</p>
        </div>
        <div>
          <p className="text-[#767676] text-[14px]">{props.color}</p>
        </div>
      </div>
    </div>
  );
};

export default Product;
