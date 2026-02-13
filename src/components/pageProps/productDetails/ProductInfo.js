import React from "react";
import { useDispatch } from "react-redux";
import { useCart } from "../../../context/CartContext";

const ProductInfo = ({ productInfo }) => {
  const { addToCart } = useCart();
  const dispatch = useDispatch();

  const shareProduct = (product) => {
    const shareUrl = `${window.location.origin}/product/${product.id}`;

    if (navigator.share) {
      navigator
        .share({
          title: product.name,
          text: "Check out this product!",
          url: shareUrl,
        })
        .catch((err) => console.log("Share canceled", err));
    } else {
      navigator.clipboard.writeText(shareUrl);
      alert("Link copied to clipboard!");
    }
  };

  return (
    <div className="flex flex-col gap-5">
      <h6 className="text-2xl font-semibold text-brandColor">{productInfo.name}</h6>
      <p className="text-xl font-semibold">₹ {productInfo.price}</p>
      <p className="text-xl font-semibold">About this item</p>
      <p className="text-base text-brandColor">{productInfo.description}</p>
      <p className="text-sm">Be the first to leave a review.</p>
      <p className="font-medium text-lg">
        <span className="font-normal">Colors:</span> {productInfo.color}
      </p>

      <button
        onClick={() => addToCart(productInfo.id, productInfo.price)}
        className="w-full py-4 bg-brandColor hover:bg-black duration-300 text-white text-lg font-titleFont"
      >
        Add to Cart
      </button>

      {/* SHARE BUTTON */}
      <button
        onClick={() => shareProduct(productInfo)}
        className="w-full py-3 border border-brandColor text-brandColor hover:bg-brandColor hover:text-white duration-300 text-lg font-titleFont"
      >
        Share Product
      </button>

      <p className="font-normal text-sm">
        <span className="text-base font-medium">Categories:</span> Spring
        collection, Streetwear, Women Tags: featured SKU: N/A
      </p>
    </div>
  );
};

export default ProductInfo;
