import React, { useState } from "react";
import NavTitle from "./NavTitle";
import { motion } from "framer-motion";

const Price = ({ onPriceSelect }) => {   // ✅ receive function
  const [showColors, setShowColors] = useState(true);

  const priceList = [
    { _id: 950, priceOne: 0, priceTwo: 499 },
    { _id: 951, priceOne: 500, priceTwo: 999 },
    { _id: 952, priceOne: 1000, priceTwo: 1999 },
    { _id: 953, priceOne: 2000, priceTwo: 3999 },
    { _id: 954, priceOne: 4000, priceTwo: 5999 },
    { _id: 955, priceOne: 6000, priceTwo: 10000 },
  ];

  return (
    <div className="cursor-pointer">
      <div
        onClick={() => setShowColors(!showColors)}
        className="cursor-pointer"
      >
        <NavTitle title="Shop by Price" icons={true} />
      </div>

      {showColors && (
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <ul className="flex flex-col gap-4 text-sm lg:text-base text-[#767676]">

            {priceList.map((item) => (
              <li
                key={item._id}
                onClick={() => onPriceSelect(item.priceOne, item.priceTwo)}  // ✅ MAIN FIX
                className="border-b-[1px] border-b-[#F0F0F0] pb-2 flex items-center gap-2 hover:text-primeColor hover:border-gray-400 duration-300"
              >
                ₹{item.priceOne.toFixed(2)} - ₹{item.priceTwo.toFixed(2)}
              </li>
            ))}

            {/* Reset price filter */}
            <li
              key={956}
              onClick={() => onPriceSelect(0, Infinity)}   // ✅ Show all
              className="border-b-[1px] border-b-[#F0F0F0] pb-2 flex items-center gap-2 hover:text-primeColor hover:border-gray-400 duration-300"
            >
              more all products
            </li>

          </ul>
        </motion.div>
      )}
    </div>
  );
};

export default Price;
