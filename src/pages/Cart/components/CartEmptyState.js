import React from "react";
import { useNavigate } from "react-router-dom";
import { FiShoppingBag, FiArrowRight } from "react-icons/fi";

const CartEmptyState = () => {
    const navigate = useNavigate();

    return (
        <section className="min-h-[75vh] flex items-center justify-center px-4 py-16">

            <div
                className="
                    max-w-2xl
                    w-full
                    bg-white
                    rounded-3xl
                    shadow-lg
                    border
                    overflow-hidden
                "
            >

                {/* Top */}

                <div
                    className="
                        bg-[#111111]
                        py-14
                        flex
                        flex-col
                        items-center
                    "
                >

                    <div
                        className="
                            w-32
                            h-32
                            rounded-full
                            bg-[#D4AF37]
                            flex
                            items-center
                            justify-center
                            shadow-xl
                        "
                    >
                        <FiShoppingBag
                            size={58}
                            className="text-black"
                        />
                    </div>

                    <h2 className="text-white text-4xl font-bold mt-8">
                        Your Cart is Empty
                    </h2>

                    <p
                        className="
                            text-gray-400
                            text-center
                            mt-4
                            max-w-md
                            leading-7
                        "
                    >
                        Looks like you haven't added anything yet.
                        Discover our premium collection and
                        start shopping today.
                    </p>

                </div>

                {/* Content */}

                <div className="p-10">

                    {/* Features */}

                    <div className="space-y-5">

                        <div className="flex items-center gap-4">

                            <div className="w-3 h-3 rounded-full bg-[#D4AF37]" />

                            <span className="text-gray-700">
                                Premium Quality Products
                            </span>

                        </div>

                        <div className="flex items-center gap-4">

                            <div className="w-3 h-3 rounded-full bg-[#D4AF37]" />

                            <span className="text-gray-700">
                                Secure Online Payment
                            </span>

                        </div>

                        <div className="flex items-center gap-4">

                            <div className="w-3 h-3 rounded-full bg-[#D4AF37]" />

                            <span className="text-gray-700">
                                Fast Delivery Across India
                            </span>

                        </div>

                        <div className="flex items-center gap-4">

                            <div className="w-3 h-3 rounded-full bg-[#D4AF37]" />

                            <span className="text-gray-700">
                                Easy Returns & Replacement
                            </span>

                        </div>

                    </div>

                    {/* Buttons */}

                    <div className="mt-10 flex flex-col md:flex-row gap-4">

                        <button
                            onClick={() => navigate("/shop")}
                            className="
                                flex-1
                                bg-[#D4AF37]
                                text-black
                                py-4
                                rounded-xl
                                font-semibold
                                hover:bg-[#c79d17]
                                transition
                                flex
                                justify-center
                                items-center
                                gap-2
                            "
                        >
                            Continue Shopping
                            <FiArrowRight />
                        </button>

                        <button
                            onClick={() => navigate("/")}
                            className="
                                flex-1
                                border-2
                                border-[#D4AF37]
                                text-[#D4AF37]
                                py-4
                                rounded-xl
                                font-semibold
                                hover:bg-[#D4AF37]
                                hover:text-black
                                transition
                            "
                        >
                            Back to Home
                        </button>

                    </div>

                </div>

            </div>

        </section>
    );
};

export default CartEmptyState;