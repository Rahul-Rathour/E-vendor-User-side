import React from "react";
import {
  FiTruck,
  FiShield,
  FiRefreshCw,
  FiHeadphones,
} from "react-icons/fi";

const CheckoutFeatures = () => {
  const features = [
    {
      icon: <FiTruck size={28} />,
      title: "Free Shipping",
      description: "Free delivery on orders above ₹999",
    },
    {
      icon: <FiShield size={28} />,
      title: "Secure Payments",
      description: "256-bit SSL encrypted payment gateway",
    },
    {
      icon: <FiRefreshCw size={28} />,
      title: "Easy Returns",
      description: "7-day hassle-free return policy",
    },
    {
      icon: <FiHeadphones size={28} />,
      title: "24×7 Support",
      description: "We're always here to help you",
    },
  ];

  return (
    <section className="mt-10">

      {/* Heading */}

      <div className="mb-5">

        <h2 className="text-2xl font-bold text-[#111111]">
          Why Shop With Us
        </h2>

        <p className="text-gray-500 mt-1">
          Enjoy a secure, fast and premium shopping experience.
        </p>

      </div>

      {/* Features */}

      <div
        className="
          bg-[#111111]
          rounded-2xl
          overflow-hidden
          border
          border-[#242424]
        "
      >

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4">

          {features.map((feature, index) => (

            <div
              key={index}
              className="
                p-7
                flex
                gap-5
                items-start
                border-[#242424]
                border-b
                sm:border-r
                last:border-r-0
                xl:border-b-0
                hover:bg-[#191919]
                transition-all
                duration-300
              "
            >

              {/* Icon */}

              <div
                className="
                  w-14
                  h-14
                  rounded-full
                  bg-[#D4AF37]
                  text-black
                  flex
                  items-center
                  justify-center
                  shrink-0
                "
              >
                {feature.icon}
              </div>

              {/* Content */}

              <div>

                <h3 className="text-white text-lg font-semibold">
                  {feature.title}
                </h3>

                <p className="text-gray-400 text-sm mt-2 leading-6">
                  {feature.description}
                </p>

              </div>

            </div>

          ))}

        </div>

      </div>

      {/* Bottom Trust Bar */}

      <div
        className="
          mt-6
          bg-white
          border
          rounded-2xl
          p-6
          shadow-sm
        "
      >

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

          <div>

            <h3 className="text-xl font-bold text-[#111]">
              Trusted by Thousands of Customers
            </h3>

            <p className="text-gray-500 mt-2">
              Every order is carefully packed and shipped with complete
              quality assurance and secure handling.
            </p>

          </div>

          <div className="flex flex-wrap gap-3">

            <span
              className="
                px-4
                py-2
                rounded-full
                bg-[#FFF7E8]
                text-[#B98B10]
                font-semibold
                text-sm
              "
            >
              Secure Checkout
            </span>

            <span
              className="
                px-4
                py-2
                rounded-full
                bg-[#FFF7E8]
                text-[#B98B10]
                font-semibold
                text-sm
              "
            >
              Fast Delivery
            </span>

            <span
              className="
                px-4
                py-2
                rounded-full
                bg-[#FFF7E8]
                text-[#B98B10]
                font-semibold
                text-sm
              "
            >
              Premium Quality
            </span>

          </div>

        </div>

      </div>

    </section>
  );
};

export default CheckoutFeatures;