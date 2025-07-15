import React from "react";
import { FaBox, FaTruck, FaCheckCircle } from "react-icons/fa";

const Myorders = () => {
  const orders = [
    {
      id: "123456",
      date: "1st July 2025",
      status: "Delivered",
      total: "₹1,999.00",
      icon: <FaCheckCircle className="text-green-600 text-xl" />,
      statusColor: "text-green-600 bg-green-100",
    },
    {
      id: "789012",
      date: "28th June 2025",
      status: "Shipped",
      total: "₹899.00",
      icon: <FaTruck className="text-yellow-600 text-xl" />,
      statusColor: "text-yellow-600 bg-yellow-100",
    },
  ];

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">🛍 My Orders</h2>

      {orders.map((order) => (
        <div
          key={order.id}
          className="border rounded-xl p-6 shadow-md bg-gradient-to-r from-white via-blue-50 to-white hover:shadow-lg transition duration-300"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-3">
              <FaBox className="text-blue-500 text-xl" />
              <h3 className="text-xl font-semibold text-gray-700">
                Order #{order.id}
              </h3>
            </div>
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${order.statusColor}`}
            >
              {order.icon} {order.status}
            </span>
          </div>

          <div className="text-sm text-gray-600 space-y-1 pl-8">
            <p>Date Placed: {order.date}</p>
            <p>Total Amount: {order.total}</p>
          </div>

          <div className="text-right mt-4">
            <button className="text-blue-700 hover:text-blue-900 text-sm underline font-medium">
              View Details →
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Myorders;
