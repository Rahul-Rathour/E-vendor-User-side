import React from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import Header from "../../components/home/Header/Header";
import Footer from "../../components/home/Footer/Footer";

const AccountLayout = () => {
  const location = useLocation();

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white p-4">
        <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg flex overflow-hidden">
          {/* Sidebar */}
          <div className="w-64 bg-gray-50 p-6">
            <div className="mb-6">
              <div className="text-xl font-semibold text-gray-700">Preeti Sharma</div>
              <div className="text-sm text-blue-600">Edit Profile</div>
            </div>

            <div className="space-y-6 text-md">
              <div>
                <h3 className="text-gray-600 font-semibold mb-5">MY ORDERS</h3>
                <ul>
                  <li>
                    <Link to="order" className={`hover:text-blue-600 ${location.pathname.includes("order") ? "text-blue-700 font-semibold" : ""}`}>My Order</Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-gray-600 font-semibold mb-2">ACCOUNT SETTINGS</h3>
                <ul className="space-y-4">
                  <li>
                    <Link to="profile" className={`hover:text-blue-600 ${location.pathname.includes("profile") ? "text-blue-700 font-semibold" : ""}`}>Profile Information</Link>
                  </li>
                  <li>
                    <Link to="addresses" className={`hover:text-blue-600 ${location.pathname.includes("addresses") ? "text-blue-700 font-semibold" : ""}`}>Manage Addresses</Link>
                  </li>
                  <li>
                    <Link to="/account/pan-password" className="hover:text-blue-600">PAN & Password Settings</Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-gray-600 font-semibold mb-2">MY STUFF</h3>
                <ul className="space-y-4">
                  <li>
                    <Link to="/wishlist" className="hover:text-blue-600">Wishlist</Link>
                  </li>
                  <li>
                    <Link to="review" className={`hover:text-blue-600 ${location.pathname.includes("review") ? "text-blue-700 font-semibold" : ""}`}>Review</Link>
                  </li>
                </ul>
              </div>
              <div>
                <button className="text-red-600 text-sm hover:underline mt-4">Logout</button>
              </div>
            </div>
          </div>

          {/* Main content changes here */}
          <div className="flex-1 p-8">
            <Outlet /> {/* 🔄 This will render sub-routes dynamically */}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AccountLayout;
