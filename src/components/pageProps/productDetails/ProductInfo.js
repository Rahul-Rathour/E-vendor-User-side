import React from "react";
import { useCart } from "../../../context/CartContext";

const ProductInfo = ({
  productInfo,
  selectedColor,
  setSelectedColor,
  selectedSize,
  setSelectedSize,
  availableSizes,
}) => {
  const { addToCart } = useCart();
  const handleShare = async () => {
  const productUrl = `https://blackhewzen.com/product/${productInfo.id}`;

  if (navigator.share) {
    try {
      await navigator.share({
        title: productInfo.name,
        text: `Check out this product: ${productInfo.name}`,
        url: productUrl,
      });
    } catch (err) {
      console.log("Share cancelled", err);
    }
  } else {
    try { 
      await navigator.clipboard.writeText(productUrl);
      alert("Product link copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy link", err);
    }
  }
};

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl font-semibold uppercase">{productInfo.name}</h1>
      <p className="text-2xl font-bold text-brandColor">₹ {productInfo.price}</p>

      <div dangerouslySetInnerHTML={{ __html: productInfo.description }} />

      {/* Colors */}
      <div>
        <p className="font-medium mb-2">Color: {selectedColor?.color_name}</p>
        <div className="flex flex-wrap gap-3">
          {productInfo.colors.map((color) => (
            <button
              key={color.id}
              onClick={() => setSelectedColor(color)}
              className={`w-10 h-10 rounded-full border-2 transition-all ${selectedColor?.id === color.id
                ? "border-black scale-110"
                : "border-gray-300"
                }`}
              style={{ backgroundColor: color.color_code }}
              title={color.color_name}
            />
          ))}
        </div>
      </div>

      {/* Sizes */}
      <div>
        <p className="font-medium mb-2">Size</p>
        <div className="flex flex-wrap gap-3">
          {availableSizes.map((size) => (
            <button
              key={size.id}
              onClick={() => setSelectedSize(size)}
              className={`px-5 py-2 border rounded-xl font-medium transition-all ${selectedSize?.id === size.id
                ? "bg-black text-white border-black"
                : "border-gray-400 hover:border-black"
                }`}
            >
              {size.size} 
              {/* ({size.qty}) */}
            </button>
          ))} 
        </div>
        {availableSizes.length === 0 && (
          <p className="text-red-500 text-sm">No sizes available for this color</p> 
        )}
      </div>

      <button
        onClick={() =>
          addToCart(
            productInfo.id,
            productInfo.price,
            productInfo.gst,
            selectedColor?.id,
            selectedSize?.size
          )
        }
        disabled={!selectedSize}
        className="w-full py-4 bg-brandColor hover:bg-black disabled:bg-gray-400 text-white text-lg font-semibold rounded-xl mt-4"
      >
        {selectedSize ? "Add to Cart" : "Select Size"}
      </button>

      <button
        onClick={handleShare}
        className="w-full py-4 border-2 border-brandColor text-brandColor hover:bg-brandColor hover:text-white transition-all text-lg font-semibold rounded-xl"
      >
        Share Product
      </button>
    </div>
  );
};

export default ProductInfo;