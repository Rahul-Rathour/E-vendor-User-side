import React, { useEffect, useState } from "react";
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
  user,
  phone,
  setPhone,
  setShippingDetails,
}) => {
  const [form, setForm] = useState({
    house: "",
    street: user?.shop_address || "",
    landmark: "",
    city: user?.city || "",
    state: user?.state || "",
    pincode: user?.pincode || "",
  });

  const states = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
    "Delhi",
    "Jammu & Kashmir",
    "Ladakh",
    "Chandigarh",
  ];

  const handleChange = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  useEffect(() => {
    const address = [
      `House No: ${form.house}`,
      `Street: ${form.street}`,
      `Landmark: ${form.landmark}`,
      `City: ${form.city}`,
      `State: ${form.state}`,
      `Pincode: ${form.pincode}`,
    ]
      .filter((item) => !item.endsWith(": "))
      .join(", ");

    setShippingAddress(address);

    setShippingDetails({
      house: form.house,
      street: form.street,
      landmark: form.landmark,
      city: form.city,
      state: form.state,
      pincode: form.pincode,
    });
  }, [form, setShippingAddress, setShippingDetails]);
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

            {/* <FiHome
              className="
                absolute
                left-5
                top-5
                text-[#D4AF37]
              "
              size={22}
            /> */}

            <div className="grid md:grid-cols-2 gap-5">

              {/* House */}

              <div>

                <label className="block mb-2 font-medium">
                  House No / Flat No *
                </label>

                <input
                  value={form.house}
                  onChange={(e) => handleChange("house", e.target.value)}
                  className="w-full h-12 border rounded-xl px-4"
                  placeholder="House No."
                />

              </div>

              {/* Street */}

              <div>

                <label className="block mb-2 font-medium">
                  Street / Area *
                </label>

                <input
                  value={form.street}
                  onChange={(e) => handleChange("street", e.target.value)}
                  className="w-full h-12 border rounded-xl px-4"
                  placeholder="Street / Area"
                />

              </div>

              {/* Landmark */}

              <div>

                <label className="block mb-2 font-medium">
                  Landmark
                </label>

                <input
                  value={form.landmark}
                  onChange={(e) => handleChange("landmark", e.target.value)}
                  className="w-full h-12 border rounded-xl px-4"
                  placeholder="Near..."
                />

              </div>

              {/* City */}

              <div>

                <label className="block mb-2 font-medium">
                  City *
                </label>

                <input
                  value={form.city}
                  onChange={(e) => handleChange("city", e.target.value)}
                  className="w-full h-12 border rounded-xl px-4"
                  placeholder="City"
                />

              </div>

              {/* State */}

              <div>

                <label className="block mb-2 font-medium">
                  State *
                </label>

                <select
                  value={form.state}
                  onChange={(e) => handleChange("state", e.target.value)}
                  className="w-full h-12 border rounded-xl px-4"
                >
                  <option value="">
                    Select State
                  </option>

                  {states.map((state) => (
                    <option
                      key={state}
                      value={state}
                    >
                      {state}
                    </option>
                  ))}

                </select>

              </div>

              {/* Pincode */}

              <div>

                <label className="block mb-2 font-medium">
                  Pincode *
                </label>

                <input
                  maxLength={6}
                  value={form.pincode}
                  onChange={(e) => handleChange("pincode", e.target.value.replace(/\D/g, ""))}
                  className="w-full h-12 border rounded-xl px-4"
                  placeholder="243003"
                />

              </div>

            </div>

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

        {/* Phone */}

        <div>
          <label className="block mb-2 font-medium">
            Phone Number *
          </label>

          <input
            type="text"
            maxLength={10}
            value={phone}
            onChange={(e) =>
              setPhone(e.target.value.replace(/\D/g, ""))
            }
            className="w-full h-12 border rounded-xl px-4"
            placeholder="9876543210"
          />
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