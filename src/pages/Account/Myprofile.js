import React, { useEffect, useState } from "react";
import Header from "../../components/home/Header/Header";
import Footer from "../../components/home/Footer/Footer";
import api from "../../api";

const Myprofile = () => {
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (!storedUser?.id) return;

        const res = await api.get(`/user/${storedUser.id}`);
        setUserInfo(res.data.data); // ✅ correct response path
        setLoading(false);
      } catch (err) {
        console.error("Error fetching user:", err);
        setLoading(false);
      }
    };

    fetchUser(); // ✅ directly call here
  }, []); // ✅ no need to put localStorage here

  // Handle input changes
  const handleChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const storedUser = JSON.parse(localStorage.getItem("user"));
      const res = await api.post(`/update-user/${storedUser.id}`, userInfo);

      setUserInfo(res.data.data); // ✅ correct response path
      setMessage("✅ Profile updated successfully!");
      setLoading(false);
    } catch (err) {
      console.error("Error updating user:", err);
      setMessage("❌ Failed to update user.");
      setLoading(false);
    }
  };

  return (
    <>
      {/* <Header /> */}

      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white p-4">
        <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg flex overflow-hidden">
          {/* Main Content */}
          <div className="flex-1 p-8">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">
              Edit Personal Information
            </h2>

            {loading ? (
              <p className="text-center text-gray-500">Loading...</p>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={userInfo.name}
                      onChange={handleChange}
                      className="w-full border border-gray-300 p-2 rounded focus:outline-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={userInfo.email}
                      onChange={handleChange}
                      className="w-full border border-gray-300 p-2 rounded focus:outline-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Mobile Number
                    </label>
                    <input
                      type="text"
                      name="phone"
                      value={userInfo.phone}
                      onChange={handleChange}
                      className="w-full border border-gray-300 p-2 rounded focus:outline-blue-500"
                    />
                  </div>
                </div>

                {message && (
                  <p className="text-center text-green-600 font-medium">
                    {message}
                  </p>
                )}

                <div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-purple-700 text-white font-semibold px-6 py-2 rounded hover:bg-purple-800 transition"
                  >
                    {loading ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              </form>
            )}

            {/* FAQ Section */}
            <div className="mt-10">
              <h3 className="text-2xl font-semibold text-gray-800 mb-2 text-center">
                FAQs
              </h3>
              <p>
                <strong>What happens when I update my email address (or mobile number)?</strong><br />
                Your login email or mobile number changes immediately. All future communications will use your updated details.
                <br /><br />
                <strong>When will my account be updated?</strong><br />
                Instantly, once you save the changes.
                <br /><br />
                <strong>Does updating affect my old data?</strong><br />
                No, your order history and profile data remain intact.
              </p>
              <button className="mt-3 text-red-500 hover:underline text-sm">
                Deactivate Account
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Myprofile;
