import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/home/Header/Header';
import Footer from '../../components/home/Footer/Footer';
import logonew from '../../assets/images/logonew.jpg';
import { FaCheckCircle } from 'react-icons/fa';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear user-related data here (like localStorage, Redux, etc.)
    localStorage.removeItem('authToken');
    
    // Redirect to home or login after 3 seconds
    const timer = setTimeout(() => {
      navigate('/'); // Redirect to home page
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <>
      <Header />
      <div className="flex flex-col min-h-screen bg-white">
        <div className="flex flex-col md:flex-row flex-1">
          
          {/* Left Branding Panel */}
          <div className="bg-purple-700 text-white md:w-1/2 p-10 flex flex-col justify-center items-start space-y-6">
            <h2 className="text-4xl font-bold">Logged Out</h2>
            <p className="text-lg">Thank you for visiting our store!</p>
            <img src={logonew} alt="Logout illustration" className="w-72 mt-4" />
          </div>

          {/* Right Message Panel */}
          <div className="md:w-1/2 flex items-center justify-center bg-white p-8">
            <div className="w-full max-w-sm text-center space-y-6">
              <FaCheckCircle className="text-green-500 text-5xl mx-auto" />
              <h2 className="text-2xl font-bold text-gray-800">You’ve been logged out</h2>
              <p className="text-gray-500">We hope to see you again soon.</p>
              <p className="text-sm text-gray-500">
                Redirecting to Home page...{' '}
                <span
                  onClick={() => navigate('/')}
                  className="text-purple-700 cursor-pointer hover:underline"
                >
                  Click here
                </span>{' '}
                if not redirected.
              </p>
            </div>
          </div>

        </div>
      </div>
      <Footer />
    </>
  );
};

export default Logout;
