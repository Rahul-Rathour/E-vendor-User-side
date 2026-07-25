import React from "react";

const HeroStats = () => {
  const stats = [
    {
      number: "10K+",
      title: "Happy Customers",
    },
    {
      number: "500+",
      title: "Premium Products",
    },
    {
      number: "4.9★",
      title: "Customer Rating",
    },
    {
      number: "12+",
      title: "Years Experience",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mt-2">
      {stats.map((item, index) => (
        <div
          key={index}
          className="
            bg-[#111111]
            border
            border-[#2A2A2A]
            rounded-xl
            p-5
            transition-all
            duration-300
            hover:border-[#D4AF37]
            hover:-translate-y-1
            hover:shadow-[0_10px_30px_rgba(212,175,55,0.15)]
          "
        >
          <h3 className="text-[#D4AF37] text-3xl font-bold">
            {item.number}
          </h3>

          <p className="mt-2 text-sm text-gray-400 leading-6">
            {item.title}
          </p>
        </div>
      ))}
    </div>
  );
};

export default HeroStats;