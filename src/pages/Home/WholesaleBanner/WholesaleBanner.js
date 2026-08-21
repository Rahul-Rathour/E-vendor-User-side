import React from "react";
import { FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";

// Replace with your actual image
// import wholesaleBox from "../../../assets/images/wholesale-box.png";

const WholesaleBanner = () => {
  return (
    <section className="pb-12">
      <div className="max-w-[1400px] mx-auto px-6">

        <div
          className="
            bg-[#0F0F0F]
            rounded-xl
            overflow-hidden
          "
        >
          <div className="grid lg:grid-cols-[1.2fr_1.4fr_auto_260px] items-center">

            {/* Left */}

            <div className="px-10 py-10 border-r border-white/10">

              <h2 className="text-white text-2xl font-black uppercase leading-tight">
                LOOKING FOR
                <br />

                <span className="text-[#D4AF37]">
                  WHOLESALE?
                </span>

              </h2>

            </div>

            {/* Center */}

            <div className="px-10 py-10 border-r border-white/10">

              <p className="text-white leading-9 max-w-md">
                Join our dealer network and get exclusive
                wholesale prices and benefits.
              </p>

            </div>

            {/* Button */}

            <div className="px-10 flex justify-center">

              <a
                href="https://bulk.blackhewzen.com"
                className="
      inline-flex
      items-center
      gap-3
      bg-[#D4AF37]
      text-black
      font-semibold
      px-8
      py-4
      rounded-md
      hover:bg-white
      transition-all
    "
              >
                BECOME A DEALER

                <FiArrowRight />

              </a>

            </div>

            {/* Right Image */}

            <div className="flex justify-end h-full">

              <img
                src='abc.png'
                alt="Wholesale"
                className="
                  h-full
                  max-h-[220px]
                  object-contain
                "
              />

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default WholesaleBanner;