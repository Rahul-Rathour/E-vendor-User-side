import React from "react";
import Heading from "../Products/Heading";
import CountdownTimer from "../CountdownTimer/CountdownTimer";

const AllCategory = () => {
  // Just pass the static time directly
  const offerEndTime = "2026-01-30T23:59:59";

  return (
    <div className="w-full pb-20">

      {/* Countdown Section */}
      <div className="bg-yellow-100 p-5 rounded-lg mb-6 text-center flex flex-col items-center">
        <h2 className="text-xl font-bold mb-2">Limited Time Offer!</h2>
        <CountdownTimer endTime={offerEndTime} />
      </div>


      <Heading heading="Our Bestsellersss" />

      <div className="w-full grid grid-cols-1 md:grid-cols-2 lgl:grid-cols-3 xl:grid-cols-4 gap-10">
        {/* your bestseller items */}
      </div>
    </div>
  );
};

export default AllCategory;
