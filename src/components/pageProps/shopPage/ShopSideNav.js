import React from "react";
import Brand from "./shopBy/Brand";
import Category from "./shopBy/Category";
import Color from "./shopBy/Color";
import Price from "./shopBy/Price";

const ShopSideNav = ({ onPriceSelect }) => {
  return (
    <div className="w-full flex flex-col gap-6">
      <Category />
      {/* <Color /> */}
      {/* <Brand /> */}
      {/* <Price onPriceSelect={onPriceSelect} />  ✅ Pass prop this is the price filter*/}
    </div>
  );
};

export default ShopSideNav;
