import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import ProductInfo from "../../components/pageProps/productDetails/ProductInfo";
import ReviewsSection from "../../components/productDetails/ReviewsSection";
import ProductThumbnails from "../../components/pageProps/productDetails/ProductThumbnails";
import ZoomImage from "../../components/designLayouts/zoomImage/ZoomImage";
import api from "../../api";
import HeaderCopy from "../../components/home/Header-copy/HeaderCopy";

const ProductDetails = () => {
  const { id } = useParams();
  const location = useLocation();

  const [prevLocation, setPrevLocation] = useState("");
  const [productInfo, setProductInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  const [reviews, setReviews] = useState([]);
  const [loadingReviews, setLoadingReviews] = useState(true);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  // NEW: Stores selected media (image or video)
  const [selectedMedia, setSelectedMedia] = useState(null);

  const [similarProducts, setSimilarProducts] = useState([]);



 
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
  
  useEffect(() => {
    if (productInfo?.category_id) {
      const fetchSimilar = async () => {
        try {
          const res = await api.get(`/categories/${productInfo.category_id}/products`);
          setSimilarProducts(res.data.products || []);
        } catch (error) {
          console.error("Error fetching similar products:", error);
        }
      };

      fetchSimilar();
    }
  }, [productInfo]);
  // Set default media to main image after loading product
  useEffect(() => {
    if (productInfo) {
      setSelectedMedia({
        type: "image",
        value: productInfo.image
      });
    }
  }, [productInfo]);

  // ⭐ Fetch reviews
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
      fetchReviews();
    } catch (error) {
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
    <>
      <HeaderCopy />
      <div className="p-4">
        <div className="w-full mx-auto border-b border-gray-300 bg-white">
          <div className="max-w-container mx-auto px-4">
            <div className="xl:-mt-10 -mt-7">
              <Breadcrumbs title={productInfo.name} prevLocation={prevLocation} />
            </div>

            <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-6 gap-4 h-full -mt-5 xl:-mt-8 pb-10 bg-gray-100 p-4 rounded-lg">

              {/* LEFT — Thumbnails */}
              <div className="h-full order-2 md:order-1">
                <ProductThumbnails
                  productInfo={productInfo}
                  setSelectedMedia={setSelectedMedia}
                />
              </div>

              {/* CENTER — Main Media Display */}
              <div className="h-full xl:col-span-2 flex justify-center items-center order-1 md:order-2">
                <div className="w-full h-full rounded-md shadow-md overflow-hidden">

                  {/* ✔ Show Image */}
                  {selectedMedia?.type === "image" && (
                    <ZoomImage
                      src={`${process.env.REACT_APP_API_URL}/public/${selectedMedia.value}`}
                    />
                  )}

                  {/* ✔ Show Video */}
                  {selectedMedia?.type === "video" && (
                    <iframe
                      className="w-full h-full rounded-md"
                      src={`https://www.youtube.com/embed/${selectedMedia.value}`}
                      title="Product Video"
                      allowFullScreen
                    ></iframe>
                  )}
 
                </div>
              </div>

              {/* RIGHT — Product info */}
              <div className="h-full w-full md:col-span-2 xl:col-span-3 xl:p-14 flex flex-col gap-6 justify-center order-3">
                <ProductInfo productInfo={productInfo} />
              </div>
            </div>

            {/* REVIEWS */}
            <div className="max-w-container mx-auto px-4 mt-10">
              <ReviewsSection reviews={reviews} />

              {/* REVIEW FORM */}
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

            {/* SIMILAR PRODUCTS */}
            {similarProducts.length > 0 && (
              <div className="mt-12">
                <h2 className="text-2xl font-semibold mb-4">Similar Products</h2>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {similarProducts.slice(0, 12).map((item) => (
                    <div
                      key={item.id}
                      className="bg-white p-3 rounded shadow hover:shadow-lg cursor-pointer"
                      onClick={() => window.location.href = `/product/${item.id}`}
                    >
                      <img
                        src={`${process.env.REACT_APP_API_URL}/public/${item.image}`}
                        alt={item.name}
                        className="w-full h-40 object-cover rounded"
                      />

                      <p className="mt-2 text-sm font-semibold">{item.name}</p>

                      <p className="text-brandColor font-bold mt-1">₹{item.price}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}


          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
