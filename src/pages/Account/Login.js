import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Header from '../../components/home/Header/Header'; 
import logonew from '../../assets/images/logonew.jpg';
import Footer from '../../components/home/Footer/Footer'; // Import Footer


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    alert(`Logged in with: ${email}`);
    setEmail('');
    setPassword('');
  };

  const handleForgotPassword = () => {
    alert("Password reset link sent to your email.");
  };

  return (
    <>
      {/*Header added at top */}
      <Header />

      <div className="flex flex-col min-h-screen bg-white">
        {/* Login layout */}
        <div className="flex flex-col md:flex-row flex-1">
          {/* Left Purple Panel */}
          <div className="bg-purple-700 text-white md:w-1/2 p-10 flex flex-col justify-center items-start space-y-6">
            <h2 className="text-4xl font-bold">Login</h2>
            <p className="text-lg">
              Get access to your Orders, Wishlist and Recommendations
            <img
              src={logonew}
              alt="Login illustration"
              className="w-72 mt-4"
            />
            </p>
          </div>

          {/* Right Form Area */}
          <div className="md:w-1/2 flex items-center justify-center bg-white p-8">
            <div className="w-full max-w-sm space-y-6">
              <h2 className="text-2xl font-bold text-gray-800 text-center">
                Welcome Back
              </h2>
              <p className="text-sm text-center text-gray-500">
                Login to your account
              </p>

              <form onSubmit={handleLogin} className="space-y-4" autoComplete="off">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                    placeholder="you@example.com"
                  />
                </div>

                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700">Password</label>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                    placeholder="••••••••"
                  />
                  <span
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-10 text-gray-400 cursor-pointer"
                    title="Show/Hide Password"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>

                <div className="flex justify-between items-center text-sm">
                  <button
                    type="button"
                    onClick={handleForgotPassword}
                    className="text-purple-600 hover:underline"
                  >
                    Forgot Password?
                  </button>
                </div>

                <button
                  type="submit"
                  className="w-full py-2 px-4 bg-purple-700 text-white font-semibold rounded-md hover:bg-purple-800 transition duration-300"
                >
                  Login
                </button>

                <p className="text-sm text-center text-gray-600">
                  Don’t have an account?{' '}
                  <span
                    onClick={() => navigate('/signup')}
                    className="text-purple-700 hover:underline cursor-pointer"
                  >
                    Sign Up
                  </span>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default Login;
