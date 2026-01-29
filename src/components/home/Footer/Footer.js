import React from "react";
import { FaFacebook, FaYoutube, FaInstagram, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="w-full bg-[#131921] text-gray-300 pt-10 pb-6">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 px-6">

        {/* About */}
        <div>
          <h3 className="text-white font-semibold mb-3">ABOUT</h3>
          <ul className="space-y-2 text-sm">
            <li>Contact Us</li>
            <li>About Us</li>
            <li>Careers</li>
            <li>DOceanr Stories</li>
            <li>Press</li>
            <li>Corporate Information</li>
          </ul>
        </div>

        {/* Group Companies */}
       

        {/* Help */}
        <div>
          <h3 className="text-white font-semibold mb-3">HELP</h3>
          <ul className="space-y-2 text-sm">
            <li>Payments</li>
            <li>Shipping</li>
            <li>Cancellation & Returns</li>
            <li>FAQ</li>
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
            DOceanr Shopping Private Limited,<br />
            Buildings Alyssa, Begonia &<br />
            Clove Embassy Tech Village,<br />
            Outer Ring Road, Devarabeesanahalli Village,<br />
            Bengaluru, 560103,<br />
            Karnataka, India
          </p>
        </div>

        {/* Registered Office Address */}
        <div className="col-span-2 md:col-span-2 lg:col-span-1">
          <h3 className="text-white font-semibold mb-3">Registered Office Address:</h3>
          <p className="text-sm leading-6">
            DOceanr Shopping Private Limited,<br />
            Buildings Alyssa, Begonia &<br />
            Clove Embassy Tech Village,<br />
            Outer Ring Road, Devarabeesanahalli Village,<br />
            Bengaluru, 560103,<br />
            Karnataka, India<br />
            CIN : U51109KA2012PTC066107<br />
            Telephone: 044-45614700 / 044-67415800
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
        © 2007–2026 DOceanr.com
      </div>
    </footer>
  );
};

export default Footer;
