import React from "react";
import {
  FiTruck,
  FiShield,
  FiRefreshCw,
  FiHeadphones,
} from "react-icons/fi";

const FeaturesStrip = () => {
  const features = [
    {
      icon: <FiTruck size={28} />,
      title: "Free Shipping",
      description: "Free shipping on all orders above ₹999",
    },
    {
      icon: <FiShield size={28} />,
      title: "Secure Payment",
      description: "100% secure online payment",
    },
    {
      icon: <FiRefreshCw size={28} />,
      title: "Easy Returns",
      description: "7 days return & replacement policy",
    },
    {
      icon: <FiHeadphones size={28} />,
      title: "24/7 Support",
      description: "Dedicated customer assistance",
    },
  ];

  return (
    <section className="mt-16 mb-10">

      <div
        className="
          bg-[#111111]
          rounded-2xl
          overflow-hidden
          border
          border-[#242424]
        "
      >

        <div
          className="
            grid
            grid-cols-2
            lg:grid-cols-4
          "
        >

          {features.map((item, index) => (
            <div
              key={index}
              className="
                flex
                items-center
                gap-4
                p-6
                border-[#242424]
                hover:bg-[#181818]
                transition-all
                duration-300
                border-b
                lg:border-b-0
                lg:border-r
                last:border-r-0
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
                {item.icon}
              </div>

              {/* Text */}

              <div>

                <h3
                  className="
                    text-white
                    font-semibold
                    text-lg
                  "
                >
                  {item.title}
                </h3>

                <p
                  className="
                    text-gray-400
                    text-sm
                    mt-1
                    leading-5
                  "
                >
                  {item.description}
                </p>

              </div>

            </div>
          ))}

        </div>

      </div>

    </section>
  );
};

export default FeaturesStrip;