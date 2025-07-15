import React from "react";
import Heading from "../../components/home/Products/Heading";
import Product from "../../components/home/Products/Product";

const products =[
  {
    _id: "k001",
    img: "https://plus.unsplash.com/premium_photo-1691367782367-2bd37f646abc?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8S2lkcyUyMFQlMjBzaGlydHxlbnwwfHwwfHx8MA%3D%3D",
    productName: "Kids T-shirt",
    price: "399.00",
    color: "Yellow",
    badge: true,
    des: "Bright yellow cotton T-shirt for boys and girls.",
  },
  {
    _id: "k002",
    img: "https://plus.unsplash.com/premium_photo-1698305283034-6fc20d4bf946?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Q2FydG9vbiUyMFByaW50JTIwSG9vZGllJTIwa2lkc3xlbnwwfHwwfHx8MA%3D%3D",
    productName: "Cartoon Print Hoodie",
    price: "799.00",
    color: "Blue",
    badge: true,
    des: "Warm hoodie with cartoon print for toddlers.",
  },
  {
    _id: "k003",
    img: "https://plus.unsplash.com/premium_photo-1722993519879-aadaa597ba3f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Q2hpbGRyZW4ncyUyMEJhY2twYWNrfGVufDB8fDB8fHww",
    productName: "Children's Backpack",
    price: "599.00",
    color: "Pink",
    badge: false,
    des: "Lightweight backpack for school-going kids.",
  },
  {
    _id: "k004",
    img: "https://plus.unsplash.com/premium_photo-1663040669845-e4ff569ee5f7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8Q3JheW9ucyUyMFNldHxlbnwwfHwwfHx8MA%3D%3D",
    productName: "Crayons Set",
    price: "199.00",
    color: "Multi-color",
    badge: true,
    des: "24-color wax crayons set for kids.",
  },
  {
    _id: "k005",
    img: "https://images.unsplash.com/photo-1666379685315-e51efcf30544?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8S2lkcyUyMERlbmltJTIwSmVhbnN8ZW58MHx8MHx8fDA%3D",
    productName: "Kids Denim Jeans",
    price: "699.00",
    color: "Blue",
    badge: false,
    des: "Durable denim jeans for playful kids.",
  },
  {
    _id: "k006",
    img: "https://images.unsplash.com/photo-1669691177924-f12fcc3cc540?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8RWR1Y2F0aW9uYWwlMjBUYWJsZXR8ZW58MHx8MHx8fDA%3D",
    productName: "Educational Tablet",
    price: "3499.00",
    color: "White",
    badge: true,
    des: "Kids learning tablet with educational apps.",
  },
  {
    _id: "k007",
    img: "https://images.unsplash.com/photo-1639813807238-5dc8236dca0d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fFN0b3J5JTIwQm9va3MlMjBDb21ib3xlbnwwfHwwfHx8MA%3D%3D",
    productName: "Story Books Combo",
    price: "499.00",
    color: "Multi",
    badge: true,
    des: "Set of 5 illustrated story books for kids.",
  },
  {
    _id: "k008",
    img: "https://images.unsplash.com/photo-1660844817855-3ecc7ef21f12?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fFNtYXJ0d2F0Y2h8ZW58MHx8MHx8fDA%3D",
    productName: "Kids Smartwatch",
    price: "1499.00",
    color: "Green",
    badge: false,
    des: "Smartwatch with GPS tracker and games for kids.",
  },
  {
    _id: "k009",
    img: "https://images.unsplash.com/photo-1627484164075-1f4126482550?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDZ8fHxlbnwwfHx8fHw%3D",
    productName: "Drawing Notebook",
    price: "149.00",
    color: "White",
    badge: false,
    des: "A4 size notebook for drawing and sketching.",
  },
  {
    _id: "k010",
    img: "https://images.unsplash.com/photo-1653074281018-c08f358059ab?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8VG95JTIwQ2FsY3VsYXRvcnxlbnwwfHwwfHx8MA%3D%3D",
    productName: "Toy Calculator",
    price: "199.00",
    color: "Red",
    badge: false,
    des: "Colorful toy calculator for math learning fun.",
  },
  {
    _id: "k011",
    img: "https://plus.unsplash.com/premium_photo-1673467011288-462c72c5ec69?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8UGVuY2lsJTIwQm94fGVufDB8fDB8fHww",
    productName: "Pencil Box Set",
    price: "249.00",
    color: "Blue",
    badge: true,
    des: "Cartoon-themed pencil box with accessories.",
  },
  {
    _id: "k012",
    img: "https://images.unsplash.com/photo-1595865211152-eec48f9055c7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8QWxwaGFiZXQlMjBQdXp6bGV8ZW58MHx8MHx8fDA%3D",
    productName: "Alphabet Puzzle",
    price: "349.00",
    color: "Multi",
    badge: true,
    des: "Wooden alphabet learning puzzle for toddlers.",
  },
  {
    _id: "k013",
    img: "https://images.unsplash.com/photo-1558140275-6b7b7bf2cfa1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8UmFpbmNvYXQlMjB3aXRoJTIwSG9vZCUyMGtpZHN8ZW58MHx8MHx8fDA%3D",
    productName: "Raincoat with Hood",
    price: "599.00",
    color: "Red",
    badge: false,
    des: "Waterproof kids' raincoat with cartoon design.",
  },
  {
    _id: "k014",
    img: "https://plus.unsplash.com/premium_photo-1667251760504-096946b820af?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8TWF0aCUyMEFjdGl2aXR5JTIwQm9va3xlbnwwfHwwfHx8MA%3D%3D",
    productName: "Math Activity Book",
    price: "179.00",
    color: "Multi",
    badge: true,
    des: "Fun math activities for kids age 5–8.",
  },
  {
    _id: "k015",
    img: "https://images.unsplash.com/photo-1669762162480-fb67378e307b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fENvbG9yZnVsJTIwU25lYWtlcnMlMjBraWRzfGVufDB8fDB8fHww",
    productName: "Colorful Sneakers",
    price: "899.00",
    color: "Mix",
    badge: false,
    des: "Vibrant kids sneakers for school and play.",
  },
  {
    _id: "k016",
    img: "https://images.unsplash.com/photo-1711049138930-0da818b971bf?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGtpZHMlMjBwdXp6ZWwlMjBib29rfGVufDB8fDB8fHww",
    productName: "Puzzle book",
    price: "399.00",
    color: "Black",
    badge: true,
    des: "LCD writing pad for practice and doodles.",
  },
];



const Kids = () => {
  return (
    <div className="w-full pb-16">
      <Heading heading="Kids" />
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

export default Kids;
