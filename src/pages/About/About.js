import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";

const About = () => {
  const location = useLocation();
  const [prevLocation, setPrevLocation] = useState("Home"); // Default fallback value

  useEffect(() => {
    // Safe access to location.state and .data
    if (location.state && location.state.data) {
      setPrevLocation(location.state.data);
    } else {
      setPrevLocation("Home"); // Or any other default
    }
  }, [location]);

  return (
    <div className="max-w-container mx-auto px-4">
      <Breadcrumbs title="About" prevLocation={prevLocation} />
      <div className="pb-10">
        <h1 className="max-w-[600px] text-base text-lightText mb-2">
          <span className="text-primeColor font-semibold text-lg">Shopping</span>{" "}
         Welcome to [Shopping], your number one source for everything [e.g., fashion, electronics, home decor, etc.]. We're dedicated to giving you the very best of [product type], with a focus on quality, affordability, and exceptional customer service.

Founded in [2025] by [Jhon], [Shopping] has come a long way from its beginnings. When [Jhon] first started out, their passion for [e.g., eco-friendly fashion, smart technology, etc.] drove them to start their own business. Today, we serve customers all over [India], and are thrilled to be a part of the [ecommerce] industry.

We believe shopping should be simple, enjoyable, and accessible to everyone. That’s why we’ve built a platform that combines a wide variety of high-quality products with fast shipping, secure payments, and helpful customer support.

Why Shop With Us?<br /><br />
✅ Wide range of premium products<br /><br />

🚚 Fast & reliable delivery<br /><br />

🔒 Secure payment options<br /><br />

🧡 Customer-first approach<br /><br />

At [Shopping], our mission is to create a seamless and delightful online shopping experience. Whether you’re shopping for yourself or looking for the perfect gift, we’re here to help you every step of the way.

Thank you for visiting us — we hope you enjoy our products as much as we enjoy offering them to you.<br /><br />

Happy Shopping!<br /><br />
— The [Shopping] Team
        </h1>
        <Link to="/shop">
          <button className="w-52 h-10 bg-primeColor text-white hover:bg-black duration-300">
            Continue Shopping
          </button>
        </Link>
      </div>
    </div>
  );
};

export default About;
