import React from "react";
import {
  FiTrash2,
  FiPlus,
  FiMinus,
  FiChevronDown,
  FiChevronUp,
} from "react-icons/fi";

const CartItemCard = ({
  item,
  gstToggle,
  toggleGST,
  calculateGSTAmount,
  updateQuantity,
  removeFromCart,
  navigate,
}) => {
  const image =
    item.product.image
      ? `${process.env.REACT_APP_API_URL}/public/${item.product.image}`
      : "/placeholder.jpg";

  const gstAmount = calculateGSTAmount(item);

  const subtotal =
    item.product.price * item.quantity + gstAmount;

  return (
    <div className="bg-white border border-[#ECECEC] rounded-2xl shadow-sm overflow-hidden">

      {/* Desktop Header */}

      <div className="hidden lg:grid grid-cols-12 px-8 py-5 border-b bg-white text-sm font-semibold uppercase tracking-wide text-[#B98B10]">

        <div className="col-span-5">
          Product
        </div>

        <div className="col-span-2 text-center">
          Price
        </div>

        <div className="col-span-2 text-center">
          Quantity
        </div>

        <div className="col-span-3 text-right">
          Total
        </div>

      </div>

      {/* Item */}

      <div className="grid lg:grid-cols-12 gap-8 px-8 py-8">

        {/* Product */}

        <div className="lg:col-span-5 flex gap-5">

          <img
            src={image}
            alt={item.product.name}
            onClick={() =>
              navigate(`/product/${item.product.id}`)
            }
            className="w-28 h-36 rounded-xl object-cover cursor-pointer border"
          />

          <div className="flex flex-col">

            <h2 className="text-2xl font-semibold text-[#111]">
              {item.product.name}
            </h2>

            <div className="flex gap-2 mt-4 flex-wrap">

              <span className="bg-[#F6F6F6] rounded-md px-3 py-1 text-sm">
                Size :
                <span className="font-semibold ml-1">
                  {item.size || "N/A"}
                </span>
              </span>

              <span className="bg-[#F6F6F6] rounded-md px-3 py-1 text-sm">
                Color :
                <span
                  className="font-semibold ml-1"
                  style={{
                    color:
                      item.color?.color_code || "#000",
                  }}
                >
                  {item.color?.color_name}
                </span>
              </span>

            </div>

            {/* GST */}

            <button
              onClick={() => toggleGST(item.id)}
              className="mt-5 flex items-center gap-2 text-[#1E73BE] text-sm font-medium"
            >
              {gstToggle[item.id] ? (
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

            {gstToggle[item.id] && (

              <div className="mt-3 bg-[#F9F9F9] rounded-lg p-4 text-sm">

                <div className="flex justify-between">

                  <span>GST ({item.product.gst}%)</span>

                  <strong>
                    ₹{gstAmount.toFixed(2)}
                  </strong>

                </div>

              </div>

            )}

            <button
              onClick={() => removeFromCart(item.id)}
              className="mt-5 flex items-center gap-2 text-red-500 font-medium hover:text-red-600"
            >
              <FiTrash2 />

              Remove

            </button>

          </div>

        </div>

        {/* Price */}

        <div className="lg:col-span-2 flex lg:block items-center justify-between">

          <span className="lg:hidden font-medium">
            Price
          </span>

          <div>

            <p className="line-through text-gray-400">
              ₹{Number(item.product.mrp_price).toFixed(2)}
            </p>

            <h3 className="text-3xl font-bold text-[#D4AF37]">
              ₹{Number(item.product.price).toFixed(2)}
            </h3>

          </div>

        </div>

        {/* Quantity */}

        <div className="lg:col-span-2 flex lg:justify-center justify-between items-center">

          <span className="lg:hidden font-medium">
            Quantity
          </span>

          <div className="flex items-center border border-[#D4AF37] rounded-xl overflow-hidden h-[52px]">

            <button
              onClick={() =>
                updateQuantity(
                  item.id,
                  Math.max(1, item.quantity - 1)
                )
              }
              className="w-12 h-full flex items-center justify-center hover:bg-[#FFF8E8]"
            >
              <FiMinus />
            </button>

            <div className="w-12 text-center font-semibold">
              {item.quantity}
            </div>

            <button
              onClick={() =>
                updateQuantity(
                  item.id,
                  item.quantity + 1
                )
              }
              className="w-12 h-full flex items-center justify-center hover:bg-[#FFF8E8]"
            >
              <FiPlus />
            </button>

          </div>

        </div>

        {/* Total */}

        <div className="lg:col-span-3 flex lg:justify-end justify-between items-center">

          <span className="lg:hidden font-medium">
            Total
          </span>

          <h2 className="text-3xl font-bold text-[#111]">
            ₹{subtotal.toFixed(2)}
          </h2>

        </div>

      </div>

    </div>
  );
};

export default CartItemCard;