import React from "react";
import Heading from "../../components/home/Products/Heading";
import Product from "../../components/home/Products/Product";

const products =[
  {
    _id: "p001",
    img: "https://plus.unsplash.com/premium_photo-1691622500278-868ca3554736?w=500&auto=format&fit=crop&q=60",
    productName: "Casual Shirt",
    price: "799.00",
    color: "Blue",
    badge: true,
    des: "Comfortable cotton casual shirt for men.",
  },
  {
    _id: "p002",
    img: "https://images.unsplash.com/photo-1678219376035-90da4bda4926?w=500&auto=format&fit=crop&q=60",
    productName: "Slim Fit Jeans",
    price: "1199.00",
    color: "Denim",
    badge: true,
    des: "Trendy slim fit jeans for daily wear.",
  },
  {
    _id: "p003",
    img: "https://images.unsplash.com/photo-1602010069450-0a62034f235c?w=500&auto=format&fit=crop&q=60",
    productName: "Floral Dress",
    price: "1299.00",
    color: "Red",
    badge: false,
    des: "Elegant floral dress for women.",
  },
  {
    _id: "p004",
    img: "https://images.unsplash.com/photo-1562183241-b937e95585b6?w=500&auto=format&fit=crop&q=60",
    productName: "Running Shoes",
    price: "1499.00",
    color: "Grey",
    badge: true,
    des: "Comfortable and lightweight running shoes.",
  },
  {
    _id: "p005",
    img: "https://images.unsplash.com/photo-1557165515-0a5db651be2e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8U3VtbWVyJTIwSGF0fGVufDB8fDB8fHww",
    productName: "Summer Hat",
    price: "399.00",
    color: "Beige",
    badge: false,
    des: "Stylish sun hat perfect for summer outings.",
  },
  {
    _id: "p006",
    img: "https://images.unsplash.com/photo-1620403724133-1a06ea2fc692?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fExlYXRoZXIlMjBKYWNrZXR8ZW58MHx8MHx8fDA%3D",
    productName: "Leather Jacket",
    price: "2499.00",
    color: "Black",
    badge: true,
    des: "Classic black leather jacket for bold style.",
  },
  {
    _id: "p007",
    img: "https://images.unsplash.com/photo-1691315909393-c5c91e22760f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8U3BvcnRzJTIwU2hvcnRzfGVufDB8fDB8fHww",
    productName: "Sports Shorts",
    price: "599.00",
    color: "Navy",
    badge: false,
    des: "Comfortable and breathable gym shorts.",
  },
  {
    _id: "p008",
    img: "https://images.unsplash.com/photo-1581870756134-925aa11019b8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fENhc3VhbCUyMEhvb2RpZXxlbnwwfHwwfHx8MA%3D%3D",
    productName: "Casual Hoodie",
    price: "999.00",
    color: "Grey",
    badge: true,
    des: "Warm hoodie with modern casual look.",
  },
  {
    _id: "p009",
    img: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8U3VuZ2xhc3Nlc3xlbnwwfHwwfHx8MA%3D%3D",
    productName: "Sunglasses",
    price: "699.00",
    color: "Black",
    badge: false,
    des: "Stylish sunglasses for all outfits.",
  },
  {
    _id: "p010",
    img: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8U25lYWtlcnN8ZW58MHx8MHx8fDA%3D",
    productName: "Sneakers",
    price: "1799.00",
    color: "White",
    badge: true,
    des: "Trendy white sneakers with clean finish.",
  },
  {
    _id: "p011",
    img: "https://images.unsplash.com/photo-1715176531842-7ffda4acdfa9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8VHVydGxlbmVjayUyMFN3ZWF0ZXJ8ZW58MHx8MHx8fDA%3D",
    productName: "Turtleneck Sweater",
    price: "899.00",
    color: "Brown",
    badge: true,
    des: "Cozy sweater perfect for winter fashion.",
  },
  {
    _id: "p012",
    img: "https://images.unsplash.com/photo-1618393649689-c997c7455ef5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8RGVuaW0lMjBKYWNrZXR8ZW58MHx8MHx8fDA%3D",
    productName: "Denim Jacket",
    price: "1399.00",
    color: "Blue",
    badge: false,
    des: "Classic blue denim jacket for all seasons.",
  },
  {
    _id: "p013",
    img: "https://images.unsplash.com/photo-1602810320073-1230c46d89d4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Rm9ybWFsJTIwU2hpcnR8ZW58MHx8MHx8fDA%3D",
    productName: "Formal Shirt",
    price: "999.00",
    color: "White",
    badge: false,
    des: "Elegant formal shirt suitable for office.",
  },
  {
    _id: "p014",
    img: "https://plus.unsplash.com/premium_photo-1675186049366-64a655f8f537?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fFdvbWVuJ3MlMjBCbGF6ZXJ8ZW58MHx8MHx8fDA%3D",
    productName: "Women's Blazer",
    price: "1899.00",
    color: "Maroon",
    badge: true,
    des: "Professional women's blazer for office wear.",
  },
  {
    _id: "p015",
    img: "https://images.unsplash.com/photo-1715532098035-a343b26eaeaa?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Sm9nZ2VyJTIwUGFudHN8ZW58MHx8MHx8fDA%3D",
    productName: "Jogger Pants",
    price: "1099.00",
    color: "Olive",
    badge: false,
    des: "Stylish and comfortable joggers for daily use.",
  },
  {
    _id: "p016",
    img: "https://images.unsplash.com/photo-1717127251642-869277aa5929?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fFBvbG8lMjBUJTIwc2hpcnR8ZW58MHx8MHx8fDA%3D",
    productName: "Polo T-shirt",
    price: "699.00",
    color: "Green",
    badge: true,
    des: "Classic polo shirt for a casual smart look.",
  },
];


const Fashion = () => {
  return (
    <div className="w-full pb-16">
      <Heading heading="Fashion" />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-2">
        {products.map((product) => (
          <Product
            key={product._id}
            _id={product._id}
            img={product.img}
            productName={product.productName}
            price={product.price}
            color={product.color}
            badge={product.badge}
            des={product.des}
          />
        ))}
      </div>
    </div>
  );
};

export default Fashion;
