import React from "react";
import { FiSearch } from "react-icons/fi";

const orderStatuses = [
  "All",
  "Pending",
  "Processing",
  "Shipped",
  "Delivered",
  "Cancelled",
];

const OrdersFilter = ({
  search,
  setSearch,
  selectedStatus,
  setSelectedStatus,
}) => {
  return (
    <section className="mb-8">

      <div className="bg-white border border-[#EFE8DA] rounded-2xl shadow-sm p-6">

        <div className="flex flex-col lg:flex-row gap-6 lg:items-center lg:justify-between">

          {/* Search */}

          <div className="relative w-full lg:max-w-md">

            <FiSearch
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />

            <input
              type="text"
              placeholder="Search Order ID..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="
                w-full
                h-[52px]
                pl-12
                pr-4
                rounded-xl
                border
                border-[#E5E5E5]
                outline-none
                focus:border-[#D4AF37]
                transition
              "
            />

          </div>

          {/* Status */}

          <div className="flex flex-wrap gap-3">

            {orderStatuses.map((status) => (

              <button
                key={status}
                onClick={() => setSelectedStatus(status)}
                className={`
                  px-5
                  h-[46px]
                  rounded-full
                  font-medium
                  transition-all
                  duration-300
                  ${
                    selectedStatus === status
                      ? "bg-[#D4AF37] text-black shadow-md"
                      : "bg-[#F7F7F7] text-gray-600 hover:bg-[#FFF7E6]"
                  }
                `}
              >
                {status}
              </button>

            ))}

          </div>

        </div>

      </div>

    </section>
  );
};

export default OrdersFilter;