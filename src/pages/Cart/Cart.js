import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useCart } from "../../context/CartContext";
import { useDispatch, useSelector } from "react-redux";


import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import { resetCart } from "../../redux/orebiSlice";
import { emptyCart } from "../../assets/images/index";
import ItemCard from "./ItemCard";

const Cart = () => {
  const navigate = useNavigate();
  const { cart, removeFromCart, updateQuantity, checkout } = useCart();
  const [totalAmt, setTotalAmt] = useState(0);
  const [shippingCharge, setShippingCharge] = useState(0);

  useEffect(() => {
    let total = cart.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );
    setTotalAmt(total);
  }, [cart]);

  useEffect(() => {
    if (totalAmt <= 200 && totalAmt > 0) setShippingCharge(30);
    else if (totalAmt <= 400) setShippingCharge(25);
    else if (totalAmt > 400) setShippingCharge(20);
    else setShippingCharge(0);
  }, [totalAmt]);

  return (
    <div className="max-w-container mx-auto px-4 min-h-screen bg-gray-50">
      
      <Breadcrumbs title="Cart" />

      {cart.length > 0 ? (
        <div className="pb-20">
          {/* Table Header */}
          <div className="w-full h-20 bg-[#F5F7F7] text-primeColor hidden lgl:grid grid-cols-5 place-content-center px-6 text-lg font-titleFont font-semibold">
            <h2 className="col-span-2">Product</h2>
            <h2>Price</h2>
            <h2>Quantity</h2>
            <h2>Sub Total</h2>
          </div>

          {/* Cart Items */}
          <div className="mt-5 space-y-4">
            {cart.map((item) => ( 
              <div
                key={item.id}
                className="grid grid-cols-1 lgl:grid-cols-5 items-center gap-4 bg-white p-4 shadow-sm rounded-md"
              >
                {/* Product Info */}
                <div className="flex items-center col-span-2" >
                  <img
                    src={
                      item.product.image
                        ? `${process.env.REACT_APP_API_URL}/public/${item.product.image}`
                        : "/placeholder.jpg"
                    }
                    alt={item.product.name}
                    onClick={()=> navigate(`/product/${item.product.id}`)}
                    className="w-20 h-20 object-cover rounded mr-4 cursor-pointer"
                  />
                  <div>
                    <h3 className="font-semibold text-lg">{item.product.name}</h3>
                    <p className="text-gray-500 text-sm">
                      ₹{item.product.price.toLocaleString()}
                    </p>
                  </div>
                </div>

                {/* Price */}
                <p className="text-gray-700 text-base">
                  ₹{item.product.price.toLocaleString()}
                </p>

                {/* Quantity Controls */}
                <div className="flex items-center justify-center">
                  <button
                    onClick={() =>
                      updateQuantity(item.id, Math.max(1, item.quantity - 1), (item.product.price * (item.quantity-1)))
                    }
                    className="px-2 py-1 bg-gray-200 rounded-l"
                  >
                    -
                  </button>
                  <span className="px-3 bg-gray-100 text-sm">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.id, (item.quantity + 1), (item.product.price * (item.quantity+1)))}
                    className="px-2 py-1 bg-gray-200 rounded-r"
                  >
                    +
                  </button>
                </div>

                {/* Subtotal + Remove */}
                <div className="flex flex-col items-center gap-2">
                  <p className="font-semibold">
                    ₹{(item.product.price * item.quantity).toLocaleString()}
                  </p>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:text-red-700 text-sm font-medium"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Totals Section */}
          <div className="max-w-7xl flex justify-end mt-10">
            <div className="w-96 flex flex-col gap-4 border rounded-md p-4 shadow-md bg-white">
              <h1 className="text-2xl font-semibold text-right text-primeColor">
                Cart Totals
              </h1>
              <div>
                <p className="flex items-center justify-between border-b py-1.5 text-lg px-2 font-medium">
                  Subtotal
                  <span className="font-semibold tracking-wide font-titleFont">
                    ₹{totalAmt.toLocaleString()}
                  </span>
                </p>
                <p className="flex items-center justify-between border-b py-1.5 text-lg px-2 font-medium">
                  Shipping Charge
                  <span className="font-semibold tracking-wide font-titleFont">
                    ₹{shippingCharge}
                  </span>
                </p>
                <p className="flex items-center justify-between py-1.5 text-lg px-2 font-bold text-primeColor">
                  Total
                  <span className="font-bold tracking-wide text-lg font-titleFont">
                    ₹{(totalAmt + shippingCharge).toLocaleString()}
                  </span>
                </p>
              </div>
              <div className="flex justify-end">
                <button
                  onClick={() => navigate("/checkout", { state: { totalAmt, shippingCharge, cart } })}
                  className="w-52 h-10 bg-primeColor text-white hover:bg-black duration-300 rounded-md"
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col mdl:flex-row justify-center items-center gap-4 pb-20"
        >
          <div>
            <img
              className="w-80 rounded-lg p-4 mx-auto"
              src={emptyCart}
              alt="emptyCart"
            />
          </div>
          <div className="max-w-[500px] p-4 py-8 bg-white flex gap-4 flex-col items-center rounded-md shadow-lg">
            <h1 className="font-titleFont text-xl font-bold uppercase">
              Your Cart feels lonely.
            </h1>
            <p className="text-sm text-center px-10 -mt-2">
              Your Shopping cart lives to serve. Give it purpose — fill it with
              products and make it happy.
            </p>
            <Link to="/shop">
              <button className="bg-primeColor rounded-md cursor-pointer hover:bg-black active:bg-gray-900 px-8 py-2 font-titleFont font-semibold text-lg text-gray-200 hover:text-white duration-300">
                Continue Shopping
              </button>
            </Link>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Cart;
