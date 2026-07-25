import React from "react";
import { Link } from "react-router-dom";

const FooterLinks = ({ title, links = [] }) => {
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
        {title}
      </h3>

      {/* Links */}

      <ul className="space-y-3">

        {links.map((item, index) => (

          <li key={index}>

            <Link
              to={item.url}
              className="
                text-[15px]
                text-gray-400
                hover:text-[#D4AF37]
                transition-colors
                duration-300
              "
            >
              {item.name}
            </Link>

          </li>

        ))}

      </ul>

    </div>
  );
};

export default FooterLinks;