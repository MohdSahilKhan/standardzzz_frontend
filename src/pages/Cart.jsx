import { useEffect } from "react";
import { useCart } from "../context/cartContext.jsx";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const navigate = useNavigate();
  const { cart, fetchCart, removeFromCart } = useCart();

  const pageBg = "#E1D0B3";
  const cardBg = "#703B3B";
  const textMain = "#3B1F1F";

  // Load cart when page opens
  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <div className="min-h-screen p-10" style={{ backgroundColor: pageBg }}>
      {/* HEADER */}
      <h1
        className="text-4xl font-bold mb-10"
        style={{
          color: textMain,
          fontFamily: "Cormorant Garamond, serif",
        }}
      >
        Your Cart
      </h1>

      {/* If cart empty */}
      {(!cart || cart.length === 0) && (
        <div className="text-center text-xl" style={{ color: textMain }}>
          Your cart is empty 😢  
          <button
            onClick={() => navigate("/home")}
            className="block mx-auto mt-4 px-6 py-2 rounded-xl"
            style={{ backgroundColor: cardBg, color: "#FFF4E0" }}
          >
            Back to Shop
          </button>
        </div>
      )}

      {/* CART LIST */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* LEFT SIDE - ITEMS */}
        <div className="lg:col-span-2 space-y-6">
          {cart?.map((item) => (
            <div
              key={item.id}
              className="flex gap-6 p-5 rounded-2xl shadow-lg"
              style={{
                backgroundColor: cardBg,
                border: `1px solid ${textMain}`,
              }}
            >
              {/* PRODUCT IMAGE */}
              <img
                src={item.product?.images?.[0] || "https://via.placeholder.com/200"}
                className="w-32 h-40 object-cover rounded-lg"
              />

              {/* INFO */}
              <div className="flex-1">
                <h2 className="text-2xl font-semibold" style={{ color: "#FFF4E0" }}>
                  {item.product?.name}
                </h2>

                <p style={{ color: pageBg }}>
                  {item.product?.description || "Premium outfit"}
                </p>

                <p className="text-xl font-bold mt-2" style={{ color: "#FFF4E0" }}>
                  ₹{item.product?.price}
                </p>

                <p className="mt-1 text-sm" style={{ color: pageBg }}>
                  Quantity: {item.quantity}
                </p>

                {/* REMOVE BUTTON */}
                <button
                  onClick={() => removeFromCart(item.product_id)}
                  className="mt-3 px-5 py-2 text-sm rounded-xl"
                  style={{
                    backgroundColor: pageBg,
                    color: textMain,
                    fontWeight: "600",
                  }}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* RIGHT SIDE - BILLING CARD */}
        <div
          className="p-6 rounded-2xl shadow-xl h-fit"
          style={{ backgroundColor: cardBg, border: `1px solid ${textMain}` }}
        >
          <h2
            className="text-3xl font-semibold mb-6"
            style={{ color: "#FFF4E0" }}
          >
            Order Summary
          </h2>

          {/* SUBTOTAL */}
          <p className="text-lg flex justify-between" style={{ color: pageBg }}>
            <span>Subtotal</span>
            <span>
              ₹
              {cart.reduce(
                (sum, item) => sum + (item.product?.price || 0) * item.quantity,
                0
              )}
            </span>
          </p>

          <hr className="my-4 border-[#E1D0B3]" />

          <h3
            className="text-2xl font-bold flex justify-between"
            style={{ color: "#FFF4E0" }}
          >
            <span>Total</span>
            <span>
              ₹
              {cart.reduce(
                (sum, item) => sum + (item.product?.price || 0) * item.quantity,
                0
              )}
            </span>
          </h3>

          {/* BUY BUTTON */}
          <button
            className="w-full mt-6 py-3 rounded-xl text-lg shadow-md"
            style={{
              backgroundColor: pageBg,
              color: textMain,
              fontWeight: "600",
            }}
          >
            Continue to Checkout →
          </button>
        </div>
      </div>
    </div>
  );
}
