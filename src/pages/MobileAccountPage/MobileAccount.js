import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaBoxOpen,
  FaHeart,
  FaTicketAlt,
  FaHeadset,
  FaUserCircle,
} from "react-icons/fa";
import api from "../../api";
import HeaderCopy from "../../components/home/Header-copy/HeaderCopy";
import BottomNav from "../../components/home/BottomNav/BottomNav";

const MobileAccount = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ Redirect desktop users
  // useEffect(() => {
  //   if (window.innerWidth >= 768) {
  //     navigate("/");
  //   }
  // }, [navigate]);

  // ✅ Fetch user info
  useEffect(() => {
    const fetchUser = async () => {
      try {
        // Get user ID from localStorage (you can change this as per your auth system)
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (!storedUser || !storedUser.id) {
          navigate("/login");
          return;
        }

        const response = await api.get(`/user/${storedUser.id}`);
        if (response.data.status) {
          setUser(response.data.data);
        } else {
          console.error("User not found");
        }
      } catch (err) {
        console.error("Error fetching user details:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [navigate]);

  // ✅ Handle logout
  const handleLogout = () => {
    navigate("/logout");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-500">
        Loading your account...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-500">
        No user data found.
      </div>
    );
  }

  return (
    <>
      <HeaderCopy />
      <div className="block p-4 bg-gray-50 min-h-screen space-y-6">
        {/* Profile Header */}
        <div className="bg-white rounded-xl p-4 shadow-md flex items-center gap-4">
          {user.profile_image ? (
            <img
              src={`${process.env.REACT_APP_API_URL}/storage/${user.profile_image}`}
              alt="User Avatar"
              className="w-14 h-14 rounded-full object-cover"
            />
          ) : (
            <FaUserCircle size={50} className="text-gray-500" />
          )}
          <div>
            <h2 className="text-lg font-semibold capitalize">{user.name}</h2>
            <p className="text-xs text-gray-500">
              {user.membership || "Standard Member"}
            </p>
            <p className="text-xs text-gray-400">{user.email}</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl p-4 shadow-md grid grid-cols-2 gap-4">
          <Link
            to="/profile"
            className="flex items-center gap-2 p-3 bg-blue-50 text-blue-700 rounded-lg shadow-sm hover:bg-blue-100 transition"
          >
            <FaBoxOpen /> Edit Profile
          </Link>
          <Link
            to="/wishlist"
            className="flex items-center gap-2 p-3 bg-pink-50 text-pink-700 rounded-lg shadow-sm hover:bg-pink-100 transition"
          >
            <FaHeart /> Wishlist
          </Link>
          <Link
            to="/order"
            className="flex items-center gap-2 p-3 bg-green-50 text-green-700 rounded-lg shadow-sm hover:bg-green-100 transition"
          >
            <FaTicketAlt /> Orders
          </Link>
          <Link
            to="/addresses"
            className="flex items-center gap-2 p-3 bg-yellow-50 text-yellow-700 rounded-lg shadow-sm hover:bg-yellow-100 transition"
          >
            <FaHeadset /> Saved Address
          </Link>
        </div>

        {/* Section: My Orders */}
        <div className="bg-white rounded-xl p-4 shadow-md">
          <h3 className="text-gray-600 font-semibold mb-3">MY ORDERS</h3>
          <ul>
            <li>
              <Link to="/order" className="text-blue-600 hover:underline">
                My Orders
              </Link>
            </li>
          </ul>
        </div>

        {/* Section: Account Settings */}
        <div className="bg-white rounded-xl p-4 shadow-md">
          <h3 className="text-gray-600 font-semibold mb-3">ACCOUNT SETTINGS</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/profile" className="text-blue-600 hover:underline">
                Profile Information
              </Link>
            </li>
            <li>
              <Link to="/addresses" className="text-blue-600 hover:underline">
                Manage Addresses
              </Link>
            </li>
            <li>
              <Link
                to="/account/pan-password"
                className="text-blue-600 hover:underline"
              >
                PAN & Password Settings
              </Link>
            </li>
          </ul>
        </div>

        {/* Section: My Stuff */}
        <div className="bg-white rounded-xl p-4 shadow-md">
          <h3 className="text-gray-600 font-semibold mb-3">MY STUFF</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/wishlist" className="text-blue-600 hover:underline">
                Wishlist
              </Link>
            </li>
            <li>
              <Link to="/review" className="text-blue-600 hover:underline">
                Reviews
              </Link>
            </li>
          </ul>
        </div>

        {/* Logout */}
        <div className="text-center">
          <button
            onClick={handleLogout}
            className="text-red-600 font-semibold hover:underline text-sm mt-2"
          >
            Logout
          </button>
        </div>
      </div>
      <BottomNav />
    </>
  );
};

export default MobileAccount;
