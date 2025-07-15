import React, { useState } from "react";
import Header from "../../components/home/Header/Header";
import Footer from "../../components/home/Footer/Footer"; // Import Footer


const Myprofile = () => {
    const [userInfo, setUserInfo] = useState({
        firstName: "Preeti",
        lastName: "Sharma",
        gender: "female",
        email: "preeti@email.com",
        phone: "9876543210",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserInfo({ ...userInfo, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Profile updated successfully!");
        // 🔐 Send updated data to backend here
    };

    return (
        <>
            
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white p-4">
                <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg flex overflow-hidden">

                   { /* Main Content */}
                    <div className="flex-1 p-8">
                        <h2 className="text-2xl font-semibold mb-6 text-gray-800">Edit Personal Information</h2>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                                    <input
                                        type="text"
                                        name="firstName"
                                        value={userInfo.firstName}
                                        onChange={handleChange}
                                        className="w-full border border-gray-300 p-2 rounded focus:outline-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                                    <input
                                        type="text"
                                        name="lastName"
                                        value={userInfo.lastName}
                                        onChange={handleChange}
                                        className="w-full border border-gray-300 p-2 rounded focus:outline-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                                    <div className="space-x-4 mt-2">
                                        <label>
                                            <input
                                                type="radio"
                                                name="gender"
                                                value="male"
                                                checked={userInfo.gender === "male"}
                                                onChange={handleChange}
                                            /> Male
                                        </label>
                                        <label>
                                            <input
                                                type="radio"
                                                name="gender"
                                                value="female"
                                                checked={userInfo.gender === "female"}
                                                onChange={handleChange}
                                            /> Female
                                        </label>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={userInfo.email}
                                        onChange={handleChange}
                                        className="w-full border border-gray-300 p-2 rounded focus:outline-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
                                    <input
                                        type="text"
                                        name="phone"
                                        value={userInfo.phone}
                                        onChange={handleChange}
                                        className="w-full border border-gray-300 p-2 rounded focus:outline-blue-500"
                                    />
                                </div>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    className="bg-purple-700 text-white font-semibold px-6 py-2 rounded hover:bg-gray-600 transition"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </form>

                        {/* FAQ Section */}
                        <div className="mt-10">
                            <h3 className="text-2xl font-semibold text-gray-800 mb-2 flex items-center justify-center">FAQs</h3>
                            <p><strong>What happens when I update my email address (or mobile number)?</strong><br />
                                Your login email id (or mobile number) changes, likewise. You'll receive all your account related communication on your updated email address (or mobile number).
                                <br /><br />
                                <strong>When will my Flipkart account be updated with the new email address (or mobile number)?</strong><br />
                                It happens as soon as you confirm the verification code sent to your email (or mobile) and save the changes.
                                <br /><br />
                                <strong>What happens to my existing Flipkart account when I update my email address (or mobile number)?</strong> <br />
                                Updating your email address (or mobile number) doesn't invalidate your account. Your account remains fully functional. You'll continue seeing your Order history, saved information and personal details.
                                <br /><br />
                                <strong> Does my Seller account get affected when I update my email address?</strong><br />
                                Flipkart has a 'single sign-on' policy. Any changes will reflect in your Seller account also.</p>

                            <button className="mt-3 text-red-500 hover:underline text-sm">Deactivate Account</button>
                        </div>
                    </div>
                </div>
            </div>
        
        </>
    )
}

export default Myprofile;
