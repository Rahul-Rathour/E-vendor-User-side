import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import api from "../api";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  // const token = localStorage.getItem("userToken");
  const [token, setToken] = useState(localStorage.getItem("userToken") || null);

  // Update token whenever user logs in or logs out
  const refreshToken = () => {
    const storedToken = localStorage.getItem("userToken");
    setToken(storedToken);
  };

  // Fetch cart items from backend when user logs in
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

  // Add item to cart
  const addToCart = async (productId, price) => {
    try {
      if (!token) {
        toast.error("Please login to add items to cart");
        return;
      }
      const res = await api.post(
        "/cart-add",
        { product_id: productId, quantity: 1, price: price },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.data.status) fetchCart();
    } catch (err) {
      toast.error("Failed to add item to cart");
      console.error("Error adding to cart:", err);
    }
  };

  // Remove item from cart
  const removeFromCart = async (id) => {
    try {
      const res = await api.delete(
        `/cart-delete/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.data.status) fetchCart();
    } catch (err) {
      console.error("Error removing from cart:", err);
    }
  };

  // Update quantity instantly + sync with backend
  const updateQuantity = async (id, quantity, price) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity, product: { ...item.product, price } } : item
      )
    );

    try {
      const res = await api.post(
        `/cart-update/${id}`,
        { quantity, price },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.data.status) fetchCart(); // ensure backend sync
    } catch (err) {
      console.error("Error updating quantity:", err);
    }
  };

  const checkout = async (shippingAddress) => {
    try {
      const res = await api.post(
        "/cart-checkout",
        { shipping_address: shippingAddress },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data.status) {
        toast.success("✅ Order placed successfully!");
        fetchCart(); // Clear the cart context
        return true; // Let CheckoutPage know it's successful
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
        refreshToken, // IMPORTANT: Call this after login!
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
