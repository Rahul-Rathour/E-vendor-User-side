import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import api from "../../api";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";

const About = () => {
  const location = useLocation();
  const [prevLocation, setPrevLocation] = useState("Home");

  const [aboutData, setAboutData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data from API
  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const response = await api.get("/about");
        
        if (response.data.status && response.data.data) {
          const raw = response.data.data;

          // === Robust JSON Parsing Function ===
          const safeParse = (jsonString) => {
            if (!jsonString) return [];

            try {
              // First parse (if it's a stringified JSON)
              let parsed = typeof jsonString === "string" ? JSON.parse(jsonString) : jsonString;

              // Second parse (in case it's double stringified)
              if (typeof parsed === "string") {
                parsed = JSON.parse(parsed);
              }

              return Array.isArray(parsed) ? parsed : [];
            } catch (e) {
              console.error("JSON Parse Error:", e, "Raw:", jsonString);
              return [];
            }
          };

          const parsedTimeline = safeParse(raw.timeline);
          const parsedTeam = safeParse(raw.team);
          const parsedWhyChooseUs = safeParse(raw.why_choose_us);

          setAboutData({
            ...raw,
            timeline: parsedTimeline,
            team: parsedTeam,
            whyChooseUs: parsedWhyChooseUs,
          });
        }
      } catch (err) {
        console.error("Failed to fetch about data:", err);
        setError("Failed to load about information. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchAboutData();
  }, []);

  // Update previous location for breadcrumbs
  useEffect(() => {
    if (location.state?.data) {
      setPrevLocation(location.state.data);
    }
  }, [location]);

  if (loading) return <div className="min-h-screen flex items-center justify-center"><p>Loading...</p></div>;
  if (error) return <div className="min-h-screen flex items-center justify-center"><p className="text-red-600">{error}</p></div>;

  const data = aboutData;

  return (
    <div className="max-w-container mx-auto px-4 min-h-screen bg-gray-50">
      <Breadcrumbs title="About Us" prevLocation={prevLocation} />

      {/* Hero Section */}
      <div className="relative h-[480px] md:h-[550px] bg-gray-900 flex items-center justify-center overflow-hidden">
        {data?.hero_image && (
          <img
          src={`${process.env.REACT_APP_API_URL}/public/${data.hero_image}`}
            alt="Hero"
            className="absolute inset-0 w-full h-full object-cover opacity-70"
          />
        )}
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto text-white">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">{data?.hero_title}</h1>
          <p className="text-xl md:text-2xl">{data?.hero_subtitle}</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-16 space-y-20">

        {/* Story Section */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-semibold mb-6">{data?.story_title}</h2>
            <p className="text-gray-600 leading-relaxed text-lg">{data?.story_description}</p>
          </div>
          {data?.story_image && (
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <img src={`${process.env.REACT_APP_API_URL}/public/${data.story_image}`} alt="Story" className="w-full object-cover" />
            </div>
          )}
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-10">
          <div className="bg-white p-10 rounded-2xl shadow-sm">
            <h3 className="text-2xl font-semibold mb-4 text-brandColor">Our Mission</h3>
            <p>{data?.mission}</p>
          </div>
          <div className="bg-white p-10 rounded-2xl shadow-sm">
            <h3 className="text-2xl font-semibold mb-4 text-brandColor">Our Vision</h3>
            <p>{data?.vision}</p>
          </div>
        </div>

        {/* Counters */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center py-10 border-y">
          <div>
            <h4 className="text-5xl font-bold text-brandColor">{data?.counter_customers}</h4>
            <p className="text-gray-500">Happy Customers</p>
          </div>
          <div>
            <h4 className="text-5xl font-bold text-brandColor">{data?.counter_orders}</h4>
            <p className="text-gray-500">Orders Delivered</p>
          </div>
          <div>
            <h4 className="text-5xl font-bold text-brandColor">{data?.counter_products}</h4>
            <p className="text-gray-500">Premium Products</p>
          </div>
          <div>
            <h4 className="text-5xl font-bold text-brandColor">{data?.counter_rating}</h4>
            <p className="text-gray-500">Customer Rating</p>
          </div>
        </div>

        {/* Why Choose Us */}
        {data?.whyChooseUs?.length > 0 && (
          <div>
            <h2 className="text-4xl font-semibold text-center mb-12">Why Choose Us</h2>
            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
              {data.whyChooseUs.map((item, index) => (
                <div key={index} className="bg-white p-8 rounded-2xl text-center hover:shadow-lg transition">
                  <div className="text-5xl mb-4">{item.icon}</div>
                  <h4 className="font-semibold text-lg mb-2">{item.title}</h4>
                  {item.description && <p className="text-gray-600 text-sm">{item.description}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Timeline */}
        {data?.timeline?.length > 0 && (
          <div>
            <h2 className="text-4xl font-semibold text-center mb-12">Our Journey</h2>
            <div className="max-w-3xl mx-auto space-y-12">
              {data.timeline.map((item, index) => (
                <div key={index} className="flex gap-8">
                  <div className="w-28 text-right flex-shrink-0">
                    <span className="font-bold text-3xl text-brandColor">{item.year}</span>
                  </div>
                  <div className="relative flex-1">
                    <div className="absolute -left-[9px] top-3 w-5 h-5 rounded-full bg-blue-600 border-4 border-white"></div>
                    <div className="ml-6 pt-1">
                      <p className="text-gray-600 text-[17px]">{item.text}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Team Section */}
        {data?.team?.length > 0 && (
          <div>
            <h2 className="text-4xl font-semibold text-center mb-12">Meet Our Team</h2>
            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {data.team.map((member, index) => (
                <div key={index} className="bg-white rounded-2xl overflow-hidden shadow hover:shadow-2xl">
                  {member.image && (
                    <img src={`${process.env.REACT_APP_API_URL}/public/${member.image}`} alt={member.name} className="w-full h-80 object-cover" />
                  )}
                  <div className="p-6 text-center">
                    <h4 className="font-semibold text-2xl">{member.name}</h4>
                    <p className="text-brandColor">{member.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

                {/* Factory / Manufacturing Section */}
        {true && (
          <div>
            <h2 className="text-4xl font-semibold text-center mb-6">
              Our Manufacturing Facility
            </h2>
            <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
              State-of-the-art infrastructure ensuring premium quality and sustainable production
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Factory Image 1 */}
              <div className="group relative rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
                <img 
                  src={`${process.env.REACT_APP_API_URL}/public/about/1.jpeg`}
                  alt="Modern Production Line"
                  className="w-full h-[320px] object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                  <p className="text-white font-medium">Automated Production Line</p>
                </div>
              </div>

              {/* Factory Image 2 */}
              <div className="group relative rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
                <img 
                  src={`${process.env.REACT_APP_API_URL}/public/about/2.jpeg`} 
                  alt="Quality Control"
                  className="w-full h-[320px] object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                  <p className="text-white font-medium">Quality Testing Lab</p>
                </div>
              </div>

              {/* Factory Image 3 */}
              <div className="group relative rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
                <img 
                  src={`${process.env.REACT_APP_API_URL}/public/about/3.jpeg`} 
                  alt="Packaging Unit"
                  className="w-full h-[320px] object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                  <p className="text-white font-medium">Precision Packaging</p>
                </div>
              </div>
            </div>

            {/* Optional: Add more images in a second row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div className="group relative rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
                <img 
                  src={`${process.env.REACT_APP_API_URL}/public/about/4.jpeg`} 
                  alt="Warehouse"
                  className="w-full h-[280px] object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                  <p className="text-white font-medium">Climate Controlled Warehouse</p>
                </div>
              </div>

              <div className="group relative rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
                <img 
                 src={`${process.env.REACT_APP_API_URL}/public/about/5.jpeg`} 
                  alt="Research & Development"
                  className="w-full h-[280px] object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                  <p className="text-white font-medium">R&D Innovation Center</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="bg-gray-50 py-20 text-center">
        <Link to="/shop">
          <button className="px-12 py-4 bg-brandColor hover:bg-brandColor/90 text-white text-lg font-medium rounded-2xl">
            Continue Shopping
          </button>
        </Link>
      </div>
    </div>
  );
};

export default About;