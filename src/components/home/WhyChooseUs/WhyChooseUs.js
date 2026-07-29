import React from "react";
import { Link } from "react-router-dom";
import {
  FiShield,
  FiTruck,
  FiAward,
  FiRefreshCcw,
} from "react-icons/fi";

const WhyChooseUs = () => {
  const features = [
    {
      icon: <FiAward size={34} />,
      title: "PREMIUM QUALITY FABRIC",
      desc: "We never compromise on quality.",
    },
    {
      icon: <FiShield size={34} />,
      title: "MADE IN INDIA",
      desc: "Proudly manufactured in India.",
    },
    {
      icon: <FiTruck size={34} />,
      title: "FAST DELIVERY",
      desc: "On-time delivery across India.",
    },
    {
      icon: <FiRefreshCcw size={34} />,
      title: "EASY RETURNS",
      desc: "Hassle free returns & exchange.",
    },
  ];

  return (
    <section className="py-12 bg-white">

      <div className="max-w-[1400px] mx-auto px-6">

        <div className="grid lg:grid-cols-[320px_1fr] gap-8 items-stretch">

          {/* Left Side */}

          <div className="flex flex-col justify-center">

            <h2 className="text-[24px] font-black uppercase leading-tight">
              WHY CHOOSE
              <br />
              BLACK HEWZEN?
            </h2>

            <p className="text-gray-500 text-[14px] leading-7 mt-5">
              We are committed to providing our customers
              with the best quality products, competitive
              prices and excellent service.
            </p>

            <Link
              to="/about"
              className="
                mt-8
                inline-flex
                items-center
                justify-center
                bg-[#D4AF37]
                hover:bg-black
                hover:text-white
                text-black
                font-semibold
                px-7
                py-3
                rounded
                w-fit
                transition
              "
            >
              KNOW MORE ABOUT US
            </Link>

          </div>

          {/* Right Side */}

          <div className="bg-white border rounded-xl grid grid-cols-2 lg:grid-cols-4 overflow-hidden">

            {features.map((item, index) => (

              <div
                key={index}
                className="
                  p-8
                  border-r
                  border-b
                  lg:border-b-0
                  last:border-r-0
                  flex
                  flex-col
                "
              >

                <div className="text-[#D4AF37] mb-5">
                  {item.icon}
                </div>

                <h3 className="font-bold uppercase text-sm">
                  {item.title}
                </h3>

                <p className="text-gray-500 text-sm mt-3 leading-6">
                  {item.desc}
                </p>

              </div>

            ))}

          </div>

        </div>

      </div>

    </section>
  );
};

export default WhyChooseUs;