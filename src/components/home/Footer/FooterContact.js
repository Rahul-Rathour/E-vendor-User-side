import React, { useEffect, useState } from "react";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaGlobe,
} from "react-icons/fa";

import api from "../../../api";

const FooterContact = () => {
  const [contact, setContact] = useState({
    address: "",
    phone: "",
    email: "",
    website: "",
  });

  useEffect(() => {
    api
      .get("/home-setting")
      .then((res) => {
        if (res.data) {
          setContact({
            address: res.data.address || "",
            phone: res.data.phone || "+91 98765 43210",
            email: res.data.email || "",
            website: res.data.website || "www.blackhewzen.com",
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      {/* Heading */}

      <h3
        className="
          text-white
          text-[16px]
          font-semibold
          uppercase
          tracking-wide
          mb-6
        "
      >
        CONTACT US
      </h3>

      {/* Address */}

      <div className="flex items-start gap-3 mb-5">
        <FaMapMarkerAlt className="text-[#D4AF37] mt-1 flex-shrink-0" />

        <p className="text-gray-400 text-[15px] leading-7">
          {contact.address}
        </p>
      </div>

      {/* Phone */}

      <div className="flex items-center gap-3 mb-5">
        <FaPhoneAlt className="text-[#D4AF37]" />

        <a
          href={`tel:${contact.phone}`}
          className="
            text-gray-400
            text-[15px]
            hover:text-[#D4AF37]
            transition-colors
          "
        >
          {contact.phone}
        </a>
      </div>

      {/* Email */}

      <div className="flex items-center gap-3 mb-5">
        <FaEnvelope className="text-[#D4AF37]" />

        <a
          href={`mailto:${contact.email}`}
          className="
            text-gray-400
            text-[15px]
            break-all
            hover:text-[#D4AF37]
            transition-colors
          "
        >
          {contact.email}
        </a>
      </div>

      {/* Website */}

      <div className="flex items-center gap-3">
        <FaGlobe className="text-[#D4AF37]" />

        <a
          href={
            contact.website.startsWith("http")
              ? contact.website
              : `https://${contact.website}`
          }
          target="_blank"
          rel="noopener noreferrer"
          className="
            text-gray-400
            text-[15px]
            hover:text-[#D4AF37]
            transition-colors
          "
        >
          {contact.website}
        </a>
      </div>
    </div>
  );
};

export default FooterContact;