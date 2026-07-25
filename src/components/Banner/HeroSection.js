import React from "react";
import HeroLeft from "./HeroLeft";
import HeroRight from "./HeroRight";

const HeroSection = () => {
  return (
    <section className="relative bg-[#0A0A0A] overflow-hidden">

      {/* Background Overlay */}
      <div className="absolute inset-0 bg-black/55 z-10"></div>

      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('/images/hero-bg.jpg')",
        }}
      />

      {/* Main Content */}
      <div className="relative z-20 max-w-[1400px] mx-auto px-6 lg:px-8">

        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[650px]">

          {/* Left Content */}
          <HeroLeft />

          {/* Right Content */}
          <HeroRight />

        </div>

        {/* Bottom Feature Icons */}
        

      </div>

    </section>
  );
};

export default HeroSection;