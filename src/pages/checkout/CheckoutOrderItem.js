import React, { useState } from "react";
import {
  FiChevronDown,
  FiChevronUp,
  FiCheckCircle,
} from "react-icons/fi";

const CheckoutOrderItem = ({ item }) => {
  const [showGST, setShowGST] = useState(false);

  const image = item.product.image
    ? `${process.env.REACT_APP_API_URL}/public/${item.product.image}`
    : "/placeholder.jpg";

  const subtotal = item.product.price * item.quantity;

  const gstAmount =
    (subtotal * Number(item.product.gst || 0)) / 100;

  const total = subtotal + gstAmount;

  return (
    <div
      className="
        bg-white
        border
        border-[#ECECEC]
        rounded-2xl
        p-6
        shadow-sm
        hover:shadow-md
        transition-all
      "
    >
      <div className="flex flex-col lg:flex-row gap-6">

        {/* Product Image */}

        <div className="w-full lg:w-[160px] flex justify-center">

          <img
            src={image}
            alt={item.product.name}
            className="
              w-36
              h-44
              object-cover
              rounded-2xl
              border
            "
          />

        </div>

        {/* Product Details */}

        <div className="flex-1">

          {/* Product Name */}

          <h2 className="text-2xl font-bold text-[#111111]">
            {item.product.name}
          </h2>

          {/* Attributes */}

          <div className="flex flex-wrap gap-3 mt-4">

            <div className="px-4 py-2 bg-[#F8F8F8] rounded-lg text-sm">

              Size :
              <span className="font-semibold ml-2">
                {item.size || "N/A"}
              </span>

            </div>

            <div className="px-4 py-2 bg-[#F8F8F8] rounded-lg text-sm flex items-center">

              Color :

              <span
                className="ml-2 font-semibold"
                style={{
                  color:
                    item.color?.color_code || "#000",
                }}
              >
                {item.color?.color_name || "N/A"}
              </span>

            </div>

          </div>

          {/* Quantity */}

          <div className="mt-5 flex items-center gap-3">

            <span className="text-gray-500">
              Quantity
            </span>

            <span
              className="
                w-12
                h-12
                rounded-full
                bg-[#FFF7E8]
                border
                border-[#D4AF37]
                flex
                items-center
                justify-center
                font-bold
                text-[#111]
              "
            >
              {item.quantity}
            </span>

          </div>

          {/* GST */}

          <button
            onClick={() => setShowGST(!showGST)}
            className="
              mt-5
              flex
              items-center
              gap-2
              text-[#D4AF37]
              font-medium
            "
          >
            {showGST ? (
              <>
                <FiChevronUp />
                Hide GST Details
              </>
            ) : (
              <>
                <FiChevronDown />
                Show GST Details
              </>
            )}
          </button>

          {showGST && (

            <div
              className="
                mt-4
                bg-[#FAFAFA]
                border
                rounded-xl
                p-4
              "
            >

              <div className="flex justify-between">

                <span>
                  GST ({item.product.gst}%)
                </span>

                <strong>
                  ₹{gstAmount.toFixed(2)}
                </strong>

              </div>

            </div>

          )}

          {/* Delivery */}

          <div className="mt-5 flex items-center gap-2 text-green-600">

            <FiCheckCircle />

            <span className="text-sm font-medium">
              Eligible for Fast Delivery
            </span>

          </div>

        </div>

        {/* Price */}

        <div
          className="
            lg:w-[220px]
            flex
            flex-col
            lg:items-end
            justify-between
          "
        >

          <div>

            <p className="text-gray-400 line-through text-lg">
              ₹{Number(item.product.price).toFixed(2)}
            </p>

            <h2 className="text-4xl font-bold text-[#D4AF37] mt-1">
              ₹{Number(item.product.price).toFixed(2)}
            </h2>

          </div>

          <div className="mt-8 lg:text-right">

            <p className="text-gray-500 text-sm">
              Item Total
            </p>

            <h3 className="text-3xl font-bold text-[#111]">
              ₹{total.toFixed(2)}
            </h3>

          </div>

        </div>

      </div>
    </div>
  );
};

export default CheckoutOrderItem;