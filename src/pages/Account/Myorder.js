import React, { useEffect, useState } from "react";
import api from '../../api';
import { FaBox, FaTruck, FaCheckCircle, FaClock, FaTimesCircle } from "react-icons/fa";
import HeaderCopy from "../../components/home/Header-copy/HeaderCopy";
import { Link } from "react-router-dom";
import BottomNav from "../../components/home/BottomNav/BottomNav";

const Myorders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const userId = JSON.parse(localStorage.getItem("user")); // Replace this with dynamic logged-in user ID (e.g., from context or localStorage)


  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await api.get(`/myorders/${userId.id}`);
        if (response.data.status) {
          setOrders([...response.data.data].reverse());
        } else {
          setError(response.data.message);
        }
      } catch (err) {
        setError("Failed to fetch orders.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const getStatusProps = (status) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return {
          icon: <FaCheckCircle className="text-green-600 text-xl" />,
          color: "text-green-600 bg-green-100"
        };

      case "shipped":
        return {
          icon: <FaTruck className="text-yellow-600 text-xl" />,
          color: "text-yellow-600 bg-yellow-100"
        };

      case "cancelled":
        return {
          icon: <FaTimesCircle className="text-red-600 text-xl" />,
          color: "text-red-600 bg-red-100"
        };

      default:
        return {
          icon: <FaClock className="text-gray-600 text-xl" />,
          color: "text-gray-600 bg-gray-100"
        };
    }

  };

  if (loading) {
    return <p className="text-center text-gray-600">Loading your orders...</p>;
  }

  if (error) {
    return <p className="text-center text-red-600">{error}</p>;
  }

  return (
    <>
      <HeaderCopy />
      <div className="space-y-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
          <span className="text-4xl">🛍️</span> My Orders
        </h2>

        {orders.length === 0 ? (
          <p className="text-gray-600 text-center">You have no orders yet.</p>
        ) : (
          orders.map((order) => {
            const { icon, color } = getStatusProps(order.delivery_status || "Pending");

            return (
              <div
                key={order.id}
                className="border rounded-xl p-6 shadow-md bg-gradient-to-r from-white via-blue-50 to-white hover:shadow-lg transition duration-300"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <FaBox className="text-blue-500 text-xl" />
                    <h3 className="text-xl font-semibold text-gray-700">
                      Order id #{order.id}
                    </h3>
                  </div>
                  <span
                    className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${color}`}
                  >
                    {icon} {order.delivery_status || "Pending"}
                  </span>
                </div>

                <div className="text-sm text-gray-600 space-y-1 pl-8">
                  <p>Date Placed: {new Date(order.created_at).toLocaleDateString()}</p>
                  <p>Total Amount: ₹{order.total_amount || "N/A"}</p>
                </div>

                <div className="text-right mt-4">
                  <Link to={`/order-details/${order.id}`}
                    state={{ status: order.delivery_status }}   // <-- SEND STATUS HERE
                    className="text-blue-700 hover:text-blue-900 text-sm underline font-medium">
                    View Details →
                  </Link>
                </div>
              </div>
            );
          })
        )}
      </div>
      <BottomNav/>
    </>
  );
};

export default Myorders;
