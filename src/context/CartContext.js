import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import api from "../api";
 
const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("userToken") || null);

  // Sync token with localStorage
  const refreshToken = () => {
    const storedToken = localStorage.getItem("userToken");
    setToken(storedToken);
  };

  // Fetch user cart
  const fetchCart = async () => {
    if (!token) {
      setCart([]);
      return;
    }
    try {
      const res = await api.get("/cart", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data.status) setCart(res.data.data);
    } catch (err) {
      console.error("Error fetching cart:", err);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [token]);

  // Add item to cart (GST added)
  const addToCart = async (productId, price, gst) => {
    try {
      if (!token) {
        toast.error("Please login to add items to cart");
        return;
      }

      const res = await api.post(
        "/cart-add",
        {
          product_id: productId,
          quantity: 1,
          price: price,
          gst: gst, // NEW FIELD
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data.status) fetchCart();
    } catch (err) {
      toast.error("Failed to add item to cart");
      console.error("Error adding to cart:", err);
    }
  };

  // Remove item
  const removeFromCart = async (id) => {
    try {
      const res = await api.delete(`/cart-delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data.status) fetchCart();
    } catch (err) {
      console.error("Error removing from cart:", err);
    }
  };

  // Update quantity (GST added)
  const updateQuantity = async (id, quantity, price, gst) => {
    // Instant UI update
    setCart((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity,
              price,
              gst,
            }
          : item
      )
    );

    try {
      const res = await api.post(
        `/cart-update/${id}`,
        {
          quantity,
          price,
          gst, // NEW FIELD
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data.status) fetchCart();
    } catch (err) {
      console.error("Error updating quantity:", err);
    }
  };

  // Checkout
  const checkout = async (shippingAddress, paymentMethod, order_number) => {
    try {
      const res = await api.post(
        "/cart-checkout",
        {
          shipping_address: shippingAddress,
          payment_method: paymentMethod,
          order_number: order_number,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data.status) {
        toast.success("✅ Order placed successfully!");
        fetchCart();
        return true;
      } else {
        alert("❌ " + (res.data.message || "Something went wrong"));
        return false;
      }
    } catch (err) {
      console.error("Checkout error:", err);
      alert("❌ Checkout failed!");
      return false;
    }
  };

  // Count items in cart
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        cartCount,
        addToCart,
        removeFromCart,
        updateQuantity,
        checkout,
        fetchCart,
        refreshToken,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
