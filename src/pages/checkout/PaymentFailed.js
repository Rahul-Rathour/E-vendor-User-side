import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { AlertTriangle, RefreshCw, Home, Lock, Shield } from "lucide-react";

const PaymentFailed = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-100 via-white to-orange-100 flex items-center justify-center p-4 sm:p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-xl"
      >
        <div className="bg-white/90 backdrop-blur-xl shadow-2xl rounded-2xl sm:rounded-3xl border border-red-100 overflow-hidden">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-red-600 to-orange-500 py-8 sm:py-10 px-4 sm:px-6 text-center">
            <motion.div
              initial={{ scale: 0.85 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6 }}
              className="flex justify-center"
            >
              <AlertTriangle className="w-16 h-16 sm:w-20 sm:h-20 text-white drop-shadow-xl" />
            </motion.div>

            <h1 className="text-2xl sm:text-4xl font-extrabold text-white mt-3 sm:mt-4">
              Payment Failed
            </h1>

            <p className="text-white/80 mt-2 text-xs sm:text-sm">
              Something went wrong while processing your payment.
            </p>
          </div>

          {/* Content */}
          <div className="px-5 sm:px-8 py-8 sm:py-10 text-center">
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-6 sm:mb-8">
              Don’t worry — your card was not charged. This might be caused by incorrect details, insufficient funds, or a temporary bank issue.
            </p>

            {/* Error Box */}
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 sm:p-5 text-left mb-7 sm:mb-8 shadow-sm">
              <p className="text-red-800 font-semibold mb-2 flex items-center gap-2 text-xs sm:text-sm">
                <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5" />
                Possible reasons:
              </p>
              <ul className="text-red-700 space-y-1 text-xs sm:text-sm">
                <li>• Invalid or expired card</li>
                <li>• Insufficient balance</li>
                <li>• Bank declined the transaction</li>
              </ul>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mt-4">
              <Link
                to="/cart"
                className="bg-red-600 hover:bg-red-700 text-white text-sm sm:text-base font-semibold py-3 sm:py-4 px-6 sm:px-8 rounded-xl shadow-md transform hover:scale-[1.03] transition-all flex items-center gap-2 justify-center"
              >
                <RefreshCw className="w-4 h-4 sm:w-5 sm:h-5" />
                Retry Payment
              </Link>

              <Link
                to="/"
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm sm:text-base font-semibold py-3 sm:py-4 px-6 sm:px-8 rounded-xl shadow-sm transition flex items-center gap-2 justify-center"
              >
                <Home className="w-4 h-4 sm:w-5 sm:h-5" />
                Home
              </Link>
            </div>

            {/* Support */}
            <div className="mt-8 sm:mt-10 pt-6 sm:pt-8 border-t border-gray-200">
              <p className="text-gray-500 text-xs sm:text-sm mb-1">Need assistance?</p>
              <a
                href="mailto:support@yourstore.com"
                className="text-red-600 font-medium hover:underline text-xs sm:text-sm"
              >
                support@yourstore.com
              </a>

              <div className="flex items-center justify-center gap-4 sm:gap-6 mt-5 text-[10px] sm:text-xs text-gray-500">
                <span className="flex items-center gap-1">
                  <Lock className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  Secure Payments
                </span>
                <span className="flex items-center gap-1">
                  <Shield className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  Encrypted Processing
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-gray-400 text-[10px] sm:text-xs mt-5 sm:mt-6">
          © 2025 YourStore — Payments are 100% secure.
        </p>
      </motion.div>
    </div>
  );
};

export default PaymentFailed;
