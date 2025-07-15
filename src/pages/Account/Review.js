import React from "react";
import Empty from "../../assets/images/banner/Empty.png"; // ✅ Correct way to import

const MyReviews = () => {
  return (
    <div className="text-center p-6 space-y-4">
      {/* Image Section */}
      <div className="flex justify-center">
        <img
          src={Empty}
          alt="No Reviews"
          className="w-64 h-64 object-contain"
        />
      </div>

      {/* Text Section */}
      <h2 className="text-2xl font-bold text-gray-800">My Reviews</h2>
      <p className="text-gray-600">
        You haven't reviewed any products yet. Once you do, they'll appear here.
      </p>
    </div>
  );
};

export default MyReviews;
