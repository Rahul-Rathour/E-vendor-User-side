import React from "react";
import {
  FiMapPin,
  FiHome,
  FiFileText,
} from "react-icons/fi";

const ShippingAddressCard = ({
  shippingAddress,
  setShippingAddress,
  usergst,
  setUsergst,
}) => {
  return (
    <div
      className="
        bg-white
        rounded-2xl
        border
        border-[#ECECEC]
        shadow-sm
        overflow-hidden
      "
    >
      {/* Header */}

      <div className="px-6 py-5 border-b">

        <div className="flex items-center gap-3">

          <div
            className="
              w-12
              h-12
              rounded-full
              bg-[#FFF7E8]
              flex
              items-center
              justify-center
            "
          >
            <FiMapPin
              className="text-[#D4AF37]"
              size={22}
            />
          </div>

          <div>

            <h2 className="text-2xl font-bold text-[#111]">
              Shipping Address
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Please enter your complete delivery address.
            </p>

          </div>

        </div>

      </div>

      {/* Form */}

      <div className="p-6 space-y-8">

        {/* Shipping Address */}

        <div>

          <label className="block text-sm font-semibold text-[#222] mb-3">

            Delivery Address
            <span className="text-red-500 ml-1">*</span>

          </label>

          <div className="relative">

            <FiHome
              className="
                absolute
                left-5
                top-5
                text-[#D4AF37]
              "
              size={22}
            />

            <textarea
              rows={6}
              value={shippingAddress}
              onChange={(e) =>
                setShippingAddress(e.target.value)
              }
              placeholder="House No, Street, Area, City, State, Pincode..."
              className="
                w-full
                pl-14
                pr-5
                py-5
                rounded-2xl
                border
                border-[#E5E5E5]
                resize-none
                outline-none
                transition-all
                duration-300
                focus:border-[#D4AF37]
                focus:ring-4
                focus:ring-[#D4AF37]/20
              "
            />

          </div>

        </div>

        {/* GST */}

        <div>

          <label className="block text-sm font-semibold text-[#222] mb-3">

            GST Number
            <span className="text-gray-400 ml-2 font-normal">
              (Optional)
            </span>

          </label>

          <div className="relative">

            <FiFileText
              className="
                absolute
                left-5
                top-1/2
                -translate-y-1/2
                text-[#D4AF37]
              "
              size={20}
            />

            <input
              type="text"
              value={usergst}
              onChange={(e) =>
                setUsergst(e.target.value)
              }
              placeholder="Enter GST Number"
              className="
                w-full
                h-14
                pl-14
                pr-5
                rounded-2xl
                border
                border-[#E5E5E5]
                outline-none
                transition-all
                duration-300
                focus:border-[#D4AF37]
                focus:ring-4
                focus:ring-[#D4AF37]/20
              "
            />

          </div>

        </div>

        {/* Info Box */}

        <div
          className="
            bg-[#FFF9EA]
            border
            border-[#F1DE9C]
            rounded-2xl
            p-5
          "
        >

          <h4 className="font-semibold text-[#111] mb-2">
            Delivery Information
          </h4>

          <ul className="space-y-2 text-sm text-gray-600">

            <li>
              • Please provide a complete address for faster delivery.
            </li>

            <li>
              • Include Landmark and Pincode wherever possible.
            </li>

            <li>
              • GST Number is required only for business invoices.
            </li>

          </ul>

        </div>

      </div>
    </div>
  );
};

export default ShippingAddressCard;