import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaWhatsapp,
} from "react-icons/fa";

import api from "../../../api";
import { logo } from "../../../assets/images";

const FooterBrand = () => {
  const [siteTitle, setSiteTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    api
      .get("/home-setting")
      .then((res) => {
        if (res.data) {
          setSiteTitle(res.data.title || "");
          setDescription(
            res.data.footer_description ||
              "Manufacturer & Supplier of Premium Quality Jackets, Lowers, T-Shirts & More."
          );
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>

      {/* Logo */}

      <Link
        to="/"
        className="flex items-center gap-3"
      >
        <img
          src={logo}
          alt="Logo"
          className="h-14 object-contain"
        />
      </Link>

      {/* Description */}

      <p className="mt-6 text-[15px] leading-7 text-gray-400 max-w-[280px]">
        {description}
      </p>

      {/* Social Icons */}

      <div className="flex items-center gap-3 mt-8">

        <a
          href="#"
          className="
            w-10
            h-10
            rounded-full
            border
            border-gray-700
            flex
            items-center
            justify-center
            hover:bg-[#D4AF37]
            hover:border-[#D4AF37]
            hover:text-black
            transition
          "
        >
          <FaFacebookF />
        </a>

        <a
          href="#"
          className="
            w-10
            h-10
            rounded-full
            border
            border-gray-700
            flex
            items-center
            justify-center
            hover:bg-[#D4AF37]
            hover:border-[#D4AF37]
            hover:text-black
            transition
          "
        >
          <FaInstagram />
        </a>

        <a
          href="#"
          className="
            w-10
            h-10
            rounded-full
            border
            border-gray-700
            flex
            items-center
            justify-center
            hover:bg-[#D4AF37]
            hover:border-[#D4AF37]
            hover:text-black
            transition
          "
        >
          <FaYoutube />
        </a>

        <a
          href="#"
          className="
            w-10
            h-10
            rounded-full
            border
            border-gray-700
            flex
            items-center
            justify-center
            hover:bg-[#D4AF37]
            hover:border-[#D4AF37]
            hover:text-black
            transition
          "
        >
          <FaWhatsapp />
        </a>

      </div>

    </div>
  );
};

export default FooterBrand;