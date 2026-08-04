import React from "react";
import {
  FiClock,
  FiPackage,
  FiTruck,
  FiCheckCircle,
  FiXCircle,
} from "react-icons/fi";

const OrderStatusBadge = ({ status = "Pending" }) => {
  const orderStatus = status.toLowerCase();

  const statusMap = {
    pending: {
      label: "Pending",
      icon: <FiClock size={16} />,
      className:
        "bg-gray-100 text-gray-700 border-gray-200",
    },

    processing: {
      label: "Processing",
      icon: <FiPackage size={16} />,
      className:
        "bg-blue-50 text-blue-700 border-blue-200",
    },

    shipped: {
      label: "Shipped",
      icon: <FiTruck size={16} />,
      className:
        "bg-yellow-50 text-yellow-700 border-yellow-200",
    },

    delivered: {
      label: "Delivered",
      icon: <FiCheckCircle size={16} />,
      className:
        "bg-green-50 text-green-700 border-green-200",
    },

    cancelled: {
      label: "Cancelled",
      icon: <FiXCircle size={16} />,
      className:
        "bg-red-50 text-red-700 border-red-200",
    },
  };

  const current =
    statusMap[orderStatus] || statusMap.pending;

  return (
    <div
      className={`
        inline-flex
        items-center
        gap-2
        px-4
        py-2
        rounded-full
        border
        font-semibold
        text-sm
        ${current.className}
      `}
    >
      {current.icon}

      <span>{current.label}</span>
    </div>
  );
};

export default OrderStatusBadge;