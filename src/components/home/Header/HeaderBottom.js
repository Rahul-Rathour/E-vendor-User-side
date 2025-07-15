import  React from "react";
import { useNavigate } from "react-router-dom";

const categories = [
  {
    
  id: 1,
  name: "Mobiles",
  icon: "https://rukminim1.flixcart.com/flap/64/64/image/22fddf3c7da4c4f4.png?q=100",
  link: "/category/mobiles",
  subcategories: [
    { name: "Smartphones", link: "/ProductFilter"  },
    { name: "Feature Phones", link: "/category/mobiles/feature-phones" },
    { name: "Accessories", link: "/category/mobiles/accessories" },
    { name: "Smartphones", link: "/category/mobiles/smartphones" },
    { name: "Feature Phones", link: "/category/mobiles/feature-phones" },
    { name: "Accessories", link: "/category/mobiles/accessories" },
  ]
},
  {
    id: 2,
    name: "Fashion",
    icon: "https://rukminim1.flixcart.com/fk-p-flap/64/64/image/0d75b34f7d8fbcb3.png?q=100",
    link: "/category/fashion",
    subcategories: [
      { name: "Men's Clothing", link: "/category/fashion/men-clothing" },
      { name: "Women's Clothing", link: "/category/fashion/women-clothing" },
      { name: "Kids' Wear", link: "/category/fashion/kids" },
      { name: "Footwear", link: "/category/fashion/footwear" },
      { name: "Watches", link: "/category/fashion/watches" },
      { name: "Sunglasses", link: "/category/fashion/sunglasses" },
      { name: "Handbags", link: "/category/fashion/handbags" },
      { name: "Jewellery", link: "/category/fashion/jewellery" },
    ],
    
  },
  {
    id: 3,
    name: "Electronics",
    icon: "https://rukminim1.flixcart.com/flap/64/64/image/69c6589653afdb9a.png?q=100",
    link: "/category/electronics",
  },
  {
    id: 4,
    name: "Home",
    icon: "https://rukminim1.flixcart.com/flap/64/64/image/ab7e2b022a4587dd.jpg?q=100",
    link: "/category/home",
  },
  {
    id: 5,
    name: "Beauty",
    icon: "https://rukminim1.flixcart.com/flap/64/64/image/dff3f7adcf3a90c6.png?q=100",
    link: "/category/beauty",
     subcategories: [
      { name: "Skincare", link: "/category/beauty/skincare" },
      { name: "Makeup", link: "/category/beauty/makeup" },
      { name: "Hair Care", link: "/category/beauty/haircare" },
      { name: "Fragrances", link: "/category/beauty/fragrances" },
      { name: "Personal Hygiene", link: "/category/beauty/hygiene" },
      { name: "Men's Grooming", link: "/category/beauty/men-grooming" },
      { name: "Bath & Body", link: "/category/beauty/bath" },
      { name: "Tools & Brushes", link: "/category/beauty/tools" },
    ],
  },
  {
    id: 6,
    name: "Appliances",
    icon: "https://rukminim1.flixcart.com/flap/64/64/image/0139228b2f7eb413.jpg?q=100",
    link: "/category/appliances",
  },
  {
    id: 7,
    name: "Travel",
    icon: "https://rukminim1.flixcart.com/fk-p-flap/64/64/image/71050627a56b4693.png?q=100",
    link: "/category/travel",
  },
  {
    id: 8,
    name: "Grocery",
    icon: "https://rukminim1.flixcart.com/flap/64/64/image/29327f40e9c4d26b.png?q=100",
    link: "/category/grocery",
    subcategories: [
      { name: "Fruits & Vegetables", link: "/category/grocery/fruits" },
      { name: "Dairy & Bakery", link: "/category/grocery/dairy" },
      { name: "Snacks", link: "/category/grocery/snacks" },
      { name: "Beverages", link: "/category/grocery/beverages" },
      { name: "Staples", link: "/category/grocery/staples" },
      { name: "Household Items", link: "/category/grocery/household" },
      { name: "Packaged Food", link: "/category/grocery/packaged" },
      { name: "Cleaning Supplies", link: "/category/grocery/cleaning" },
    ],
  },
  {
    id: 9,
    name: "Toys",
    icon: "https://rukminim1.flixcart.com/fk-p-flap/64/64/image/0d75b34f7d8fbcb3.png?q=100",
    link: "/category/toys",
    subcategories: [
      { name: "Action Figures", link: "/category/toys/action-figures" },
      { name: "Educational Toys", link: "/category/toys/educational" },
      { name: "Soft Toys", link: "/category/toys/soft" },
      { name: "Puzzles", link: "/category/toys/puzzles" },
      { name: "Board Games", link: "/category/toys/board-games" },
      { name: "Remote Control Toys", link: "/category/toys/remote-control" },
      { name: "Musical Toys", link: "/category/toys/musical" },
      { name: "Building Blocks", link: "/category/toys/blocks" },
    ],
  },
  {
    id: 10,
    name: "Books",
    icon: "https://rukminim1.flixcart.com/flap/64/64/image/69c6589653afdb9a.png?q=100",
    link: "/category/books",
  },
  {
    id: 11,
    name: "Furniture",
    icon: "https://rukminim1.flixcart.com/flap/64/64/image/ab7e2b022a4587dd.jpg?q=100",
    link: "/category/furniture",
    subcategories: [
      { name: "Beds", link: "/category/furniture/beds" },
      { name: "Sofas", link: "/category/furniture/sofas" },
      { name: "Chairs", link: "/category/furniture/chairs" },
      { name: "Tables", link: "/category/furniture/tables" },
      { name: "Storage", link: "/category/furniture/storage" },
      { name: "Office Furniture", link: "/category/furniture/office" },
      { name: "Mattresses", link: "/category/furniture/mattresses" },
      { name: "Bean Bags", link: "/category/furniture/beanbags" },
    ],
  },
  {
    id: 12,
    name: "Gaming",
    icon: "https://rukminim1.flixcart.com/flap/64/64/image/0d75b34f7d8fbcb3.png?q=100",
    link: "/category/gaming",
  },
];



const CategoryBar = () => {
  const navigate = useNavigate();

  return (
    <div className="relative w-full bg-white border-b py-4 px-2 overflow-x-auto whitespace-nowrap flex gap-4 scrollbar-hide z-1 md:justify-center md:flex-wrap md:overflow-visible">
      {categories.map((cat) => (
        <div
          key={cat.id}
          className="relative group flex flex-col items-center justify-start min-w-[90px] cursor-pointer"
        >
          {/* Main Category Icon + Name */}
          <div
            onClick={() => navigate(cat.link)}
            className="flex flex-col items-center hover:scale-105 transition-transform duration-200"
          >
            <img
              src={cat.icon}
              alt={cat.name}
              className="w-14 h-14 mb-1 object-contain"
            />
            <span className="text-sm text-gray-900 text-center font-bold flex items-center gap-1 relative">
  {cat.name}
  {
    ["Mobiles", "Fashion", "Beauty", "Grocery", "Toys", "Furniture"].includes(cat.name) && (
    <>
     <span className="text-xs group-hover:hidden text-black hidden sm:inline">▲</span>
<span className="text-xs hidden group-hover:inline text-black hidden ">▼</span>

    </>
  )}
</span>

          </div>

          {/* Dropdown menu on hover */}
          {cat.subcategories && (
            <div className="absolute top-full mt-0 left-1/2 -translate-x-1/2 bg-white shadow-lg rounded-md p-2 hidden group-hover:flex flex-col gap-1 min-w-[160px] z-[999]">


              {cat.subcategories.map((sub, i) => (
                <span
                  key={i}
                  onClick={() => navigate(sub.link)}
                  className="text-sm text-gray-900 hover:text-black-800 px-7 py-1 hover:bg-blue-100 cursor-pointer rounded"
                >
                  {sub.name}
                </span>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default CategoryBar; 