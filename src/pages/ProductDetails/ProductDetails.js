import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import ProductInfo from "../../components/pageProps/productDetails/ProductInfo";
import ReviewsSection from "../../components/productDetails/ReviewsSection";
import ProductThumbnails from "../../components/pageProps/productDetails/ProductThumbnails";
import ZoomImage from "../../components/designLayouts/zoomImage/ZoomImage";
import api from "../../api";
import HeaderCopy from "../../components/home/Header-copy/HeaderCopy";
import Footer from "../../components/home/Footer/Footer";
import SpecialCase from "../../components/SpecialCase/SpecialCase";

const ProductDetails = () => {
  const { id } = useParams();
  const location = useLocation();

  const [productInfo, setProductInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState([]);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(5);
  const [loadingReviews, setLoadingReviews] = useState(true);


  // New States for Selection
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedMedia, setSelectedMedia] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await api.get(`/product/${id}`);
        if (res.data.status) {
          const product = res.data.data;
          setProductInfo(product);

          // Set default color (first color)
          if (product.colors?.length > 0) {
            setSelectedColor(product.colors[0]);
          }
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

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

  // Update selected media when color changes
  useEffect(() => {
    if (selectedColor) {
      if (selectedColor.images?.length > 0) {
        setSelectedMedia({
          type: "image",
          value: selectedColor.images[0].image_path,
        });
      } else if (productInfo?.image) {
        setSelectedMedia({ type: "image", value: productInfo.image });
      }
    }
  }, [selectedColor, productInfo]);

  // ⭐ Fetch reviews
  const fetchReviews = async () => {
    try {
      const res = await api.get(`/products/${id}/reviews`);
      setReviews(res.data.reviews);
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

  // Filter sizes for selected color
  const availableSizes = productInfo?.sizes?.filter(
    (size) => size.product_color_id === selectedColor?.id
  ) || [];

  if (loading) return <div className="flex justify-center items-center h-[60vh]">Loading...</div>;
  if (!productInfo) return <div>Product not found!</div>;

  return (
    <>
      <HeaderCopy />
      <SpecialCase />
      <div className="p-4">
        <div className="max-w-container mx-auto px-4">
          <Breadcrumbs title={productInfo.name} prevLocation={location.pathname} />

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-6 gap-6 mt-6">

            {/* Thumbnails */}
            <div className="lg:sticky lg:top-20">
              <ProductThumbnails
                productInfo={productInfo}
                selectedColor={selectedColor}
                setSelectedMedia={setSelectedMedia}
              />
            </div>

            {/* Main Image / Video */}
            <div className="xl:col-span-2 flex justify-center lg:sticky lg:top-20">
              <div className="w-full aspect-square bg-white rounded-xl overflow-hidden shadow">
                {selectedMedia?.type === "image" && (
                  <ZoomImage src={`${process.env.REACT_APP_API_URL}/public/${selectedMedia.value}`} />
                )}
                {selectedMedia?.type === "video" && (
                  <iframe
                    className="w-full h-full"
                    src={`https://www.youtube.com/embed/${selectedMedia.value}`}
                    allowFullScreen
                  />
                )}
              </div>
            </div>

            {/* Product Info */}
            <div className="xl:col-span-3">
              <ProductInfo
                productInfo={productInfo}
                selectedColor={selectedColor}
                setSelectedColor={setSelectedColor}
                selectedSize={selectedSize}
                setSelectedSize={setSelectedSize}
                availableSizes={availableSizes}
              />
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

              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
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
      <Footer />
    </>
  );
};

export default ProductDetails;