import React from "react";
import Heading from "../../components/home/Products/Heading";
import Product from "../../components/home/Products/Product";

const products = [
  {
    _id: "t001",
    img: "https://plus.unsplash.com/premium_photo-1682123999644-1ff465694dde?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8Q2FydG9vbiUyMFByaW50JTIwU29mdCUyMFRveSUyMHdpdGhvdXQlMjBiYWNrZ3JvdW5kfGVufDB8fDB8fHww",
    productName: "Cartoon Print Soft Toy",
    price: "499.00",
    color: "Blue",
    badge: true,
    des: "Fluffy cartoon-themed soft toy for kids.",
  },
  {
    _id: "t002",
    img: "https://images.unsplash.com/photo-1625225229083-f256754cf34e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8RHJhd2luZyUyMFRveSUyME5vdGVib29rfGVufDB8fDB8fHww",
    productName: "Drawing Toy Notebook",
    price: "149.00",
    color: "White",
    badge: false,
    des: "Toy-style notebook with drawing sheets and stickers.",
  },
  {
    _id: "t003",
    img: "https://images.unsplash.com/photo-1653074281018-c08f358059ab?w=500&auto=format&fit=crop&q=60",
    productName: "Toy Calculator",
    price: "199.00",
    color: "Red",
    badge: false,
    des: "Colorful toy calculator for math learning fun.",
  },
  {
    _id: "t004",
    img: "https://images.unsplash.com/photo-1595865211152-eec48f9055c7?w=500&auto=format&fit=crop&q=60",
    productName: "Alphabet Toy Puzzle",
    price: "349.00",
    color: "Multi",
    badge: true,
    des: "Wooden toy puzzle to teach alphabets.",
  },
  {
    _id: "t005",
    img: "https://images.unsplash.com/photo-1642423404943-698e8b6b23a6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fFNtYXJ0JTIwVG95JTIwV2F0Y2h8ZW58MHx8MHx8fDA%3D",
    productName: "Smart Toy Watch",
    price: "1499.00",
    color: "Green",
    badge: false,
    des: "Smartwatch toy with GPS and built-in games.",
  },
  {
    _id: "t006",
    img: "https://images.unsplash.com/photo-1639813807238-5dc8236dca0d?w=500&auto=format&fit=crop&q=60",
    productName: "Story Toy Books Combo",
    price: "499.00",
    color: "Multi",
    badge: true,
    des: "Fun toy-style illustrated story books set.",
  },
  {
    _id: "t007",
    img: "https://images.unsplash.com/photo-1669691177924-f12fcc3cc540?w=500&auto=format&fit=crop&q=60",
    productName: "Educational Toy Tablet",
    price: "3499.00",
    color: "White",
    badge: true,
    des: "Toy tablet with educational apps for kids.",
  },
  {
    _id: "t008",
    img: "https://images.unsplash.com/photo-1631061184412-b18f5fb1dc70?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fENyYXlvbnMlMjBDb2xvcmluZyUyMFNldHxlbnwwfHwwfHx8MA%3D%3D",
    productName: "Crayons Coloring Set",
    price: "199.00",
    color: "Multi-color",
    badge: true,
    des: "24-color toy crayons set for artistic play.",
  },
  {
    _id: "t009",
    img: "https://images.unsplash.com/photo-1685358294572-6b658452b5be?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8TWF0aCUyMEZ1biUyMEFjdGl2aXR5JTIwVG95JTIwQm9va3xlbnwwfHwwfHx8MA%3D%3D",
    productName: "Math Fun Activity Toy Book",
    price: "179.00",
    color: "Multi",
    badge: true,
    des: "Interactive toy book with fun math activities.",
  },
  {
    _id: "t010",
    img: "https://plus.unsplash.com/premium_photo-1673467011288-462c72c5ec69?w=500&auto=format&fit=crop&q=60",
    productName: "Cartoon Pencil Box Toy",
    price: "249.00",
    color: "Blue",
    badge: true,
    des: "Pencil box styled like a toy with cartoon theme.",
  },
  {
    _id: "t011",
    img: "https://images.unsplash.com/photo-1558140275-6b7b7bf2cfa1?w=500&auto=format&fit=crop&q=60",
    productName: "Toy Raincoat Set",
    price: "599.00",
    color: "Red",
    badge: false,
    des: "Waterproof toy-themed raincoat for kids' dress up.",
  },
  {
    _id: "t012",
    img: "https://images.unsplash.com/photo-1669762162480-fb67378e307b?w=500&auto=format&fit=crop&q=60",
    productName: "Colorful Toy Sneakers",
    price: "899.00",
    color: "Mix",
    badge: false,
    des: "Bright toy-style sneakers for pretend play.",
  },
  {
    _id: "t013",
    img: "https://images.unsplash.com/photo-1711049138930-0da818b971bf?w=500&auto=format&fit=crop&q=60",
    productName: "Puzzle LCD Toy Book",
    price: "399.00",
    color: "Black",
    badge: true,
    des: "LCD doodle pad styled as a toy puzzle book.",
  },
  {
    _id: "t014",
    img: "https://images.unsplash.com/photo-1740080164187-9a182c769d0a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8U3RhY2tpbmclMjBSaW5ncyUyMFRveXxlbnwwfHwwfHx8MA%3D%3D",
    productName: "Stacking Rings Toy",
    price: "299.00",
    color: "Rainbow",
    badge: true,
    des: "Classic colorful stacking rings toy for toddlers.",
  },
  {
    _id: "t015",
    img: "https://images.unsplash.com/photo-1628269148390-8c33c373f766?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8VG95JTIwVHJhaW4lMjBTZXR8ZW58MHx8MHx8fDA%3D",
    productName: "Toy Train Set",
    price: "799.00",
    color: "Multi",
    badge: false,
    des: "Mini train set with tracks and engine.",
  },
  {
    _id: "t016",
    img: "https://images.unsplash.com/photo-1638802538115-041e14d28d6a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8QnVpbGRpbmclMjBCbG9ja3MlMjBTZXR8ZW58MHx8MHx8fDA%3D",
    productName: "Building Blocks Set",
    price: "599.00",
    color: "Multi",
    badge: true,
    des: "Colorful building blocks toy for creative play.",
  },
];



const Toys = () => {
  return (
    <div className="w-full pb-16">
      <Heading heading="Toys" />
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

export default Toys;
