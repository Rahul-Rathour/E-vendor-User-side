import React, { useEffect, useMemo, useState } from "react";
import api from "../../api";
import { toast } from "react-toastify";

import OrdersHeader from "../../components/orders/OrdersHeader";
import OrdersFilter from "../../components/orders/OrdersFilter";
import OrderCard from "../../components/orders/OrderCard";
import OrdersEmptyState from "../../components/orders/OrdersEmptyState";
import FeaturesStrip from "../Cart/components/FeaturesStrip";

const MyOrders = () => {
    const [orders, setOrders] = useState([]);
    const [filteredOrders, setFilteredOrders] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("all");

    const user = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        if (!user) {
            toast.error("Please login first");
            setLoading(false);
            return;
        }

        try {
            const res = await api.get(`/myorders/${user.id}`);

            if (res.data.status) {
                const latestOrders = [...res.data.data].reverse();

                setOrders(latestOrders);
                setFilteredOrders(latestOrders);
            } else {
                setError(res.data.message);
            }
        } catch (err) {
            console.log(err);

            setError("Failed to load orders.");

            toast.error("Failed to load orders");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        let result = [...orders];

        // Search by Order Number

        if (search.trim()) {
            result = result.filter((order) =>
                order.order_number
                    ?.toLowerCase()
                    .includes(search.toLowerCase())
            );
        }

        // Filter by Status

        if (status !== "all") {
            result = result.filter(
                (order) =>
                    order.delivery_status?.toLowerCase() ===
                    status.toLowerCase()
            );
        }

        setFilteredOrders(result);
    }, [orders, search, status]);

    const totalOrders = orders.length;

    const deliveredOrders = useMemo(
        () =>
            orders.filter(
                (o) =>
                    o.delivery_status?.toLowerCase() ===
                    "delivered"
            ).length,
        [orders]
    );

    const pendingOrders = useMemo(
        () =>
            orders.filter(
                (o) =>
                    o.delivery_status?.toLowerCase() ===
                    "pending"
            ).length,
        [orders]
    );

    const cancelledOrders = useMemo(
        () =>
            orders.filter(
                (o) =>
                    o.delivery_status?.toLowerCase() ===
                    "cancelled"
            ).length,
        [orders]
    );
    return (
        <div className="bg-[#FAFAFA] min-h-screen">

            <OrdersHeader />

            <div className="max-w-[1400px] mx-auto px-4 pb-20">

                {/* Statistics */}

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-8">

                    <div className="bg-white rounded-2xl border p-6 shadow-sm">

                        <p className="text-gray-500 text-sm">
                            Total Orders
                        </p>

                        <h2 className="text-4xl font-bold mt-2 text-[#111]">
                            {totalOrders}
                        </h2>

                    </div>

                    <div className="bg-white rounded-2xl border p-6 shadow-sm">

                        <p className="text-gray-500 text-sm">
                            Delivered
                        </p>

                        <h2 className="text-4xl font-bold mt-2 text-green-600">
                            {deliveredOrders}
                        </h2>

                    </div>

                    <div className="bg-white rounded-2xl border p-6 shadow-sm">

                        <p className="text-gray-500 text-sm">
                            Pending
                        </p>

                        <h2 className="text-4xl font-bold mt-2 text-yellow-500">
                            {pendingOrders}
                        </h2>

                    </div>

                    <div className="bg-white rounded-2xl border p-6 shadow-sm">

                        <p className="text-gray-500 text-sm">
                            Cancelled
                        </p>

                        <h2 className="text-4xl font-bold mt-2 text-red-500">
                            {cancelledOrders}
                        </h2>

                    </div>

                </div>

                {/* Filters */}

                <OrdersFilter
                    search={search}
                    setSearch={setSearch}
                    status={status}
                    setStatus={setStatus}
                />

                {/* Loading */}

                {loading ? (

                    <div className="grid gap-6 mt-8">

                        {[1, 2, 3].map((item) => (

                            <div
                                key={item}
                                className="
                  h-52
                  rounded-2xl
                  bg-white
                  border
                  animate-pulse
                "
                            />

                        ))}

                    </div>

                ) : error ? (

                    <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center mt-8">

                        <h3 className="text-red-600 font-semibold text-xl">

                            {error}

                        </h3>

                    </div>

                ) : filteredOrders.length === 0 ? (

                    <OrdersEmptyState />

                ) : (

                    <div className="mt-8 space-y-6">

                        {filteredOrders.map((order) => (

                            <OrderCard
                                key={order.id}
                                order={order}
                            />

                        ))}

                    </div>

                )}
                {/* Bottom Features */}

                <FeaturesStrip />

            </div>

        </div>
    );
};

export default MyOrders;