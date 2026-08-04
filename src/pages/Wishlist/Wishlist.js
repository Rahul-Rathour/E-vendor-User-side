import React, { useEffect, useState } from "react";
import { useCart } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../api";

// Components
import WishlistHeader from "../../components/wishlist/WishlistHeader";
import WishlistItemCard from "../../components/wishlist/WishlistItemCard";
import WishlistSummaryCard from "../../components/wishlist/WishlistSummaryCard";
import WishlistEmptyState from "../../components/wishlist/WishlistEmptyState";

import ShippingProgress from "../Cart/components/ShippingProgress";
import FeaturesStrip from "../Cart/components/FeaturesStrip";
import RecommendedProducts from "../Cart/components/RecommendedProducts";

const Wishlist = () => {
    const navigate = useNavigate();

    const { addToCart } = useCart();

    const [wishlistItems, setWishlistItems] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch Wishlist

    useEffect(() => {
        fetchWishlist();
    }, []);

    const fetchWishlist = async () => {
        const user = JSON.parse(localStorage.getItem("user"));

        if (!user) {
            toast.warning("Please login to view your wishlist.");
            navigate("/login");
            return;
        }

        try {
            const res = await api.get(`/wishlist/${user.id}`);

            if (res.data.status) {
                const items = res.data.data.map((w) => ({
                    id: w.product.id,
                    name: w.product.name,
                    price: Number(w.product.price),
                    image: w.product.image
                        ? `${process.env.REACT_APP_API_URL}/public/${w.product.image}`
                        : "/placeholder.jpg",
                    product: w.product,
                }));

                setWishlistItems(items);
            }
        } catch (err) {
            console.log(err);
            toast.error("Failed to load wishlist");
        } finally {
            setLoading(false);
        }
    };

    // Remove Item

    const handleRemove = async (productId) => {
        const user = JSON.parse(localStorage.getItem("user"));

        if (!user) {
            toast.warning("Please login first.");
            return;
        }

        try {
            await api.delete(`/wishlist/${user.id}/${productId}`);

            setWishlistItems((prev) =>
                prev.filter((item) => item.id !== productId)
            );

            toast.success("Removed from wishlist");
        } catch (err) {
            console.log(err);
            toast.error("Failed to remove item");
        }
    };

    // Move Single Item To Cart

    const handleMoveToCart = (item) => {
        try {
            addToCart(item.id, item.price);

            toast.success("Added to cart");
        } catch (err) {
            console.log(err);
        }
    };

    // Move All Items

    const handleMoveAllToCart = () => {
        if (!wishlistItems.length) return;

        wishlistItems.forEach((item) => {
            addToCart(item.id, item.price);
        });

        toast.success("All wishlist items moved to cart.");
    };

    // Estimated Total

    const totalWishlistAmount = wishlistItems.reduce(
        (sum, item) => sum + Number(item.price),
        0
    );

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center text-lg font-semibold">
                Loading Wishlist...
            </div>
        );
    }
    return (
        <div className="bg-[#FAFAFA] min-h-screen">

            {wishlistItems.length > 0 ? (

                <>

                    {/* Header */}

                    <WishlistHeader />

                    <div className="max-w-[1400px] mx-auto px-4 pb-16">

                        {/* Shipping Progress */}

                        <ShippingProgress
                            totalAmount={totalWishlistAmount}
                        />

                        {/* Main Layout */}

                        <div className="grid lg:grid-cols-3 gap-8 mt-8">

                            {/* Left */}

                            <div className="lg:col-span-2 space-y-6">

                                {wishlistItems.map((item) => (

                                    <WishlistItemCard
                                        key={item.id}
                                        item={item}
                                        navigate={navigate}
                                        handleRemove={handleRemove}
                                        addToCart={handleMoveToCart}
                                    />

                                ))}

                            </div>

                            {/* Right */}

                            <div className="lg:col-span-1">

                                <WishlistSummaryCard
                                    wishlistItems={wishlistItems}
                                    addAllToCart={handleMoveAllToCart}
                                    navigate={navigate}
                                />

                            </div>

                        </div>

                        {/* Recommended */}

                        <RecommendedProducts />

                        {/* Features */}

                        <FeaturesStrip />

                    </div>

                </>

            ) : (

                <>
                    <WishlistHeader />

                    <WishlistEmptyState />

                    <div className="max-w-[1400px] mx-auto px-4">

                        <RecommendedProducts />

                        <FeaturesStrip />

                    </div>
                </>

            )}

        </div>
    );
};

export default Wishlist;