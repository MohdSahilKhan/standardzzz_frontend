import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const BASE_URL = "https://rails-api-3rfk.onrender.com";

  const [mobile, setMobile] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");

  // -------------------------------------------------
  // SEND OTP  -->  POST /api/login
  // -------------------------------------------------
  const handleSendOtp = async () => {
    if (mobile.length !== 10) {
      setError("Please enter a valid 10-digit mobile number.");
      return;
    }

    setError("");

    try {
      const response = await fetch(`${BASE_URL}/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mobile_number: Number(mobile),
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setShowOtp(true);
      } else {
        setError(data.message || "Something went wrong.");
      }
    } catch {
      setError("Network error. Try again.");
    }
  };

  // -------------------------------------------------
  // VERIFY OTP  -->  POST /api/verify_mobile
  // -------------------------------------------------
  const handleVerifyOtp = async () => {
    if (otp.length < 4) {
      setError("Enter valid OTP");
      return;
    }

    setError("");

    try {
      const response = await fetch(`${BASE_URL}/api/verify_mobile`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mobile_number: Number(mobile),
          otp: otp,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        navigate("/home");
      } else {
        setError(data.message || "Invalid OTP");
      }
    } catch {
      setError("Network error. Try again.");
    }
  };

  return (
    <div className="min-h-screen bg-white flex justify-center items-center px-6">
      <div className="relative w-full max-w-md p-10 rounded-3xl shadow-xl border border-[#d4af37]/30 bg-white">

        {/* Brand Title */}
        <h1 className="text-4xl font-bold text-center mb-3 tracking-wide text-gray-900">
          STANDARD<span className="text-[#d4af37]">ZZZ</span>
        </h1>

        <p className="text-center text-gray-500 mb-10 font-medium">
          Login to continue
        </p>

        {/* MOBILE NUMBER */}
        <label className="text-gray-700 font-medium">Mobile Number</label>
        <div className="flex items-center gap-3 mt-2 mb-6">
          <input
            type="number"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            placeholder="10-digit mobile number"
            className="w-full px-4 py-3 rounded-xl border border-gray-300 
            focus:border-[#d4af37] focus:ring-2 focus:ring-[#d4af37]/40 transition outline-none"
          />

          <button
            onClick={handleSendOtp}
            className="text-[#d4af37] font-semibold hover:text-[#c19d2f] text-sm"
          >
            Send OTP
          </button>
        </div>

        {/* OTP INPUT */}
        {showOtp && (
          <div className="animate-fadeIn">
            <label className="text-gray-700 font-medium">Enter OTP</label>
            <input
              type="number"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="6-digit OTP"
              className="w-full mt-2 mb-6 px-4 py-3 rounded-xl border border-gray-300 
              focus:border-[#d4af37] focus:ring-2 focus:ring-[#d4af37]/40 transition outline-none"
            />

            <button
              onClick={handleVerifyOtp}
              className="w-full py-3 bg-[#d4af37] hover:bg-[#c19d2f] text-white font-semibold 
              rounded-xl transition shadow-md"
            >
              Verify & Continue
            </button>
          </div>
        )}

        {/* BOTTOM LEFT LINK */}
        <p
          onClick={() => navigate("/signup")}
          className="absolute bottom-4 left-6 text-sm text-gray-600 hover:text-[#d4af37] cursor-pointer font-medium"
        >
          New user? Sign up
        </p>

        {/* ERROR MESSAGE */}
        {error && (
          <p className="text-red-500 text-center text-sm mt-4">{error}</p>
        )}
      </div>
    </div>
  );
}
