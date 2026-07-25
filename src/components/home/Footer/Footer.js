import React from "react";

import FooterBrand from "./FooterBrand";
import FooterLinks from "./FooterLinks";
import FooterContact from "./FooterContact";
import FooterBottom from "./FooterBottom";

const Footer = () => {
  return (
    <footer className="bg-[#0D0D0D] text-white pt-14">

      <div className="max-w-[1400px] mx-auto px-6">

        {/* Top */}

        <div className="grid lg:grid-cols-[1.4fr_1fr_1fr_1.2fr] gap-12 pb-10">

          <FooterBrand />

          <FooterLinks
            title="QUICK LINKS"
            links={[
              { name: "Home", url: "/" },
              { name: "About Us", url: "/about" },
              { name: "Bulk Order", url: "/bulk-order" },
              { name: "Contact Us", url: "/contact" },
            ]}
          />

          <FooterLinks
            title="HELP & SUPPORT"
            links={[
              { name: "FAQ's", url: "/faq" },
              { name: "Shipping Policy", url: "/shipping-policy" },
              { name: "Return Policy", url: "/return-policy" },
              { name: "Privacy Policy", url: "/privacy-policy" },
              { name: "Terms & Conditions", url: "/terms" },
             
            ]}
          />

          {/* <FooterLinks
            title="DEALER ZONE"
            links={[
              { name: "Dealer Login", url: "/dealer-login" },
              { name: "Become a Dealer", url: "/become-dealer" },
              { name: "Wholesale Policy", url: "/wholesale-policy" },
              { name: "Download Catalog", url: "/catalog" },
            ]}
          /> */}

          <FooterContact />

        </div>

        <FooterBottom />

      </div>

    </footer>
  );
};

export default Footer;