import React from "react";
import {
  FiCreditCard,
  FiTruck,
  FiShield,
  FiCheckCircle,
} from "react-icons/fi";

const PaymentMethodCard = ({
  paymentMethod,
  setPaymentMethod,
}) => {
  return (
    <div
      className="
        bg-white
        rounded-2xl
        border
        border-[#ECECEC]
        shadow-sm
        overflow-hidden
      "
    >
      {/* Header */}

      <div className="px-6 py-5 border-b">

        <div className="flex items-center gap-3">

          <div
            className="
              w-12
              h-12
              rounded-full
              bg-[#FFF7E8]
              flex
              items-center
              justify-center
            "
          >
            <FiCreditCard
              className="text-[#D4AF37]"
              size={22}
            />
          </div>

          <div>

            <h2 className="text-2xl font-bold text-[#111]">
              Payment Method
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Choose your preferred payment option.
            </p>

          </div>

        </div>

      </div>

      {/* Body */}

      <div className="p-6 space-y-5">

        {/* COD */}

        <label
          className={`
            flex
            items-start
            gap-5
            p-5
            rounded-2xl
            border-2
            cursor-pointer
            transition-all
            duration-300
            ${
              paymentMethod === "COD"
                ? "border-[#D4AF37] bg-[#FFF9EA]"
                : "border-gray-200 hover:border-[#D4AF37]"
            }
          `}
        >
          <input
            type="radio"
            name="payment"
            value="COD"
            checked={paymentMethod === "COD"}
            onChange={() => setPaymentMethod("COD")}
            className="mt-1 accent-[#D4AF37] w-5 h-5"
          />

          <div className="flex-1">

            <div className="flex items-center gap-3">

              <div
                className="
                  w-12
                  h-12
                  rounded-full
                  bg-[#FFF3D6]
                  flex
                  items-center
                  justify-center
                "
              >
                <FiTruck
                  className="text-[#D4AF37]"
                  size={22}
                />
              </div>

              <div>

                <h3 className="font-bold text-lg">
                  Cash on Delivery
                </h3>

                <p className="text-gray-500 text-sm">
                  Pay when your order is delivered.
                </p>

              </div>

            </div>

            <div className="mt-4 flex flex-wrap gap-3">

              <span className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full">
                No Advance Payment
              </span>

              <span className="bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full">
                Safe & Reliable
              </span>

            </div>

          </div>

          {paymentMethod === "COD" && (
            <FiCheckCircle
              className="text-[#D4AF37]"
              size={24}
            />
          )}
        </label>

        {/* Razorpay */}

        <label
          className={`
            flex
            items-start
            gap-5
            p-5
            rounded-2xl
            border-2
            cursor-pointer
            transition-all
            duration-300
            ${
              paymentMethod === "Online"
                ? "border-[#D4AF37] bg-[#FFF9EA]"
                : "border-gray-200 hover:border-[#D4AF37]"
            }
          `}
        >
          <input
            type="radio"
            name="payment"
            value="Online"
            checked={paymentMethod === "Online"}
            onChange={() => setPaymentMethod("Online")}
            className="mt-1 accent-[#D4AF37] w-5 h-5"
          />

          <div className="flex-1">

            <div className="flex items-center gap-3">

              <div
                className="
                  w-12
                  h-12
                  rounded-full
                  bg-[#EEF5FF]
                  flex
                  items-center
                  justify-center
                "
              >
                <FiCreditCard
                  className="text-blue-600"
                  size={22}
                />
              </div>

              <div>

                <h3 className="font-bold text-lg">
                  Online Payment
                </h3>

                <p className="text-gray-500 text-sm">
                  Pay securely using Razorpay.
                </p>

              </div>

            </div>

            <div className="mt-4 flex flex-wrap gap-3">

              <span className="bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full">
                UPI
              </span>

              <span className="bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full">
                Credit Card
              </span>

              <span className="bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full">
                Debit Card
              </span>

              <span className="bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full">
                Net Banking
              </span>

            </div>

          </div>

          {paymentMethod === "Online" && (
            <FiCheckCircle
              className="text-[#D4AF37]"
              size={24}
            />
          )}
        </label>

        {/* Secure Notice */}

        <div
          className="
            mt-2
            rounded-2xl
            bg-[#F8F8F8]
            border
            p-5
          "
        >
          <div className="flex gap-4">

            <div
              className="
                w-12
                h-12
                rounded-full
                bg-[#FFF7E8]
                flex
                items-center
                justify-center
                shrink-0
              "
            >
              <FiShield
                className="text-[#D4AF37]"
                size={22}
              />
            </div>

            <div>

              <h4 className="font-semibold text-[#111]">
                100% Secure Payment
              </h4>

              <p className="text-sm text-gray-500 mt-1 leading-6">
                Your transactions are encrypted and protected.
                We never store your payment details. Razorpay
                ensures industry-standard payment security.
              </p>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default PaymentMethodCard;