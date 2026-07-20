import React, { useEffect, useState } from "react";
import { FaFacebook, FaYoutube, FaInstagram, FaTwitter } from "react-icons/fa";
import api from "../../../api";
import { Link } from "react-router-dom";

const Footer = () => {
  const [siteTitle, setSiteTitle] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    api.get("/home-setting")
      .then(res => {
        if (res.data?.title) {
          setSiteTitle(res.data.title);   // Save title in state
          setAddress(res.data.address);
          setEmail(res.data.email);
        }
      })
      .catch(err => {
        console.error("Footer home-setting error:", err);
      });
  }, []);
  return (
    <footer className="w-full bg-[#131921] text-gray-300 pt-10 pb-6">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 px-6">

        {/* About */}
        <div>
          <h3 className="text-white font-semibold mb-3">ABOUT</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to={'/contact'}>
                Contact Us
              </Link> 
            </li>

            <li>
              <Link to={'/about'}>
                About Us
              </Link>
            </li>
            
            <li>DOceanr Stories</li>
            <li>Press</li>
            <li>Corporate Information</li>
          </ul>
        </div>

        {/* Help */}
        <div>
          <h3 className="text-white font-semibold mb-3">HELP</h3>
          <ul className="space-y-2 text-sm">
            <li>Payments</li>
            <li>Shipping</li>
            <li>Cancellation & Returns</li>
            <li>
              <Link to={'/faq'}>
                FAQ
              </Link>
            </li>
          </ul>
        </div>

        {/* Consumer Policy */}
        <div>
          <h3 className="text-white font-semibold mb-3">CONSUMER POLICY</h3>
          <ul className="space-y-2 text-sm">
            <li>Cancellation & Returns</li>
            <li>Terms of Use</li>
            <li>Security</li>
            <li>Privacy</li>
            <li>Sitemap</li>
            <li>Grievance Redressal</li>
            <li>EPR Compliance</li>
            <li>FSSAI Food Safety</li>
          </ul>
        </div>

        {/* Mail Us */}
        <div className="col-span-2 md:col-span-2 lg:col-span-1">
          <h3 className="text-white font-semibold mb-3">Mail Us:</h3>
          <p className="text-sm leading-6">
            {email}
          </p>
        </div>

        {/* Registered Office Address */}
        <div className="col-span-2 md:col-span-2 lg:col-span-1">
          <h3 className="text-white font-semibold mb-3">Registered Office Address:</h3>
          <p className="text-sm leading-6">
            {siteTitle}<br />
            {address}<br />
          </p>
        </div>
      </div>

      {/* Social Icons */}
      <div className="border-t border-gray-600 mt-10 pt-4 flex flex-col md:flex-row justify-center items-center gap-4 text-white">
        <p className="text-sm">Social:</p>
        <div className="flex items-center gap-4 text-lg">
          <FaFacebook className="hover:text-blue-500 cursor-pointer" />
          <FaTwitter className="hover:text-blue-400 cursor-pointer" />
          <FaInstagram className="hover:text-pink-500 cursor-pointer" />
          <FaYoutube className="hover:text-red-500 cursor-pointer" />
        </div>
      </div>

      {/* Bottom strip */}
      <div className="text-center text-gray-400 text-xs mt-4">
        © 2007–2026 {siteTitle}
      </div>
    </footer >
  );
};

export default Footer;
