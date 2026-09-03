import React from "react";
import { FiShield, FiTruck } from "react-icons/fi";
import { toast } from "react-toastify";

const OrderSummaryCard = ({
    cart,
    totalAmt,
    discountAmount,
    selectedCoupon,
    navigate,
}) => {

    const subtotal = cart.reduce(
        (sum, item) =>
            sum + item.product.price * item.quantity,
        0
    );

    const totalGST = cart.reduce(
        (sum, item) => {
            const price =
                item.product.price * item.quantity;

            return (
                sum +
                (price * item.product.gst) / 100
            );
        },
        0
    );

    // const shipping = subtotal >= 999 ? 0 : 99;
    const shipping = 0;

    const grandTotal =
        subtotal +
        totalGST +
        shipping -
        discountAmount;

    return (

        <div
            className="
            bg-white
            rounded-2xl
            border
            shadow-sm
            overflow-hidden
        "
        >

            {/* Header */}

            <div
                className="
                px-6
                py-5
                border-b
            "
            >

                <h2
                    className="
                    text-2xl
                    font-bold
                "
                >
                    Order Summary
                </h2>

            </div>

            {/* Price Details */}

            <div className="p-6 space-y-5">

                {/* Items */}

                <div className="flex justify-between">

                    <span className="text-gray-500">
                        Items ({cart.length})
                    </span>

                    <span className="font-semibold">
                        ₹{subtotal.toFixed(2)}
                    </span>

                </div>

                {/* GST */}

                <div className="flex justify-between">

                    <span className="text-gray-500">
                        GST
                    </span>

                    <span className="font-semibold">
                        ₹{totalGST.toFixed(2)}
                    </span>

                </div>

                {/* Shipping */}

                <div className="flex justify-between">

                    <span className="text-gray-500">
                        Shipping
                    </span>

                    <span
                        className={
                            shipping === 0
                                ? "text-green-600 font-semibold"
                                : "font-semibold"
                        }
                    >
                        {shipping === 0
                            ? "FREE"
                            : `₹${shipping}`}
                    </span>

                </div>

                {/* Coupon */}

                {selectedCoupon && (

                    <div className="flex justify-between">

                        <span className="text-green-600">

                            Coupon
                            <br />

                            <span className="text-xs">
                                ({selectedCoupon.code})
                            </span>

                        </span>

                        <span className="text-green-600 font-bold">

                            -₹
                            {Number(
                                discountAmount
                            ).toFixed(2)}

                        </span>

                    </div>

                )}

                <hr />

                {/* Grand Total */}

                <div className="flex justify-between">

                    <span className="text-xl font-bold">
                        Grand Total
                    </span>

                    <span
                        className="
                        text-2xl
                        font-bold
                        text-[#D4AF37]
                    "
                    >
                        ₹{grandTotal.toFixed(2)}
                    </span>

                </div>

                {/* Free Shipping */}

                {shipping > 0 && (

                    <div
                        className="
                        bg-yellow-50
                        border
                        border-yellow-200
                        rounded-xl
                        p-4
                        text-sm
                    "
                    >

                        Add
                        <strong>
                            {" "}
                            ₹{(999 - subtotal).toFixed(2)}
                        </strong>

                        more to get

                        <span
                            className="
                            text-green-600
                            font-semibold
                        "
                        >
                            {" "}
                            FREE Shipping
                        </span>

                    </div>

                )}

                {/* Secure */}

                <div
                    className="
                    rounded-xl
                    bg-gray-50
                    p-4
                    space-y-3
                "
                >

                    <div className="flex gap-3">

                        <FiShield
                            className="
                            text-[#D4AF37]
                            mt-1
                        "
                            size={18}
                        />

                        <div>

                            <h4 className="font-semibold">
                                Secure Checkout
                            </h4>

                            <p
                                className="
                                text-sm
                                text-gray-500
                            "
                            >
                                Your payment information
                                is encrypted.
                            </p>

                        </div>

                    </div>

                    <div className="flex gap-3">

                        <FiTruck
                            className="
                            text-[#D4AF37]
                            mt-1
                        "
                            size={18}
                        />

                        <div>

                            <h4 className="font-semibold">
                                Fast Delivery
                            </h4>

                            <p
                                className="
                                text-sm
                                text-gray-500
                            "
                            >
                                Estimated delivery
                                within 5–7 days.
                            </p>

                        </div>

                    </div>

                </div>

                {/* Checkout Button */}

                <button
                    onClick={() => {

                        const token = localStorage.getItem("userToken");

                        if (!token) {
                            toast.error("Please log in to proceed to checkout");
                            navigate("/login");
                            return;
                        }

                        navigate("/checkout", {
                            state: {
                                totalAmt,
                                finalTotal: grandTotal,
                                cart,
                                discountAmount,
                                selectedCoupon,
                            },
                        });

                    }}
                    className="
                    w-full
                    py-4
                    rounded-xl
                    bg-[#D4AF37]
                    text-black
                    font-bold
                    text-lg
                    hover:bg-[#C89D22]
                    transition
                "
                >
                    Proceed to Checkout
                </button>

                {/* Continue Shopping */}

                <button
                    onClick={() =>
                        navigate("/shop")
                    }
                    className="
                    w-full
                    py-3
                    rounded-xl
                    border
                    border-gray-300
                    font-semibold
                    hover:bg-gray-100
                    transition
                "
                >
                    Continue Shopping
                </button>

            </div>

        </div>

    );
};

export default OrderSummaryCard;