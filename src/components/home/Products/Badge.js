import React from "react";

const Badge = ({ text }) => {
  return (
    <div className="w-[92px] h-[35px] text-white flex justify-center items-center text-base font-semibold bg-brandColor hover:bg-[#9F2B68] duration-300 cursor-pointer">
      {text}
    </div>
  );
};

export default Badge;
