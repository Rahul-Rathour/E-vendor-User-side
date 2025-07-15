import React from "react";
import Heading from "../../components/home/Products/Heading";
import Product from "../../components/home/Products/Product";

const products =[
  {
    _id: "m001",
    img: "https://plus.unsplash.com/premium_photo-1661329970679-2cbca4fca739?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Rm9ybWFsJTIwV2hpdGUlMjBTaGlydHxlbnwwfHwwfHx8MA%3D%3D",
    productName: "Formal White Shirt",
    price: "899.00",
    color: "White",
    badge: true,
    des: "Classic white formal shirt, perfect for office and meetings.",
  },
  {
    _id: "m002",
    img: "https://images.unsplash.com/photo-1630173250799-2813d34ed14b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8U2xpbSUyMEZpdCUyMEJsYXplcnxlbnwwfHwwfHx8MA%3D%3D",
    productName: "Slim Fit Blazer",
    price: "2399.00",
    color: "Navy Blue",
    badge: true,
    des: "Tailored slim fit blazer ideal for formal occasions.",
  },
  {
    _id: "m003",
    img: "https://images.unsplash.com/photo-1644084947934-9a8a769e8c87?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Q2FzdWFsJTIwR3JleSUyMEhvb2RpZXxlbnwwfHwwfHx8MA%3D%3D",
    productName: "Casual Grey Hoodie",
    price: "1099.00",
    color: "Grey",
    badge: false,
    des: "Comfortable hoodie suitable for casual outings.",
  },
  {
    _id: "m004",
    img: "https://images.unsplash.com/photo-1614699745279-2c61bd9d46b5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8RGVuaW0lMjBKYWNrZXR8ZW58MHx8MHx8fDA%3D",
    productName: "Denim Jacket",
    price: "1499.00",
    color: "Blue",
    badge: true,
    des: "Rugged blue denim jacket for all seasons.",
  },
  {
    _id: "m005",
    img: "https://images.unsplash.com/photo-1715532098035-a343b26eaeaa?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Sm9nZ2VyJTIwUGFudHN8ZW58MHx8MHx8fDA%3D",
    productName: "Jogger Pants",
    price: "999.00",
    color: "Black",
    badge: false,
    des: "Comfort fit joggers for workouts or casual wear.",
  },
  {
    _id: "m006",
    img: "https://images.unsplash.com/photo-1551794840-8ae3b9c181f8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8TGVhdGhlciUyMEphY2tldHxlbnwwfHwwfHx8MA%3D%3D",
    productName: "Leather Jacket",
    price: "2799.00",
    color: "Brown",
    badge: true,
    des: "Bold brown leather jacket with zip pockets.",
  },
  {
    _id: "m007",
    img: "https://plus.unsplash.com/premium_photo-1693222144072-7f9ddceeb7c7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8QXZpYXRvciUyMFN1bmdsYXNzZXN8ZW58MHx8MHx8fDA%3D",
    productName: "Aviator Sunglasses",
    price: "599.00",
    color: "Black",
    badge: false,
    des: "Stylish aviator sunglasses for sunny days.",
  },
  {
    _id: "m008",
    img: "https://images.unsplash.com/photo-1597350584914-55bb62285896?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8V2hpdGUlMjBTbmVha2Vyc3xlbnwwfHwwfHx8MA%3D%3D",
    productName: "White Sneakers",
    price: "1799.00",
    color: "White",
    badge: true,
    des: "Trendy white sneakers for everyday wear.",
  },
  {
    _id: "m009",
    img: "https://images.unsplash.com/photo-1548883354-7622d03aca27?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Q2FyZ28lMjBQYW50c3xlbnwwfHwwfHx8MA%3D%3D",
    productName: "Olive Green Cargo Pants",
    price: "1199.00",
    color: "Olive",
    badge: false,
    des: "Stylish and durable cargo pants for men.",
  },
  {
    _id: "m010",
    img: "https://images.unsplash.com/photo-1717127251642-869277aa5929?w=500&auto=format&fit=crop&q=60",
    productName: "Polo T-shirt",
    price: "749.00",
    color: "Green",
    badge: true,
    des: "Classic polo T-shirt for a smart casual look.",
  },
  {
    _id: "m011",
    img: "https://plus.unsplash.com/premium_photo-1673977134363-c86a9d5dcafa?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fFNsaW0lMjBGaXQlMjBKZWFuc3xlbnwwfHwwfHx8MA%3D%3D",
    productName: "Slim Fit Jeans",
    price: "1299.00",
    color: "Denim",
    badge: false,
    des: "Slim fit denim jeans for daily wear.",
  },
  {
    _id: "m012",
    img: "https://plus.unsplash.com/premium_photo-1733701621462-a74d3d408319?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fFdpbnRlciUyMFN3ZWF0ZXIlMjBtZW5zfGVufDB8fDB8fHww",
    productName: "Winter Sweater",
    price: "999.00",
    color: "Brown",
    badge: true,
    des: "Cozy turtleneck sweater for chilly weather.",
  },
  {
    _id: "m013",
    img: "https://images.unsplash.com/photo-1655930164525-65077382f6a2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fENhcCUyMG1lbnN8ZW58MHx8MHx8fDA%3D",
    productName: "Casual Cap",
    price: "299.00",
    color: "Khaki",
    badge: false,
    des: "Cotton cap to complete your sporty outfit.",
  },
  {
    _id: "m014",
    img: "https://plus.unsplash.com/premium_photo-1679440414572-b134ca07fb25?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Rmxhbm5lbCUyMFNoaXJ0fGVufDB8fDB8fHww",
    productName: "Flannel Shirt",
    price: "999.00",
    color: "Red",
    badge: true,
    des: "Soft flannel shirt with checkered pattern.",
  },
  {
    _id: "m015",
    img: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fFJ1bm5pbmclMjBTaG9lc3xlbnwwfHwwfHx8MA%3D%3D",
    productName: "Running Shoes",
    price: "1399.00",
    color: "Grey",
    badge: false,
    des: "Lightweight running shoes for active men.",
  },
  {
    _id: "m016",
    img: "https://plus.unsplash.com/premium_photo-1677363466943-3791625ce4e5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8TWVuJ3MlMjBCYWNrcGFja3xlbnwwfHwwfHx8MA%3D%3D",
    productName: "Men's Backpack",
    price: "1499.00",
    color: "Black",
    badge: true,
    des: "Durable and stylish backpack for daily use.",
  },
];


const Mens = () => {
  return (
    <div className="w-full pb-16">
      <Heading heading="Mens" />
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

export default Mens;
