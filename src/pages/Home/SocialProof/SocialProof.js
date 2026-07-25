import React from "react";
import TestimonialCard from "./TestimonialCard";
// import InstagramGallery from "./InstagramGallery";

const SocialProof = () => {
  return (
    <section className="py-14 bg-white">
      <div className="max-w-[1400px] mx-auto px-6">

        <div className="grid lg:grid-cols-[420px_1fr] gap-10 items-start">

          {/* Left Side */}

          <div>

            <span className="uppercase tracking-[4px] text-[#C9A227] font-semibold text-sm">
              Testimonials
            </span>

            <h2 className="text-[36px] font-black uppercase mt-3 leading-tight">
              WHAT OUR
              <br />
              CUSTOMERS SAY
            </h2>

            <p className="text-gray-500 mt-5 leading-7">
              Thousands of retailers and wholesalers trust
              Black Hewzen for premium quality apparel,
              reliable delivery and exceptional service.
            </p>

            <div className="mt-8">
              <TestimonialCard />
            </div>

          </div>

          {/* Right Side */}

          <div>

            <div className="flex items-center justify-between mb-8">

              <div>

                <span className="uppercase tracking-[4px] text-[#C9A227] text-sm font-semibold">
                  Instagram
                </span>

                <h2 className="text-[36px] font-black uppercase mt-2">
                  FOLLOW US
                </h2>

              </div>

            </div>

            {/* <InstagramGallery /> */}

          </div>

        </div>

      </div>
    </section>
  );
};

export default SocialProof;