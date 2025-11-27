import { useState, useEffect } from "react";
import api from "../../api";
import HeaderCopy from "../../components/home/Header-copy/HeaderCopy";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import BottomNav from "../../components/home/BottomNav/BottomNav";

const OrderDetails = () => {
    const [orderItems, setOrderItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const { id } = useParams();
    const location = useLocation();
    const order_status = location.state?.status;
    const navigate = useNavigate();

    useEffect(() => {
        const fetchOrderItems = async () => {
            try {
                const res = await api.get(`order-items/${id}`);
                if (res.data.status) {
                    setOrderItems([...res.data.data].reverse());
                }
            } catch (err) {
                console.error("Error fetching order items:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchOrderItems();
    }, [id]);

    const handleCancelOrder = async (id) => {
        try {
            const response = await api.post(`order/update-status/${id}`, { status: "cancelled" });

            if (response.data.status) {
                toast.success("Order cancelled successfully!");
                navigate("/order");
            } else {
                toast.error("Failed to cancel order.");
            }
        } catch (error) {
            console.error("Error cancelling order:", error);
            toast.error("Something went wrong while cancelling the order.");
        }
    };

    return (
        <>
            <HeaderCopy />

            {/* ---------- ORDER STATUS + PROGRESS ---------- */}
            <div className="bg-white mt-6 p-6 rounded-xl shadow border border-gray-200 mx-4 sm:mx-6 md:mx-10">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">Delivery Status</h3>

                {/* Status Steps */}
                <div className="relative w-full flex items-center justify-between">

                    {/* If Cancelled → Show only 2 steps */}
                    {order_status === "cancelled" ? (
                        <>
                            {/* Step 1 — Ordered */}
                            <div className="flex flex-col items-center w-1/2">
                                <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold bg-red-600">
                                    1
                                </div>
                                <p className="mt-2 text-sm font-medium text-red-700">Ordered</p>
                            </div>

                            {/* Step 2 — Cancelled */}
                            <div className="flex flex-col items-center w-1/2">
                                <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold bg-red-600">
                                    2
                                </div>
                                <p className="mt-2 text-sm font-medium text-red-700">Cancelled</p>
                            </div>
                        </>
                    ) : (
                        /* Normal Flow: Ordered → Shipped → Delivered */
                        ["ordered", "shipped", "delivered"].map((step, index) => {
                            const currentIndex =
                                order_status === "pending"
                                    ? 0
                                    : order_status === "shipped"
                                        ? 1
                                        : order_status === "delivered"
                                            ? 2
                                            : 0;

                            const stepNames = {
                                ordered: "Ordered",
                                shipped: "Shipped",
                                delivered: "Delivered",
                            };

                            return (
                                <div key={index} className="flex flex-col items-center w-1/3">
                                    <div
                                        className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold 
                        ${index <= currentIndex ? "bg-green-600" : "bg-gray-300"}`}
                                    >
                                        {index + 1}
                                    </div>
                                    <p
                                        className={`mt-2 text-sm font-medium 
                        ${index <= currentIndex ? "text-green-700" : "text-gray-500"}`}
                                    >
                                        {stepNames[step]}
                                    </p>
                                </div>
                            );
                        })
                    )}
                </div>


                {/* Progress Bar */}
                <div className="w-full mt-4 h-1 bg-gray-300 rounded-full relative">
                    <div
                        className={`absolute left-0 top-0 h-1 rounded-full transition-all duration-500 ${order_status === "cancelled" ? "bg-red-600" : "bg-green-600"}`}
                        style={{
                            width:
                                order_status === "pending"
                                    ? "25%"
                                    : order_status === "shipped"
                                        ? "50%"
                                        : "100%",
                        }}
                    ></div>
                </div>
            </div>

            {/* ---------- CANCEL ORDER BUTTON ---------- */}
            {order_status === "pending" && (
                <div className="mt-6 text-center">
                    <button
                        onClick={() => handleCancelOrder(id)}
                        className="px-5 py-2 bg-red-600 text-white text-sm font-semibold rounded-lg shadow hover:bg-red-700 transition"
                    >
                        Cancel Order
                    </button>
                </div>
            )}

            {/* ---------- ITEMS LIST ---------- */}
            <div className="bg-white mt-6 p-6 rounded-xl shadow border border-gray-200 mx-4 sm:mx-6 md:mx-10">
                <h3 className="text-lg font-semibold text-gray-700 mb-5">Items in this Order</h3>

                {loading ? (
                    <p className="text-gray-500">Loading...</p>
                ) : (
                    orderItems.map((item) => (
                        <div
                            key={item.id}
                            className="flex gap-3 w-full py-4 border-b last:border-b-0"
                        >
                            {/* Product Image */}
                            <img
                                src={`${process.env.REACT_APP_API_URL}/public/${item.product.image}`}
                                alt={item.product.name}
                                className="w-20 h-20 rounded-md object-cover border shrink-0"
                            />

                            {/* Product Info */}
                            <div className="flex flex-col w-full">

                                {/* Name + Badge */}
                                <div className="flex justify-between items-start w-full">
                                    <p className="text-base font-semibold text-gray-800 break-words">
                                        {item.product.name}
                                    </p>

                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-medium shrink-0
                                        ${order_status === "cancelled"
                                                ? "bg-red-100 text-red-600"
                                                : order_status === "shipped"
                                                    ? "bg-yellow-100 text-yellow-600"
                                                    : order_status === "delivered"
                                                        ? "bg-green-100 text-green-600"
                                                        : "bg-gray-100 text-gray-600"
                                            }`}
                                    >
                                        {order_status}
                                    </span>
                                </div>

                                {/* Description */}
                                <p className="text-gray-600 text-sm break-words whitespace-normal mt-1">
                                    {item.product.description}
                                </p>

                                {/* Qty + Price */}
                                <div className="flex justify-between text-sm mt-2">
                                    <p className="text-gray-700">
                                        Qty: <span className="font-semibold">{item.quantity}</span>
                                    </p>
                                    <p className="text-gray-700">
                                        Price:{" "}
                                        <span className="font-semibold text-green-600">
                                            ₹{item.price}
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
            <BottomNav />
        </>
    );

};

export default OrderDetails;