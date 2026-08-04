import React, { useState } from "react";
import { BsCheckCircleFill } from "react-icons/bs";
import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaPhoneAlt,
} from "react-icons/fa";

import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { logoLight } from "../../assets/images";
import logonew from '../../assets/images/logonew.jpg';
import api from "../../api"; // Keep your API instance
import Header from "../../components/home/Header/Header";
import Footer from "../../components/home/Footer/Footer";
import BottomNav from "../../components/home/BottomNav/BottomNav";

const SignUp = () => {
  // State for form fields
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [checked, setChecked] = useState(false);

  // State for errors and success
  const [error, setError] = useState({});
  const [successMsg, setSuccessMsg] = useState("");
  const navigate = useNavigate();

  // Email validation helper
  const EmailValidation = (email) => {
    return String(email)
      .toLowerCase()
      .match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i);
  };

  // Submit handler
  const handleSignUp = async (e) => {
    e.preventDefault();
    const newError = {};

    if (!checked) {
      alert("Please agree to the Terms and Privacy Policy.");
      return;
    }

    if (!name.trim()) newError.name = "Enter your name";
    if (!email.trim()) newError.email = "Enter your email";
    else if (!EmailValidation(email)) newError.email = "Enter a valid email";
    if (!phone.trim()) newError.phone = "Enter your phone number";
    if (!password.trim()) newError.password = "Enter your password";
    else if (password.length < 6)
      newError.password = "Password must be at least 6 characters";

    setError(newError);

    if (Object.keys(newError).length > 0) return;

    try {
      const res = await api.post("/create-user", {
        name,
        email,
        phone,
        password,
      });

      if (res.data.status) {
        setSuccessMsg(
          `Hello ${name}, your account has been created successfully! Please login to continue.`
        );
        setName("");
        setEmail("");
        setPhone("");
        setPassword("");
        setChecked(false);
      } else {
        setError({ general: res.data.message || "Registration failed." });
      }
    } catch (err) {
      setError({
        general: err?.response?.data?.error_message || err.message,
      });
    }
  };

  return (
    <>
      {/* <Header /> */}

      <div className="min-h-screen bg-white">
        <div className="flex flex-col lg:flex-row min-h-screen">

          {/* ================= Left Banner ================= */}

          <div className="relative lg:w-1/2 bg-black overflow-hidden">

            <img
              src={logonew}
              alt="Signup Banner"
              className="absolute inset-0 w-full h-full object-cover opacity-60"
            />

            <div className="absolute inset-0 bg-gradient-to-r from-black/90 to-black/40"></div>

            <div className="relative z-10 flex flex-col h-full px-8 md:px-16 py-16 text-white">

              <p className="uppercase tracking-[8px] text-[#C79D17] text-sm md:text-lg mb-4">
                JOIN BLACK HEWZEN
              </p>

              <h1 className="text-5xl md:text-7xl font-bold mb-4">
                Sign Up
              </h1>

              <div className="w-20 h-[2px] bg-[#C79D17] mb-6"></div>

              <p className="text-lg md:text-2xl leading-relaxed max-w-md">
                Create your account to enjoy
                <br />
                Premium Shopping Experience
              </p>

            </div>
          </div>

          {/* ================= Right Form ================= */}

          <div className="lg:w-1/2 flex items-center justify-center px-6 py-12 bg-white">

            {successMsg ? (

              <div className="w-full max-w-xl text-center">

                <h2 className="text-4xl font-serif mb-6">
                  Registration Successful
                </h2>

                <p className="text-green-600 text-lg mb-8">
                  {successMsg}
                </p>

                <button
                  onClick={() => navigate("/login")}
                  className="w-full h-14 rounded-xl bg-black text-[#C79D17] text-lg font-semibold hover:bg-neutral-900 transition"
                >
                  Login →
                </button>

              </div>

            ) : (

              <form
                onSubmit={handleSignUp}
                autoComplete="off"
                className="w-full max-w-xl"
              >

                <h2 className="text-5xl font-serif text-center text-gray-900">
                  Create Account
                </h2>

                <div className="flex justify-center items-center gap-4 mt-4">

                  <div className="w-14 h-px bg-[#C79D17]"></div>

                  <img
                    src={logonew}
                    alt=""
                    className="w-8 h-8 object-contain"
                  />

                  <div className="w-14 h-px bg-[#C79D17]"></div>

                </div>

                <p className="text-center text-gray-500 mt-4 mb-10">
                  Create your account to continue
                </p>

                {/* General Error */}

                {error.general && (
                  <p className="text-red-500 text-center mb-5 font-medium">
                    {error.general}
                  </p>
                )}

                {/* ================= Full Name ================= */}

                <div className="mb-5">

                  <label className="block mb-2 text-gray-700 font-medium">
                    Full Name
                  </label>

                  <div className="relative">

                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="John Doe"
                      className="w-full h-14 rounded-xl border border-gray-300 px-5 outline-none focus:border-[#C79D17]"
                    />

                  </div>

                  {error.name && (
                    <p className="text-red-500 text-sm mt-2">
                      {error.name}
                    </p>
                  )}

                </div>

                {/* ================= Email ================= */}

                <div className="mb-5">

                  <label className="block mb-2 text-gray-700 font-medium">
                    Email
                  </label>

                  <div className="relative">

                    <FaEnvelope className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" />

                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full h-14 rounded-xl border border-gray-300 pl-14 pr-5 outline-none focus:border-[#C79D17]"
                    />

                  </div>

                  {error.email && (
                    <p className="text-red-500 text-sm mt-2">
                      {error.email}
                    </p>
                  )}

                </div>

                {/* ================= Phone ================= */}

                <div className="mb-5">

                  <label className="block mb-2 text-gray-700 font-medium">
                    Phone Number
                  </label>

                  <div className="relative">

                    <FaPhoneAlt className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" />

                    <input
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="9876543210"
                      className="w-full h-14 rounded-xl border border-gray-300 pl-14 pr-5 outline-none focus:border-[#C79D17]"
                    />

                  </div>

                  {error.phone && (
                    <p className="text-red-500 text-sm mt-2">
                      {error.phone}
                    </p>
                  )}

                </div>

                {/* ================= Password Starts Here ================= */}
                {/* ================= Password ================= */}

                <div className="mb-5">
                  <label className="block mb-2 text-gray-700 font-medium">
                    Password
                  </label>

                  <div className="relative">
                    <FaLock className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" />

                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Create password"
                      className="w-full h-14 rounded-xl border border-gray-300 pl-14 pr-14 outline-none focus:border-[#C79D17]"
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-500"
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>

                  {error.password && (
                    <p className="text-red-500 text-sm mt-2">
                      {error.password}
                    </p>
                  )}
                </div>

                {/* ================= Terms ================= */}

                <div className="flex items-start gap-3 mb-6">
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => setChecked(!checked)}
                    className="mt-1 w-4 h-4 accent-[#C79D17]"
                  />

                  <p className="text-sm text-gray-600 leading-6">
                    I agree to the{" "}
                    <span className="text-[#C79D17] font-medium cursor-pointer">
                      Terms of Service
                    </span>{" "}
                    and{" "}
                    <span className="text-[#C79D17] font-medium cursor-pointer">
                      Privacy Policy
                    </span>.
                  </p>
                </div>

                {/* ================= Create Button ================= */}

                <button
                  type="submit"
                  disabled={!checked}
                  className={`w-full h-14 rounded-xl text-xl font-semibold transition ${checked
                    ? "bg-black text-[#C79D17] hover:bg-neutral-900"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
                >
                  Create Account →
                </button>

                {/* ================= OR Divider ================= */}

                <div className="flex items-center gap-4 my-8">
                  <div className="flex-1 h-px bg-gray-300"></div>

                  <span className="text-gray-500 font-medium">
                    OR
                  </span>

                  <div className="flex-1 h-px bg-gray-300"></div>
                </div>

                {/* ================= Social Buttons ================= */}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                  <button
                    type="button"
                    className="h-14 rounded-xl border border-gray-300 hover:border-[#C79D17] transition flex items-center justify-center gap-3"
                  >
                    <FcGoogle size={24} />
                    Continue with Google
                  </button>

                  <button
                    type="button"
                    className="h-14 rounded-xl border border-gray-300 hover:border-[#C79D17] transition flex items-center justify-center gap-3"
                  >
                    <FaPhoneAlt />
                    Continue with Phone
                  </button>

                </div>

                {/* ================= Login Link ================= */}

                <p className="text-center text-gray-600 mt-8">
                  Already have an account?{" "}
                  <span
                    onClick={() => navigate("/login")}
                    className="text-[#C79D17] font-semibold cursor-pointer hover:underline"
                  >
                    Sign In
                  </span>
                </p>

              </form>

            )}
          </div>
        </div>
      </div>

      {/* <Footer /> */}
      {/* <BottomNav /> */}
    </>
  );
};

export default SignUp;
