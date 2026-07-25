import React from "react";
import { FiArrowRight } from "react-icons/fi";
import HeroButtons from "./HeroButtons";
import HeroStats from "./HeroStats";

const HeroContent = () => {
    return (
        <div className="flex flex-col justify-center py-16 lg:py-0">

            {/* Premium Badge */}

            <div className="inline-flex items-center w-fit rounded-full border border-[#D4AF37] bg-[#1A1A1A] px-5 py-2">

                <span className="h-2 w-2 rounded-full bg-[#D4AF37] mr-3"></span>

                <span className="text-[#D4AF37] text-sm font-medium tracking-wider uppercase">
                    Premium Streetwear Collection
                </span>

            </div>
            {/* Heading */}

            <div className="mt-8">

                <h1 className="text-white text-5xl lg:text-7xl font-bold leading-tight">

                    Premium

                    <br />

                    Streetwear

                    <br />

                    <span className="text-[#D4AF37]">
                        That Defines You
                    </span>

                </h1>

            </div>
            {/* Description */}

            <p className="mt-8 max-w-xl text-gray-400 text-lg leading-8">

                Discover handcrafted premium apparel made with exceptional
                quality fabrics and modern designs.

                Experience comfort, durability, and timeless fashion that
                perfectly complements your personality.

            </p>
            {/* CTA Buttons */}

            <div className="mt-10">

                <HeroButtons />

            </div>
            {/* Divider */}

            <div className="mt-12 w-24 h-[2px] bg-[#D4AF37]" />
            {/* Statistics */}

            <div className="mt-12">

                <HeroStats />

            </div>
            {/* Bottom Content */}

            <div className="mt-12 flex items-center gap-4">

                <div className="w-12 h-[2px] bg-[#D4AF37]" />

                <p className="text-gray-400 text-sm tracking-wide">

                    Trusted by thousands of customers across India.

                </p>

            </div>
            <div className="mt-10 grid grid-cols-2 gap-6 max-w-lg">

                <div className="flex items-center gap-3">

                    <div className="w-3 h-3 rounded-full bg-[#D4AF37]" />

                    <span className="text-gray-300 text-sm">
                        Premium Quality
                    </span>

                </div>

                <div className="flex items-center gap-3">

                    <div className="w-3 h-3 rounded-full bg-[#D4AF37]" />

                    <span className="text-gray-300 text-sm">
                        Fast Delivery
                    </span>

                </div>

                <div className="flex items-center gap-3">

                    <div className="w-3 h-3 rounded-full bg-[#D4AF37]" />

                    <span className="text-gray-300 text-sm">
                        Easy Returns
                    </span>

                </div>

                <div className="flex items-center gap-3">

                    <div className="w-3 h-3 rounded-full bg-[#D4AF37]" />

                    <span className="text-gray-300 text-sm">
                        Made in India
                    </span>

                </div>

            </div>
        </div>
    );
};

export default HeroContent;