import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../context/cartContext.jsx";

export default function ProductDetails() {
  const { id } = useParams();               // product ID from URL
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const BASE_URL = "https://rails-api-3rfk.onrender.com";

  // THEME
  const pageBg = "#E1D0B3";
  const cardBg = "#703B3B";
  const textMain = "#3B1F1F";

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch single product
  useEffect(() => {
    fetchSingleProduct();
  }, []);

  const fetchSingleProduct = async () => {
    try {
      const res = await fetch(`${BASE_URL}/products/${id}`);
      const data = await res.json();
      setProduct(data);
    } catch (err) {
      console.log("Error loading product:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-2xl"
        style={{ backgroundColor: pageBg, color: textMain }}>
        Loading...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center text-2xl"
        style={{ backgroundColor: pageBg, color: textMain }}>
        Product not found
      </div>
    );
  }

  return (
    <div className="min-h-screen px-6 py-10"
      style={{ backgroundColor: pageBg }}>

      {/* BACK BUTTON */}
      <button
        onClick={() => navigate("/home")}
        className="px-4 py-2 mb-6 rounded-lg"
        style={{
          backgroundColor: textMain,
          color: "#FFF4E0",
        }}
      >
        ← Back to Home
      </button>

      {/* MAIN CONTAINER */}
      <div
        className="w-full max-w-5xl mx-auto p-6 rounded-3xl shadow-xl"
        style={{
          backgroundColor: cardBg,
          border: `2px solid ${textMain}`,
        }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

          {/* LEFT — ALL IMAGES */}
          <div>
            <h2 className="text-xl font-bold mb-3" style={{ color: "#FFF4E0" }}>
              Product Images
            </h2>

            <div className="flex flex-col gap-4">
              {product.images && product.images.length > 0 ? (
                product.images.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt="product"
                    className="w-full h-[350px] object-cover rounded-xl shadow-md"
                    style={{ border: `1px solid ${textMain}` }}
                  />
                ))
              ) : (
                <img
                  src="https://via.placeholder.com/400x400?text=No+Image"
                  className="w-full rounded-xl"
                />
              )}
            </div>
          </div>

          {/* RIGHT — DETAILS */}
          <div>
            <h1
              className="text-4xl font-bold mb-4"
              style={{ color: "#FFF4E0" }}
            >
              {product.name}
            </h1>

            <p
              className="text-lg mb-4"
              style={{ color: pageBg }}
            >
              {Array.isArray(product.description)
                ? product.description.join(", ")
                : product.description}
            </p>

            <p
              className="text-3xl font-bold mb-6"
              style={{ color: "#FFF4E0" }}
            >
              ₹{product.price}
            </p>

            {/* ADD TO CART */}
            <button
              onClick={() => addToCart(product)}
              className="w-full py-3 rounded-xl shadow-md"
              style={{
                backgroundColor: pageBg,
                color: textMain,
                fontWeight: "700",
              }}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
