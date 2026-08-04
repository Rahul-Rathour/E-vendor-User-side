import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';
import {
  FaEye,
  FaEyeSlash,
  FaEnvelope,
  FaLock,
  FaPhoneAlt,
} from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import Header from '../../components/home/Header/Header';
import logonew from '../../assets/images/logonew.jpg';
import Footer from '../../components/home/Footer/Footer';
import api from '../../api';
import BottomNav from '../../components/home/BottomNav/BottomNav';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { refreshToken } = useCart();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/login', { email, password });
      if (res.data.status) {
        localStorage.setItem('userToken', res.data.token);
        refreshToken();
        localStorage.setItem('user', JSON.stringify(res.data.user));
        localStorage.setItem('orderType', "general_price");
        navigate('/');
      }
      else {
        alert(res.data.message);
      }
    } catch (err) {
      alert('Login failed!');
    }
  };

  const handleForgotPassword = () => {
    alert('Password reset link sent to your email.');
  };

  return (
    <>
      {/* <Header /> */}

      <div className="min-h-screen bg-white">
        <div className="flex flex-col lg:flex-row min-h-screen">
          {/* Left Banner */}
          <div className="relative lg:w-1/2 bg-black overflow-hidden">
            <img
              src={logonew}
              alt="Login Banner"
              className="absolute inset-0 w-full h-full object-cover opacity-60"
            />

            <div className="absolute inset-0 bg-gradient-to-r from-black/90 to-black/40"></div>

            <div className="relative z-10 flex flex-col justify-center h-full px-8 md:px-16 py-16 text-white">
              <p className="uppercase tracking-[8px] text-[#C79D17] text-sm md:text-lg mb-4">
                Welcome Back
              </p>

              <h1 className="text-5xl md:text-7xl font-bold mb-4">
                Login
              </h1>

              <div className="w-20 h-[2px] bg-[#C79D17] mb-6"></div>

              <p className="text-lg md:text-2xl leading-relaxed max-w-md">
                Get access to your Orders,
                <br />
                Wishlist and Recommendations
              </p>
            </div>
          </div>

          {/* Right Form */}
          <div className="lg:w-1/2 flex items-center justify-center px-6 py-12 bg-white">
            <div className="w-full max-w-xl">

              <h2 className="text-5xl font-serif text-center text-gray-900">
                Welcome Back
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
                Login to your account
              </p>

              <form
                onSubmit={handleLogin}
                className="space-y-6"
                autoComplete="off"
              >
                {/* Email */}

                <div>
                  <label className="block mb-2 text-gray-700 font-medium">
                    Email
                  </label>

                  <div className="relative">
                    <FaEnvelope className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" />

                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full h-14 rounded-xl border border-gray-300 pl-14 pr-4 outline-none focus:border-[#C79D17]"
                    />
                  </div>
                </div>

                {/* Password */}

                <div>
                  <label className="block mb-2 text-gray-700 font-medium">
                    Password
                  </label>

                  <div className="relative">
                    <FaLock className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" />

                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
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
                </div>

                {/* Forgot Password */}

                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={handleForgotPassword}
                    className="text-[#A9781B] hover:underline"
                  >
                    Forgot Password?
                  </button>
                </div>

                {/* Login */}

                <button
                  type="submit"
                  className="w-full h-14 rounded-xl bg-black text-[#C79D17] text-xl font-semibold hover:bg-neutral-900 transition"
                >
                  Login →
                </button>

                {/* OR */}

                <div className="flex items-center gap-4">
                  <div className="flex-1 h-px bg-gray-300"></div>

                  <span className="text-gray-500 font-medium">
                    OR
                  </span>

                  <div className="flex-1 h-px bg-gray-300"></div>
                </div>

                {/* Google */}

                <button
                  type="button"
                  className="w-full h-14 rounded-xl border border-gray-300 hover:border-[#C79D17] flex items-center justify-center gap-3 transition"
                >
                  <FcGoogle size={24} />

                  Continue with Google
                </button>

                {/* Phone */}

                <button
                  type="button"
                  className="w-full h-14 rounded-xl border border-gray-300 hover:border-[#C79D17] flex items-center justify-center gap-3 transition"
                >
                  <FaPhoneAlt />

                  Continue with Phone (OTP)
                </button>

                {/* Signup */}

                <p className="text-center text-gray-600 pt-2">
                  Don't have an account?{" "}
                  <span
                    onClick={() => navigate("/signup")}
                    className="text-[#C79D17] cursor-pointer font-semibold hover:underline"
                  >
                    Sign Up
                  </span>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* <Footer /> */}
      {/* <BottomNav /> */}
    </>
  );
};

export default Login;
