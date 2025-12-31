import React from "react";

const ReviewsSection = ({ reviews }) => {
  // Calculate average rating
  const avgRating =
    reviews.length > 0
      ? (reviews.reduce((a, b) => a + b.rating, 0) / reviews.length).toFixed(1)
      : 0;

  const totalReviews = reviews.length;

  // Count each rating (5,4,3,2,1)
  const ratingCount = [5, 4, 3, 2, 1].map(
    (n) => reviews.filter((r) => r.rating === n).length
  );

  return (
    <div className="bg-white rounded-lg p-6 shadow mt-6">

      {/* ⭐ Average Rating Box */}
      <div className="flex gap-10">
        <div className="text-center">
          <div className="text-4xl font-bold text-green-600">{avgRating}</div>
          <div className="text-yellow-500 text-xl">⭐</div>
          <p className="text-gray-500 text-sm">{totalReviews} Ratings</p>
        </div>

        {/* Rating Breakdown Bars */}
        <div className="flex flex-col justify-between w-full">
          {[5, 4, 3, 2, 1].map((star, index) => {
            const count = ratingCount[index];
            const percent = totalReviews
              ? (count / totalReviews) * 100
              : 0;

            return (
              <div key={star} className="flex items-center gap-2">
                <span className="w-6 text-sm">{star}★</span>
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-500 h-2 rounded-full"
                    style={{ width: `${percent}%` }}
                  ></div>
                </div>
                <span className="text-sm text-gray-500">{count}</span>
              </div>
            );
          })}
        </div>
      </div>

      <hr className="my-6" />

      {/* ⭐ Individual Reviews */}
      {reviews.length === 0 ? (
        <p>No reviews yet.</p>
      ) : (
        reviews.map((review) => (
          <div
            key={review.id}
            className="border-b py-4 flex flex-col gap-2"
          >
            <div className="font-semibold text-gray-800">
              {review.user?.name || "Anonymous"}
            </div>

            <div className="text-green-600 font-bold text-sm">
              ⭐ {review.rating}
            </div>

            <p className="text-gray-700">{review.comment}</p>

            {review.image && (
              <img
                src={`${process.env.REACT_APP_API_URL}/public/${review.image}`}
                alt="review"
                className="w-24 h-24 object-cover rounded-md"
              />
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default ReviewsSection;
