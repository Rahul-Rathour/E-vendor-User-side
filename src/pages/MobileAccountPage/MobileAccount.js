import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api";
import { toast } from "react-toastify";

import HeaderCopy from "../../components/home/Header-copy/HeaderCopy";
import BottomNav from "../../components/home/BottomNav/BottomNav";

import AccountHeader from "../../components/account/AccountHeader";
import AccountQuickActions from "../../components/account/AccountQuickActions";
import AccountOrdersCard from "../../components/account/AccountOrdersCard";
import AccountSettingsCard from "../../components/account/AccountSettingsCard";
import AccountMyStuffCard from "../../components/account/AccountMyStuffCard";
import AccountSupportCard from "../../components/account/AccountSupportCard";

const MobileAccount = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ==========================
  // FETCH USER
  // ==========================

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const storedUser = JSON.parse(localStorage.getItem("user"));

        if (!storedUser || !storedUser.id) {
          toast.warning("Please login first");
          navigate("/login");
          return;
        }

        const res = await api.get(`/user/${storedUser.id}`);

        if (res.data.status) {
          setUser(res.data.data);
        } else {
          toast.error("User not found");
        }
      } catch (err) {
        console.log(err);
        toast.error("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [navigate]);

  // ==========================
  // LOGOUT
  // ==========================

  const handleLogout = () => {
    navigate("/logout");
  };

  // ==========================
  // LOADING
  // ==========================

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-gray-500">
        Loading your account...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex justify-center items-center text-gray-500">
        No user data found.
      </div>
    );
  }

  // ==========================
  // UI
  // ==========================

  return (
    <>

      <div className="bg-[#F7F7F7] min-h-screen pb-24">

        <div className="max-w-[1400px] mx-auto">

          {/* Profile */}

          <AccountHeader
            user={user}
            onLogout={handleLogout}
          />

          {/* Quick Actions */}

          <div className="mt-5">
            <AccountQuickActions />
          </div>

          {/* Orders */}

          <div className="mt-5">
            <AccountOrdersCard />
          </div>

          {/* Account Settings */}

          <div className="mt-5">
            <AccountSettingsCard />
          </div>

          {/* My Stuff */}

          <div className="mt-5">
            <AccountMyStuffCard />
          </div>

          {/* Support */}

          <div className="mt-5">
            <AccountSupportCard />
          </div>

        </div>

      </div>

      
    </>
  );
};

export default MobileAccount;