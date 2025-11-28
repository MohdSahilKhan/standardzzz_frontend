import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCart } from "../context/cartContext.jsx";

export default function Home() {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const userName = localStorage.getItem("authName") || "User";

  const BASE_URL = "https://rails-api-3rfk.onrender.com";

  // THEME COLORS
  const pageBg = "#E1D0B3";
  const navbarBg = "#703B3B";
  const cardBg = "#703B3B";
  const textMain = "#3B1F1F";

  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch(`${BASE_URL}/products`);
      const data = await res.json();
      setProducts(data || []);
    } catch (err) {
      console.log("Error fetching products:", err);
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: pageBg }}>

      {/* NAVBAR */}
      <nav
        className="w-full shadow-md py-4 px-8 flex items-center justify-between fixed top-0 left-0 z-50 border-b"
        style={{ backgroundColor: navbarBg, borderColor: textMain }}
      >
        {/* LOGO */}
        <h1
          className="text-3xl font-bold tracking-wide"
          style={{ color: "#FFF4E0" }}
        >
          STANDARD<span style={{ color: pageBg }}>ZZZ</span>
        </h1>

        {/* SEARCH BAR */}
        <div className="flex items-center w-1/3">
          <input
            type="text"
            placeholder="Search..."
            className="w-full px-4 py-2 rounded-xl border outline-none transition"
            style={{
              backgroundColor: pageBg,
              borderColor: textMain,
              color: textMain,
            }}
          />
        </div>

        {/* USER AREA */}
        <div className="flex items-center gap-6">
          <p style={{ color: "#FFF4E0", fontWeight: 500 }}>
            Hello, {userName}
          </p>

          {/* CART BUTTON */}
          <button
            onClick={() => navigate("/cart")}
            className="px-5 py-2 rounded-xl text-white"
            style={{ backgroundColor: textMain }}
          >
            Cart
          </button>

          {/* LOGOUT BUTTON */}
          <button
            onClick={() => {
              localStorage.removeItem("auth");
              localStorage.removeItem("authName");
              navigate("/login");
            }}
            className="px-5 py-2 text-white rounded-xl transition shadow-md"
            style={{ backgroundColor: textMain }}
          >
            Logout
          </button>
        </div>
      </nav>

      {/* MAIN CONTENT */}
      <div className="pt-32">

        {/* HERO SECTION */}
        <div
          className="relative w-full h-[420px] rounded-3xl overflow-hidden shadow-xl mb-14 mx-auto animate-fadeIn"
          style={{ maxWidth: "92%" }}
        >
          <img
            src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab"
            alt="Fashion banner"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#703b3b7c] backdrop-blur-sm"></div>

          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
            <h2
              className="text-6xl font-bold mb-4"
              style={{ color: pageBg, fontFamily: "Cormorant Garamond, serif" }}
            >
              Crafted for Modern Elegance
            </h2>

            <p
              className="text-xl mb-6"
              style={{
                color: "#fdefd3",
                fontFamily: "Cormorant Garamond, serif",
              }}
            >
              Premium Shirts • Luxury Aesthetic • Vintage Touch
            </p>

            <button
              className="px-8 py-3 rounded-xl shadow-md text-lg"
              style={{ backgroundColor: pageBg, color: textMain, fontWeight: "600" }}
            >
              Explore Collection →
            </button>
          </div>
        </div>

        {/* TITLE */}
        <h2
          className="text-3xl font-bold mb-5 px-10"
          style={{ color: textMain, fontFamily: "Cormorant Garamond, serif" }}
        >
          Our Products
        </h2>

        {/* PRODUCT GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-10 pb-20">
          {products.length === 0 ? (
            <p className="col-span-full text-center" style={{ color: textMain }}>
              Loading products...
            </p>
          ) : (
            products.map((item) => {
              const img = item.images?.[0];

              return (
                <div
                  key={item.id}
                  className="p-5 rounded-2xl shadow-lg hover:shadow-xl transition transform hover:-translate-y-1 animate-fadeInUp"
                  style={{
                    backgroundColor: cardBg,
                    border: `1px solid ${textMain}`,
                    color: "#FFF4E0",
                  }}
                >

                  {/* IMAGE CLICK → PRODUCT PAGE */}
                  <img
                    onClick={() => navigate(`/product/${item.id}`)}
                    src={
                      img ||
                      "https://via.placeholder.com/350x450?text=No+Image+Available"
                    }
                    alt={item.name}
                    className="w-full h-[320px] object-cover rounded-xl cursor-pointer"
                    style={{ border: `1px solid ${textMain}` }}
                  />

                  <h3
                    className="mt-4 text-xl font-semibold"
                    style={{ color: "#fff" }}
                  >
                    {item.name}
                  </h3>

                  <p className="text-sm mt-1" style={{ color: pageBg }}>
                    {Array.isArray(item.description)
                      ? item.description.join(", ")
                      : item.description}
                  </p>

                  <p className="mt-3 text-2xl font-bold" style={{ color: "#FFF4E0" }}>
                    ₹{item.price}
                  </p>

                  {/* ADD TO CART */}
                  <button
                    onClick={() => addToCart(item)}
                    className="w-full mt-4 py-2 rounded-xl transition"
                    style={{ backgroundColor: pageBg, color: textMain, fontWeight: "600" }}
                  >
                    Add to Cart
                  </button>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* ANIMATIONS */}
      <style>
        {`
          @keyframes fadeIn {
            0% { opacity: 0; }
            100% { opacity: 1; }
          }
          .animate-fadeIn { animation: fadeIn 1s ease-in-out; }

          @keyframes fadeInUp {
            0% { opacity: 0; transform: translateY(30px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          .animate-fadeInUp { animation: fadeInUp 0.7s ease-out; }
        `}
      </style>
    </div>
  );
}
