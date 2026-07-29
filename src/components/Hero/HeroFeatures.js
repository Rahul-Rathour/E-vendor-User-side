import React from "react";
import {
  FiShield,
  FiTruck,
  FiRefreshCw,
  FiAward,
} from "react-icons/fi";

import FeatureCard from "./FeatureCard";

const HeroFeatures = () => {
  const features = [
    {
      icon: <FiAward />,
      title: "Premium Fabric",
      subtitle: "High quality materials",
    },
    {
      icon: <FiShield />,
      title: "Made in India",
      subtitle: "Crafted with precision",
    },
    {
      icon: <FiTruck />,
      title: "Fast Delivery",
      subtitle: "Across India",
    },
    {
      icon: <FiRefreshCw />,
      title: "Easy Returns",
      subtitle: "Hassle-free replacement",
    },
  ];

  return (
    <section className="bg-black py-12">
      <div className="max-w-[1400px] mx-auto px-6">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

          {features.map((item, index) => (
            <FeatureCard
              key={index}
              icon={item.icon}
              title={item.title}
              subtitle={item.subtitle}
            />
          ))}

        </div>

      </div>
    </section>
  );
};

export default HeroFeatures;