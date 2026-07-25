import React from "react";
import { logo, logoLight } from "../../assets/images";

const HeroRight = () => {
  return (
    <div className="relative hidden lg:flex items-end justify-end h-full">

      {/* Model */}

      <img
        src={logoLight}
        alt="Black Hewzen Model"
        className="
          relative
          z-20
          h-[620px]
          object-contain
          select-none
        "
        draggable={false}
      />

      {/* Right Info */}

      <div
        className="
          absolute
          right-0
          top-16
          z-30
          flex
          flex-col
          items-center
          text-center
        "
      >
        {/* Logo */}

        <img
          src={logo}
          alt="Black Hewzen"
          className="w-20 mb-4"
        />

        <h3 className="text-white font-bold text-2xl uppercase tracking-wide">
          Black Hewzen
        </h3>

        <p className="text-gray-300 text-xs uppercase tracking-widest mb-10">
          Apparel Pvt. Ltd.
        </p>

        {/* Statistics */}

        <div className="space-y-8">

          <div>
            <h2 className="text-[#D4AF37] text-4xl font-bold">
              10,000+
            </h2>

            <p className="text-white text-lg">
              Happy Customers
            </p>
          </div>

          <div>
            <h2 className="text-[#D4AF37] text-4xl font-bold">
              500+
            </h2>

            <p className="text-white text-lg">
              Wholesale Dealers
            </p>
          </div>

          <div>
            <h2 className="text-[#D4AF37] text-4xl font-bold">
              100%
            </h2>

            <p className="text-white text-lg">
              Quality Assured
            </p>
          </div>

        </div>

      </div>

    </div>
  );
};

export default HeroRight;