import React from "react";
import {
  FiHeart,
  FiShoppingCart,
  FiShield,
  FiTruck,
} from "react-icons/fi";

const WishlistSummaryCard = ({
  wishlistItems,
  addAllToCart,
  navigate,
}) => {
  const totalItems = wishlistItems.length;

  const totalValue = wishlistItems.reduce(
    (sum, item) => sum + Number(item.price),
    0
  );

  return (
    <div
      className="
        bg-white
        rounded-2xl
        border
        shadow-sm
        overflow-hidden
        sticky
        top-24
      "
    >
      {/* Header */}

      <div className="px-6 py-5 border-b">

        <h2 className="text-2xl font-bold">
          Wishlist Summary
        </h2>

      </div>

      {/* Body */}

      <div className="p-6 space-y-5">

        <div className="flex justify-between">

          <span className="text-gray-500">
            Saved Items
          </span>

          <span className="font-semibold">
            {totalItems}
          </span>

        </div>

        <div className="flex justify-between">

          <span className="text-gray-500">
            Estimated Value
          </span>

          <span className="font-semibold">
            ₹{totalValue.toFixed(2)}
          </span>

        </div>

        <hr />

        {/* Highlight */}

        <div
          className="
            bg-[#FFF8E8]
            border
            border-[#F3D98A]
            rounded-xl
            p-4
          "
        >

          <div className="flex gap-3">

            <FiHeart
              className="text-[#D4AF37] mt-1"
              size={20}
            />

            <div>

              <h4 className="font-semibold">
                Your Favorite Collection
              </h4>

              <p className="text-sm text-gray-600 mt-1">
                Save products here and purchase
                whenever you're ready.
              </p>

            </div>

          </div>

        </div>

        {/* Secure Shopping */}

        <div
          className="
            rounded-xl
            bg-gray-50
            p-4
            space-y-4
          "
        >

          <div className="flex gap-3">

            <FiShield
              className="text-[#D4AF37] mt-1"
              size={18}
            />

            <div>

              <h4 className="font-semibold">
                Secure Shopping
              </h4>

              <p className="text-sm text-gray-500">
                Shop with complete confidence.
              </p>

            </div>

          </div>

          <div className="flex gap-3">

            <FiTruck
              className="text-[#D4AF37] mt-1"
              size={18}
            />

            <div>

              <h4 className="font-semibold">
                Fast Delivery
              </h4>

              <p className="text-sm text-gray-500">
                Orders delivered across India.
              </p>

            </div>

          </div>

        </div>

        {/* Buttons */}

        <button
          onClick={addAllToCart}
          disabled={wishlistItems.length === 0}
          className="
            w-full
            py-4
            rounded-xl
            bg-[#D4AF37]
            text-black
            font-bold
            text-lg
            hover:bg-[#C79D22]
            transition
            flex
            justify-center
            items-center
            gap-3
            disabled:opacity-50
            disabled:cursor-not-allowed
          "
        >
          <FiShoppingCart />

          Move All To Cart
        </button>

        <button
          onClick={() => navigate("/shop")}
          className="
            w-full
            py-3
            rounded-xl
            border
            border-gray-300
            font-semibold
            hover:bg-gray-100
            transition
          "
        >
          Continue Shopping
        </button>

      </div>
    </div>
  );
};

export default WishlistSummaryCard;