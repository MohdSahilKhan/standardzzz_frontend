import { createContext, useContext, useState } from "react";

const CartContext = createContext();
const BASE_URL = "https://rails-api-3rfk.onrender.com";

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // ---------------------------
  // ADD TO CART (API CONNECTED)
  // ---------------------------
  const addToCart = async (product) => {
    try {
      const token = localStorage.getItem("authToken");

      if (!token) {
        console.log("❌ No token found. User not logged in.");
        return;
      }

      const res = await fetch(`${BASE_URL}/cart/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          product_id: product.id,
          quantity: 1,
        }),
      });

      const data = await res.json();

      console.log("🔵 RAW CART RESPONSE:", data);

      if (res.ok) {
        // Backend returns a single item, NOT `cart: [...]`
        if (data.id) {
          console.log("🟢 CART ITEM RECEIVED:", data);

          // store item inside an array
          setCart((prev) => {
            // if product already existed update quantity
            const exists = prev.find((i) => i.product_id === data.product_id);

            if (exists) {
              return prev.map((i) =>
                i.product_id === data.product_id
                  ? { ...i, quantity: data.quantity }
                  : i
              );
            }

            // else add as new item
            return [...prev, data];
          });
        } else {
          console.log("⚠️ Unexpected response:", data);
        }
      } else {
        console.log("❌ CART ERROR:", data);
      }
    } catch (err) {
      console.log("❌ ADD TO CART FAILED:", err);
    }
  };

  // ---------------------------
  // SHOW CART
  // ---------------------------
  const fetchCart = async () => {
    try {
      const token = localStorage.getItem("authToken");

      if (!token) return;

      const res = await fetch(`${BASE_URL}/cart/show`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();

      if (res.ok) {
        console.log("🟢 FULL CART:", data);
        setCart(Array.isArray(data) ? data : [data]);
      }
    } catch (err) {
      console.log("❌ CART LOAD FAILED:", err);
    }
  };

  // ---------------------------
  // REMOVE ITEM
  // ---------------------------
  const removeFromCart = async (productId) => {
    try {
      const token = localStorage.getItem("authToken");

      const res = await fetch(`${BASE_URL}/cart/remove`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ product_id: productId }),
      });

      const data = await res.json();

      if (res.ok) {
        setCart((prev) => prev.filter((i) => i.product_id !== productId));
      }
    } catch (err) {
      console.log("❌ REMOVE FAILED:", err);
    }
  };

  // ---------------------------
  // CLEAR CART
  // ---------------------------
  const clearCart = async () => {
    try {
      const token = localStorage.getItem("authToken");

      const res = await fetch(`${BASE_URL}/cart/clear`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        setCart([]);
      }
    } catch (err) {
      console.log("❌ CLEAR FAILED:", err);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        fetchCart,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
