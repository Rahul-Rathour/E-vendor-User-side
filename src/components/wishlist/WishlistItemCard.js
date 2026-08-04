import React from "react";
import {
  FiTrash2,
  FiShoppingCart,
  FiEye,
  FiCheckCircle,
} from "react-icons/fi";

const WishlistItemCard = ({
  item,
  navigate,
  handleRemove,
  addToCart,
}) => {
  const image = item.image
    ? item.image
    : "/placeholder.jpg";

  return (
    <div
      className="
        bg-white
        border
        border-[#ECECEC]
        rounded-2xl
        shadow-sm
        overflow-hidden
        hover:shadow-lg
        transition-all
        duration-300
      "
    >
      {/* Desktop Header */}

      <div
        className="
          hidden
          lg:grid
          grid-cols-12
          px-8
          py-5
          border-b
          text-sm
          uppercase
          tracking-wide
          font-semibold
          text-[#B98B10]
        "
      >
        <div className="col-span-6">
          Product
        </div>

        <div className="col-span-2 text-center">
          Price
        </div>

        <div className="col-span-2 text-center">
          Status
        </div>

        <div className="col-span-2 text-right">
          Actions
        </div>
      </div>

      {/* Card */}

      <div className="grid lg:grid-cols-12 gap-8 px-8 py-8">

        {/* Product */}

        <div className="lg:col-span-6 flex gap-6">

          <img
            src={image}
            alt={item.name}
            onClick={() => navigate(`/product/${item.id}`)}
            className="
              w-32
              h-40
              rounded-xl
              object-cover
              border
              cursor-pointer
            "
          />

          <div className="flex flex-col justify-center">

            <h2
              className="
                text-2xl
                font-bold
                text-[#111]
                hover:text-[#D4AF37]
                cursor-pointer
                transition
              "
              onClick={() => navigate(`/product/${item.id}`)}
            >
              {item.name}
            </h2>

            <p className="text-gray-500 mt-2">
              Premium Collection
            </p>

            <div
              className="
                mt-5
                inline-flex
                items-center
                gap-2
                bg-green-50
                text-green-600
                px-4
                py-2
                rounded-full
                text-sm
                font-semibold
                w-fit
              "
            >
              <FiCheckCircle />

              In Stock
            </div>

          </div>

        </div>

        {/* Price */}

        <div
          className="
            lg:col-span-2
            flex
            lg:block
            justify-between
            items-center
          "
        >
          <span className="lg:hidden font-semibold">
            Price
          </span>

          <div>

            <p className="text-gray-400 line-through">
              ₹{Number(item.price * 1.2).toFixed(2)}
            </p>

            <h2
              className="
                text-3xl
                font-bold
                text-[#D4AF37]
              "
            >
              ₹{Number(item.price).toFixed(2)}
            </h2>

          </div>

        </div>

        {/* Status */}

        <div
          className="
            lg:col-span-2
            flex
            justify-between
            lg:justify-center
            items-center
          "
        >
          <span className="lg:hidden font-semibold">
            Status
          </span>

          <span
            className="
              bg-green-100
              text-green-700
              px-4
              py-2
              rounded-full
              text-sm
              font-semibold
            "
          >
            Available
          </span>

        </div>

        {/* Actions */}

        <div
          className="
            lg:col-span-2
            flex
            lg:justify-end
            justify-between
            items-center
            gap-3
          "
        >

          <button
            onClick={() => addToCart(item.id, item.price)}
            className="
              w-12
              h-12
              rounded-xl
              border
              border-[#D4AF37]
              flex
              items-center
              justify-center
              text-[#D4AF37]
              hover:bg-[#D4AF37]
              hover:text-white
              transition
            "
            title="Move to Cart"
          >
            <FiShoppingCart size={20} />
          </button>

          <button
            onClick={() => navigate(`/product/${item.id}`)}
            className="
              w-12
              h-12
              rounded-xl
              border
              border-gray-300
              flex
              items-center
              justify-center
              hover:bg-gray-100
              transition
            "
            title="View Product"
          >
            <FiEye size={20} />
          </button>

          <button
            onClick={() => handleRemove(item.id)}
            className="
              w-12
              h-12
              rounded-xl
              border
              border-red-200
              text-red-500
              flex
              items-center
              justify-center
              hover:bg-red-500
              hover:text-white
              transition
            "
            title="Remove"
          >
            <FiTrash2 size={20} />
          </button>

        </div>

      </div>

    </div>
  );
};

export default WishlistItemCard;