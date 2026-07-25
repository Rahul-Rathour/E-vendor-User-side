import React from "react";
import {
  FiShield,
  FiTruck,
  FiAward,
  FiHeadphones,
} from "react-icons/fi";
import { MdVerified } from "react-icons/md";

const FloatingInfoBar = () => {
  const items = [
    {
      icon: <MdVerified size={28} />,
      title: "GST Registered",
      subtitle: "Trusted Manufacturer",
    },
    {
      icon: <FiShield size={28} />,
      title: "Secure Payment",
      subtitle: "100% Safe Checkout",
    },
    {
      icon: <FiAward size={28} />,
      title: "Premium Quality",
      subtitle: "Finest Materials",
    },
    {
      icon: <FiTruck size={28} />,
      title: "Pan India Shipping",
      subtitle: "Fast Delivery",
    },
    {
      icon: <FiHeadphones size={28} />,
      title: "24/7 Support",
      subtitle: "Always Available",
    },
  ];

  return (
    <section className="relative z-30 -mt-8 lg:-mt-10 mb-16">
      <div className="max-w-[1400px] mx-auto px-4 lg:px-8">

        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5">

            {items.map((item, index) => (
              <div
                key={index}
                className={`
                  flex
                  items-center
                  gap-4
                  px-6
                  py-7
                  transition-all
                  duration-300
                  hover:bg-[#F8F8F8]
                  ${
                    index !== items.length - 1
                      ? "border-b sm:border-r lg:border-b-0 border-gray-200"
                      : ""
                  }
                `}
              >
                <div className="text-[#D4AF37] flex-shrink-0">
                  {item.icon}
                </div>

                <div>
                  <h4 className="text-black font-semibold text-base">
                    {item.title}
                  </h4>

                  <p className="text-gray-500 text-sm mt-1">
                    {item.subtitle}
                  </p>
                </div>
              </div>
            ))}

          </div>

        </div>

      </div>
    </section>
  );
};

export default FloatingInfoBar;