import React from "react";
import Banner from "../../components/Banner/Banner";
import BannerBottom from "../../components/Banner/BannerBottom";
import BestSellers from "../../components/home/BestSellers/BestSellers";
import NewArrivals from "../../components/home/NewArrivals/NewArrivals";
import Sale from "../../components/home/Sale/Sale";
import SpecialOffers from "../../components/home/SpecialOffers/SpecialOffers";
import YearProduct from "../../components/home/YearProduct/YearProduct";
import AllCategory from "../../components/home/AllCategory/AllCategory";
import ShopByCategory from "./ShopByCategory/ShopByCategory";
import WhyChooseUs from "../../components/home/WhyChooseUs/WhyChooseUs";
import WholesaleBanner from "./WholesaleBanner/WholesaleBanner";
import SocialProof from "./SocialProof/SocialProof";

const Home = () => {
  return (
    <div className="w-full mx-auto">
      <Banner />
      {/* <BannerBottom /> */}
      
        {/* <AllCategory /> */}
        {/* <Sale /> */}
        {/* <NewArrivals /> */}
        <BestSellers /> {/* done */}
        <ShopByCategory/>
        <WhyChooseUs/>
        <WholesaleBanner/>
        <SocialProof/>
        {/* <YearProduct /> */}
        {/* <SpecialOffers /> done */}
      </div>
    
  );
};

export default Home;
