import React from "react";
import { BsSuitHeartFill } from "react-icons/bs";
import { GiReturnArrow } from "react-icons/gi";
import { FaShoppingCart } from "react-icons/fa";
import { MdOutlineLabelImportant } from "react-icons/md";
import Image from "../../designLayouts/Image";
import Badge from "./Badge";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../redux/orebiSlice";
import { addToWishlist } from "../../../redux/orebiSlice";

const Product = (props) => {
  const dispatch = useDispatch();
  const _id = props.productName;
  const idString = (_id) => {
    return String(_id).toLowerCase().split(" ").join("");
  };
  const rootId = idString(_id);

  const navigate = useNavigate();
  const productItem = props;
  const handleProductDetails = () => {
    navigate(`/product/${rootId}`, {
      state: {
        item: productItem,
      },
    });
  };
  return (
    <div className="w-full relative group">
      <div className="max-w-80 max-h-80 relative overflow-y-hidden ">
        <div>
          <Image className="w-full h-full" imgSrc={props.img} />
        </div>
        <div className="absolute top-6 left-8">
          {props.badge && <Badge text="New" />}
        </div>
        <div className="w-full h-32 absolute -bottom-[130px] group-hover:bottom-0 duration-700 flex items-center justify-center">
          <ul className="flex items-center justify-center gap-4 font-titleFont">
            <li
             className="w-12 h-12 flex items-center justify-center rounded-full bg-white text-[#9F2B68] hover:bg-[#9F2B68] hover:text-white shadow-md hover:shadow-lg duration-300 cursor-pointer text-2xl"
title="Compare">

              <GiReturnArrow />
            </li>
            <li
              onClick={() =>
                dispatch(
                  addToCart({
                    _id: props._id,
                    name: props.productName,
                    quantity: 1,
                    image: props.img,
                    badge: props.badge,
                    price: props.price,
                    colors: props.color,
                  })
                )
              }
              className="w-12 h-12 flex items-center justify-center rounded-full bg-white text-[#9F2B68] hover:bg-[#9F2B68] hover:text-white shadow-md hover:shadow-lg duration-300 cursor-pointer text-2xl"
              title="Add to Cart"
            >
              <FaShoppingCart />
            </li>
            <li
              onClick={handleProductDetails}
              className="w-12 h-12 flex items-center justify-center rounded-full bg-white text-[#9F2B68] hover:bg-[#9F2B68] hover:text-white shadow-md hover:shadow-lg duration-300 cursor-pointer text-2xl"
              title="View Details"
            >
              <MdOutlineLabelImportant />
            </li>
            <li
  onClick={() =>
    dispatch(
      addToWishlist({
        _id: props._id,
        name: props.productName,
        image: props.img,
        badge: props.badge,
        price: props.price,
        colors: props.color,
      })
    )
  }
  className="w-12 h-12 flex items-center justify-center rounded-full bg-white text-[#9F2B68] hover:bg-[#9F2B68] hover:text-white shadow-md hover:shadow-lg duration-300 cursor-pointer text-2xl"
  title="Add to Wishlist"
>
  <BsSuitHeartFill />
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
