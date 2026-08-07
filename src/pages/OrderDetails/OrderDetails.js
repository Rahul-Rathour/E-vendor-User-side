import { useState, useEffect } from "react";
import api from "../../api";
import HeaderCopy from "../../components/home/Header-copy/HeaderCopy";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import BottomNav from "../../components/home/BottomNav/BottomNav";

const OrderDetails = () => {

    const { id } = useParams();
    const location = useLocation();
    const navigate = useNavigate();

    const order_status = location.state?.status;

    const [orderItems, setOrderItems] = useState([]);
    const [loading, setLoading] = useState(true);

    // Return Modal
    const [showReturnModal, setShowReturnModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    const [reason, setReason] = useState("");
    const [remarks, setRemarks] = useState("");

    const returnReasons = [
        "Damaged Product",
        "Wrong Product",
        "Defective Product",
        "Quality Issue",
        "Size Issue",
        "Received Late",
        "Changed My Mind",
        "Other",
    ];

    useEffect(() => {
        fetchOrderItems();
    }, [id]);

    const fetchOrderItems = async () => {
        try {

            const res = await api.get(`order-items/${id}`);

            if (res.data.status) {
                setOrderItems([...res.data.data].reverse());
            }

        } catch (err) {
            console.log(err);
            toast.error("Unable to fetch order details.");
        } finally {
            setLoading(false);
        }
    };

    const handleViewInvoice = () => {
        navigate(`/invoice/${id}`, {
            state: { status: order_status },
        });
    };

    const handleTrackOrder = () => {
        navigate(`/track/${id}`, {
            state: { status: order_status },
        });
    };

    const handleProductDetails = (pid) => {
        navigate(`/product/${pid}`);
    };

    const handleCancelOrder = async (id) => {

        try {

            const response = await api.post(
                `order/update-status/${id}`,
                {
                    status: "cancelled",
                }
            );

            if (response.data.status) {

                toast.success("Order cancelled successfully!");

                navigate("/order");

            } else {

                toast.error("Failed to cancel order.");

            }

        } catch (error) {

            console.log(error);

            toast.error("Something went wrong while cancelling the order.");

        }

    };

    // ---------- Return Helpers ----------

    const canReturn = (item) => {

        if (order_status !== "delivered") return false;

        if (item.return_status !== "not_requested") return false;

        if (item.return_days <= 0) return false;

        if (!item.return_expiry_date) return false;

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const expiry = new Date(item.return_expiry_date);
        expiry.setHours(23, 59, 59, 999);

        return today <= expiry;

    };

    const openReturnModal = (item) => {

        setSelectedItem(item);

        setReason("");

        setRemarks("");

        setShowReturnModal(true);

    };

    const closeReturnModal = () => {

        setSelectedItem(null);

        setReason("");

        setRemarks("");

        setShowReturnModal(false);

    };

    const submitReturnRequest = async () => {

        if (!reason) {

            toast.error("Please select a reason.");

            return;

        }

        try {

            const res = await api.post("/returns/request", {
                order_item_id: selectedItem.id,
                reason,
                remarks,
            });

            if (res.data.status) {

                toast.success(res.data.message);

                setOrderItems((prev) =>
                    prev.map((item) =>
                        item.id === selectedItem.id
                            ? {
                                ...item,
                                return_status: "requested",
                            }
                            : item
                    )
                );

                closeReturnModal();

            }

        } catch (err) {

            toast.error(
                err.response?.data?.message ||
                "Unable to submit return request."
            );

        }

    };

    const getReturnBadge = (item) => {

        switch (item.return_status) {

            case "requested":
                return (
                    <span className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 text-xs font-semibold">
                        Return Requested
                    </span>
                );

            case "approved":
                return (
                    <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold">
                        Return Approved
                    </span>
                );

            case "rejected":
                return (
                    <span className="px-3 py-1 rounded-full bg-red-100 text-red-700 text-xs font-semibold">
                        Return Rejected
                    </span>
                );

            case "picked_up":
                return (
                    <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold">
                        Picked Up
                    </span>
                );

            case "completed":
                return (
                    <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold">
                        Return Completed
                    </span>
                );

            default:
                return null;

        }

    };

    return (
        <>
            <div className="min-h-screen bg-gray-50 pb-28">
                {/* Page Header */}
                <div className="max-w-6xl mx-auto px-4 mt-6">

                    <button
                        onClick={() => navigate(-1)}
                        className="text-sm text-gray-600 hover:text-black mb-3"
                    >
                        ← Back
                    </button>

                    <div className="bg-white rounded-2xl shadow-sm border p-6">

                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

                            <div>

                                <h2 className="text-2xl font-bold text-gray-800">
                                    Order Details
                                </h2>

                                <p className="text-gray-500 mt-1">
                                    Order ID #{id}
                                </p>

                            </div>

                            <div>

                                <span
                                    className={`px-5 py-2 rounded-full text-sm font-semibold
                                        ${order_status === "delivered"
                                            ? "bg-green-100 text-green-700"
                                            : order_status === "pending"
                                                ? "bg-yellow-100 text-yellow-700"
                                                : order_status === "shipped"
                                                    ? "bg-blue-100 text-blue-700"
                                                    : "bg-red-100 text-red-700"
                                        }`
                                    }
                                >
                                    {order_status?.toUpperCase()}
                                </span>

                            </div>

                        </div>

                    </div>

                </div>

                {/* Delivery Status */}

                <div className="max-w-6xl mx-auto px-4 mt-6">

                    <div className="bg-white rounded-2xl shadow-sm border p-6">

                        <h3 className="text-lg font-semibold mb-8">
                            Delivery Progress
                        </h3>

                        <div className="flex items-center justify-between relative">

                            {order_status === "cancelled" ? (

                                <>

                                    <div className="flex flex-col items-center w-1/2">

                                        <div className="w-10 h-10 rounded-full bg-red-600 text-white flex items-center justify-center font-bold">
                                            ✓
                                        </div>

                                        <span className="mt-2 text-red-600 font-medium">
                                            Ordered
                                        </span>

                                    </div>

                                    <div className="flex flex-col items-center w-1/2">

                                        <div className="w-10 h-10 rounded-full bg-red-600 text-white flex items-center justify-center font-bold">
                                            ✕
                                        </div>

                                        <span className="mt-2 text-red-600 font-medium">
                                            Cancelled
                                        </span>

                                    </div>

                                </>

                            ) : (

                                ["Ordered", "Shipped", "Delivered"].map(
                                    (step, index) => {

                                        const current =
                                            order_status === "pending"
                                                ? 0
                                                : order_status === "shipped"
                                                    ? 1
                                                    : 2;

                                        return (

                                            <div
                                                key={index}
                                                className="flex flex-col items-center w-1/3"
                                            >

                                                <div
                                                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white
                                            ${index <= current
                                                            ? "bg-green-600"
                                                            : "bg-gray-300"
                                                        }`}
                                                >
                                                    {index + 1}
                                                </div>

                                                <span
                                                    className={`mt-2 text-sm font-medium
                                            ${index <= current
                                                            ? "text-green-700"
                                                            : "text-gray-500"
                                                        }`}
                                                >
                                                    {step}
                                                </span>

                                            </div>

                                        );

                                    }
                                )

                            )}

                        </div>

                        <div className="mt-8 h-2 rounded-full bg-gray-200 overflow-hidden">

                            <div
                                className={`h-full
                        ${order_status === "cancelled"
                                        ? "bg-red-600"
                                        : "bg-green-600"
                                    }`}
                                style={{
                                    width:
                                        order_status === "pending"
                                            ? "33%"
                                            : order_status === "shipped"
                                                ? "66%"
                                                : "100%",
                                }}
                            />

                        </div>

                    </div>

                </div>

                {/* Action Buttons */}

                <div className="max-w-6xl mx-auto px-4 mt-6">

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                        {order_status === "pending" && (

                            <button
                                onClick={() => handleCancelOrder(id)}
                                className="bg-red-600 hover:bg-red-700 text-white rounded-xl py-3 font-semibold transition"
                            >
                                Cancel Order
                            </button>

                        )}

                        <button
                            onClick={handleViewInvoice}
                            className="bg-black text-[#C79D17] rounded-xl py-3 font-semibold hover:opacity-90 transition"
                        >
                            View Invoice
                        </button>

                        <button
                            onClick={handleTrackOrder}
                            className="bg-[#C79D17] text-black rounded-xl py-3 font-semibold hover:opacity-90 transition"
                        >
                            Track Order
                        </button>

                    </div>

                </div>

                {/* Products */}

                <div className="max-w-6xl mx-auto px-4 mt-6">

                    <div className="bg-white rounded-2xl shadow-sm border p-6">

                        <h3 className="text-xl font-bold mb-6">
                            Ordered Products
                        </h3>

                        {loading ? (

                            <div className="text-center py-10">
                                Loading...
                            </div>

                        ) : (

                            orderItems.map((item) => (
                                <div
                                    key={item.id}
                                    className="border rounded-2xl p-5 mb-5 hover:shadow-md transition bg-white"
                                >

                                    <div className="flex flex-col md:flex-row gap-5">

                                        {/* Product Image */}

                                        <div className="w-full md:w-40 flex justify-center">

                                            <img
                                                src={`${process.env.REACT_APP_API_URL}/public/${item.product.image}`}
                                                alt={item.product.name}
                                                onClick={() => handleProductDetails(item.product.id)}
                                                className="w-36 h-36 object-cover rounded-xl border cursor-pointer hover:scale-105 transition"
                                            />

                                        </div>

                                        {/* Product Details */}

                                        <div className="flex-1">

                                            <div className="flex flex-col lg:flex-row lg:justify-between gap-3">

                                                <div>

                                                    <h3
                                                        onClick={() => handleProductDetails(item.product.id)}
                                                        className="text-xl font-bold text-gray-800 cursor-pointer hover:text-[#C79D17]"
                                                    >
                                                        {item.product.name}
                                                    </h3>

                                                    <div
                                                        className="text-sm text-gray-500 mt-2 line-clamp-2"
                                                        dangerouslySetInnerHTML={{
                                                            __html: item.product.description,
                                                        }}
                                                    />

                                                </div>

                                                <div>

                                                    <span
                                                        className={`px-4 py-2 rounded-full text-sm font-semibold
                        ${order_status === "delivered"
                                                                ? "bg-green-100 text-green-700"
                                                                : order_status === "pending"
                                                                    ? "bg-yellow-100 text-yellow-700"
                                                                    : order_status === "shipped"
                                                                        ? "bg-blue-100 text-blue-700"
                                                                        : "bg-red-100 text-red-700"
                                                            }`}
                                                    >
                                                        {order_status}
                                                    </span>

                                                </div>

                                            </div>

                                            {/* Details */}

                                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6">

                                                <div>

                                                    <p className="text-gray-500 text-sm">
                                                        Quantity
                                                    </p>

                                                    <p className="font-semibold">
                                                        {item.quantity}
                                                    </p>

                                                </div>

                                                <div>

                                                    <p className="text-gray-500 text-sm">
                                                        Size
                                                    </p>

                                                    <p className="font-semibold uppercase">
                                                        {item.size || "-"}
                                                    </p>

                                                </div>

                                                <div>

                                                    <p className="text-gray-500 text-sm">
                                                        GST
                                                    </p>

                                                    <p className="font-semibold">
                                                        {item.gst}%
                                                    </p>

                                                </div>

                                                <div>

                                                    <p className="text-gray-500 text-sm">
                                                        Price
                                                    </p>

                                                    <p className="font-bold text-green-600 text-lg">
                                                        ₹{item.price}
                                                    </p>

                                                </div>

                                            </div>

                                            {/* Return Status */}

                                            {item.return_status !== "not_requested" && (

                                                <div className="mt-5">

                                                    {getReturnBadge(item)}

                                                </div>

                                            )}

                                            {/* Return Expiry */}

                                            {item.return_days > 0 && item.return_status === "not_requested" && (

                                                <div className="mt-4">

                                                    <p className="text-sm text-gray-500">

                                                        Return available till{" "}

                                                        <span className="font-semibold text-black">

                                                            {new Date(
                                                                item.return_expiry_date
                                                            ).toLocaleDateString()}

                                                        </span>

                                                    </p>

                                                </div>

                                            )}

                                            {/* Return Button */}

                                            {canReturn(item) && (

                                                <div className="mt-6">

                                                    <button
                                                        onClick={() => openReturnModal(item)}
                                                        className="px-6 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold transition"
                                                    >
                                                        Return Product
                                                    </button>

                                                </div>

                                            )}

                                            {/* Window Closed */}

                                            {!canReturn(item) &&
                                                item.return_status === "not_requested" &&
                                                item.return_days > 0 && (

                                                    <div className="mt-6">

                                                        <span className="inline-block bg-gray-100 text-gray-600 px-4 py-2 rounded-full text-sm">

                                                            Return Window Closed

                                                        </span>

                                                    </div>

                                                )}

                                            {/* Not Returnable */}

                                            {item.return_days === 0 && (

                                                <div className="mt-6">

                                                    <span className="inline-block bg-red-50 text-red-600 px-4 py-2 rounded-full text-sm">

                                                        Non Returnable Product

                                                    </span>

                                                </div>

                                            )}

                                        </div>

                                    </div>

                                </div>
                            ))

                        )}

                    </div>

                </div>

                {/* Return Modal */}

                {showReturnModal && (

                    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-5">

                        <div className="bg-white rounded-2xl w-full max-w-lg p-6">

                            <h2 className="text-2xl font-bold mb-6">
                                Return Product
                            </h2>

                            <div className="mb-4">

                                <label className="font-semibold">
                                    Reason
                                </label>

                                <select
                                    value={reason}
                                    onChange={(e) => setReason(e.target.value)}
                                    className="mt-2 w-full border rounded-xl p-3"
                                >

                                    <option value="">
                                        Select Reason
                                    </option>

                                    {returnReasons.map((r) => (

                                        <option
                                            key={r}
                                            value={r}
                                        >
                                            {r}
                                        </option>

                                    ))}

                                </select>

                            </div>

                            <div>

                                <label className="font-semibold">
                                    Remarks
                                </label>

                                <textarea
                                    rows="4"
                                    value={remarks}
                                    onChange={(e) => setRemarks(e.target.value)}
                                    placeholder="Write additional details..."
                                    className="mt-2 w-full border rounded-xl p-3"
                                />

                            </div>

                            <div className="flex justify-end gap-3 mt-6">

                                <button
                                    onClick={closeReturnModal}
                                    className="px-5 py-2 border rounded-xl"
                                >
                                    Cancel
                                </button>

                                <button
                                    onClick={submitReturnRequest}
                                    className="px-6 py-2 bg-black text-[#C79D17] rounded-xl"
                                >
                                    Submit Request
                                </button>

                            </div>

                        </div>

                    </div>

                )}
            </div>

        </>
    );

};

export default OrderDetails;