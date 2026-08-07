import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FiChevronRight,
  FiCalendar,
  FiCreditCard,
  FiMapPin,
  FiTag,
  FiTruck,
} from "react-icons/fi";

import OrderStatusBadge from "./OrderStatusBadge";

const OrderCard = ({ order }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() =>
        navigate(`/order-details/${order.id}`,{
          state:{
            status:order.delivery_status
          }
        })
      }
      className="
        bg-white
        border
        border-[#ECECEC]
        rounded-2xl
        shadow-sm
        hover:shadow-lg
        transition-all
        duration-300
        cursor-pointer
        overflow-hidden
      "
    >
      {/* Header */}

      <div className="px-6 py-5 border-b flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

        <div>

          <p className="text-sm text-gray-500">
            Order Number
          </p>

          <h2 className="text-2xl font-bold text-[#111]">
            {order.order_number}
          </h2>

        </div>

        <OrderStatusBadge
          status={order.delivery_status}
        />

      </div>

      {/* Body */}

      <div className="p-6">

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

          {/* Date */}

          <div className="flex gap-3">

            <FiCalendar
              size={20}
              className="text-[#D4AF37] mt-1"
            />

            <div>

              <p className="text-sm text-gray-500">
                Order Date
              </p>

              <h4 className="font-semibold">
                {new Date(
                  order.created_at
                ).toLocaleDateString()}
              </h4>

            </div>

          </div>

          {/* Payment */}

          <div className="flex gap-3">

            <FiCreditCard
              size={20}
              className="text-[#D4AF37] mt-1"
            />

            <div>

              <p className="text-sm text-gray-500">
                Payment
              </p>

              <h4 className="font-semibold">
                {order.payment_method}
              </h4>

            </div>

          </div>

          {/* Coupon */}

          <div className="flex gap-3">

            <FiTag
              size={20}
              className="text-[#D4AF37] mt-1"
            />

            <div>

              <p className="text-sm text-gray-500">
                Coupon
              </p>

              <h4 className="font-semibold">
                {order.applied_coupon}
              </h4>

            </div>

          </div>

          {/* Total */}

          <div>

            <p className="text-sm text-gray-500">
              Total Amount
            </p>

            <h2 className="text-3xl font-bold text-[#D4AF37]">
              ₹{Number(order.total_amount).toFixed(2)}
            </h2>

          </div>

        </div>

        {/* Address */}

        <div className="mt-6 pt-5 border-t">

          <div className="flex gap-3">

            <FiMapPin
              size={20}
              className="text-[#D4AF37] mt-1"
            />

            <div>

              <p className="text-sm text-gray-500">
                Shipping Address
              </p>

              <p className="font-medium">
                {order.shipping_address}
              </p>

            </div>

          </div>

        </div>

        {/* Bottom */}

        <div className="mt-6 pt-5 border-t flex flex-col md:flex-row md:items-center md:justify-between gap-4">

          <div className="flex flex-wrap gap-3">

            <span className="px-4 py-2 rounded-full bg-[#FFF8E8] text-[#B98B10] text-sm font-semibold">

              {order.type === 0
                ? "General Order"
                : "Wholesale Order"}

            </span>

            {order.tracking_id && (

              <span className="px-4 py-2 rounded-full bg-blue-50 text-blue-700 text-sm font-semibold flex items-center gap-2">

                <FiTruck />

                {order.tracking_id}

              </span>

            )}

          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/order-details/${order.id}`);
            }}
            className="
              flex
              items-center
              gap-2
              text-[#D4AF37]
              font-semibold
              hover:gap-3
              transition-all
            "
          >
            View Details

            <FiChevronRight />
          </button>

        </div>

      </div>

    </div>
  );
};

export default OrderCard;