import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import ProductInfo from "../../components/pageProps/productDetails/ProductInfo";
import ProductsOnSale from "../../components/pageProps/productDetails/ProductsOnSale";
import api from "../../api"; // your axios instance
import ReviewsSection from "../../components/productDetails/ReviewsSection";

const ProductDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  const [prevLocation, setPrevLocation] = useState("");
  const [productInfo, setProductInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  // ⭐ NEW: Review states
  const [reviews, setReviews] = useState([]);
  const [loadingReviews, setLoadingReviews] = useState(true);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  useEffect(() => {
    setPrevLocation(location.pathname);
    const fetchProduct = async () => {
      try {
        const res = await api.get(`/product/${id}`);
        if (res.data.status) {
          setProductInfo(res.data.data);
        } else {
          setProductInfo(null);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
    fetchReviews();
  }, [id, location.pathname]);

  // ⭐ Fetch reviews for this product
  const fetchReviews = async () => {
    try {
      const res = await api.get(`/products/${id}/reviews`);
      setReviews(res.data);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    } finally {
      setLoadingReviews(false);
    }
  };
  // ⭐ Submit review
  const handleSubmitReview = async (e) => {
    e.preventDefault();

    try {
      await api.post("/reviews", {
        product_id: id,
        rating,
        comment,
      });

      alert("Review added successfully!");

      setComment("");
      setRating(5);

      fetchReviews(); // refresh reviews
    } catch (error) {
      console.log("Error adding review: ", error);
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-[60vh] text-gray-500 text-lg">
        Loading product details...
      </div>
    );

  if (!productInfo)
    return (
      <div className="text-center mt-20 text-xl font-medium text-red-500">
        Product not found!
      </div>
    );

  return (
    <div className="w-full mx-auto border-b border-gray-300 bg-white">
      <div className="max-w-container mx-auto px-4">
        <div className="xl:-mt-10 -mt-7">
          <Breadcrumbs title={productInfo.name} prevLocation={prevLocation} />
        </div>

        <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-6 gap-4 h-full -mt-5 xl:-mt-8 pb-10 bg-gray-100 p-4 rounded-lg">
          {/* Left Section - Related/Offers */}
          <div className="h-full">
            <ProductsOnSale />
          </div>

          {/* Product Image */}
          <div className="h-full xl:col-span-2 flex justify-center items-center">
            <img
              className="w-full h-full object-cover rounded-md shadow-md"
              src={
                productInfo.image
                  ? `${process.env.REACT_APP_API_URL}/public/${productInfo.image}`
                  : "/placeholder.jpg"
              }
              alt={productInfo.name}
            />
          </div>

          {/* Product Info */}
          <div className="h-full w-full md:col-span-2 xl:col-span-3 xl:p-14 flex flex-col gap-6 justify-center">
            <ProductInfo productInfo={productInfo} />
          </div>
        </div>

        {/* ---------------------- REVIEWS SECTION ---------------------- */}

        <div className="max-w-container mx-auto px-4 mt-10">
          <ReviewsSection reviews={reviews} />

          {/* Add Review Form */}
          <form
            onSubmit={handleSubmitReview}
            className="bg-white p-5 rounded shadow mt-8"
          >
            <h3 className="text-xl font-semibold mb-3">Write a Review</h3>

            <label className="block mb-1 font-medium">Rating</label>
            <select
              className="border p-2 rounded w-full"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
            >
              <option value="5">5 - Excellent</option>
              <option value="4">4 - Very Good</option>
              <option value="3">3 - Good</option>
              <option value="2">2 - Fair</option>
              <option value="1">1 - Poor</option>
            </select>

            <label className="block mt-4 mb-1 font-medium">Comment</label>
            <textarea
              className="border p-3 rounded w-full"
              rows="3"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Share your experience..."
            />

            <button
              type="submit"
              className="mt-4 bg-brandColor hover:bg-brandColor/70 text-white px-4 py-2 rounded"
            >
              Submit Review
            </button>
          </form>


        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
