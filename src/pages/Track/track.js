import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Copy, ExternalLink } from "lucide-react";
import api from "../../api";

const Track = () => {
    const { id } = useParams();

    const [order, setOrder] = useState(null);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        fetchOrder();
    }, []);

    const fetchOrder = async () => {
        try {
            const res = await api.get(`/order_detail/${id}`);

            const orderData = res.data?.data?.[0];

            setOrder(orderData);
        } catch (err) {
            console.error("Order fetch error:", err);
        }
    };

    const copyTrackingId = async () => {
        try {
            await navigator.clipboard.writeText(order.tracking_id);

            setCopied(true);

            setTimeout(() => {
                setCopied(false);
            }, 2000);
        } catch (err) {
            console.error("Copy failed:", err);
        }
    };

    if (!order) {
        return (
            <div className="text-center mt-10">
                Loading...
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto bg-white shadow rounded-lg p-6 mt-6">
            <h2 className="text-2xl font-bold mb-6">
                Track Your Order
            </h2>

            <div className="space-y-4">

                <div>
                    <p className="text-sm text-gray-500">
                        Order Number
                    </p>
                    <p className="font-medium">
                        {order.order_number}
                    </p>
                </div>

                <div>
                    <p className="text-sm text-gray-500">
                        Delivery Status
                    </p>
                    <p className="font-medium capitalize">
                        {order.delivery_status}
                    </p>
                </div>

                <div>
                    <p className="text-sm text-gray-500">
                        Delivery Partner
                    </p>
                    <p className="font-medium">
                        {order.delivery_partner?.name}
                    </p>
                </div>

                <div>
                    <p className="text-sm text-gray-500 mb-2">
                        Tracking ID
                    </p>

                    <div className="flex items-center gap-2">
                        <input
                            type="text"
                            readOnly
                            value={order.tracking_id}
                            className="flex-1 border rounded px-3 py-2 bg-gray-50"
                        />

                        <button
                            onClick={copyTrackingId}
                            className="px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                        >
                            <Copy size={18} />
                        </button>
                    </div>

                    {copied && (
                        <p className="text-green-600 text-sm mt-1">
                            Tracking ID copied!
                        </p>
                    )}
                </div>

                <div className="pt-4">
                    <a
                        href={order.delivery_partner?.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                    >
                        Track on {order.delivery_partner?.name}
                        <ExternalLink size={18} />
                    </a>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded p-3 text-sm text-yellow-800">
                    Copy the Tracking ID and paste it on the delivery partner's
                    tracking page after opening their website.
                </div>

            </div>
        </div>
    );
};

export default Track;