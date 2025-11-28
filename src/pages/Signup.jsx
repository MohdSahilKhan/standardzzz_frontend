import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();
  const BASE_URL = "https://rails-api-3rfk.onrender.com";

  const pageBg = "#E1D0B3";
  const cardBg = "#703B3B";
  const inputBg = "#EBD9BD";
  const lightText = "#FFF4E0";
  const mainText = "#3B1F1F";

  const [fullName, setFullName] = useState("");
  const [mobile, setMobile] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");

  // -------------------------------
  // SEND OTP
  // -------------------------------
  const handleSendOtp = async () => {
    if (!fullName.trim()) return setError("Full Name is required.");
    if (mobile.length !== 10) return setError("Enter a valid 10-digit mobile number.");

    setError("");

    try {
      const res = await fetch(`${BASE_URL}/api/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user: { full_name: fullName, mobile_number: Number(mobile) }
        }),
      });

      const data = await res.json();
      console.log("SIGNUP RESPONSE:", data);

      if (res.ok) {
        setShowOtp(true);
      } else {
        // SHOW EXACT ERROR FROM BACKEND
        setError(data.message || "Something went wrong.");
      }
    } catch {
      setError("Network error. Try again.");
    }
  };

  // -------------------------------
  // VERIFY OTP
  // -------------------------------
  const handleVerifyOtp = async () => {
    if (otp.length < 4) return setError("Enter a valid OTP.");

    try {
      const res = await fetch(`${BASE_URL}/api/verify_mobile`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mobile_number: Number(mobile),
          otp,
        }),
      });

      const data = await res.json();
      console.log("VERIFY RESPONSE:", data);

      if (res.ok) {
        navigate("/home");
      } else {
        setError(data.message || "Invalid OTP.");
      }
    } catch {
      setError("Network error. Try again.");
    }
  };

  return (
    <div
      className="min-h-screen flex justify-center items-center px-6"
      style={{ backgroundColor: pageBg }}
    >
      {/* Card */}
      <div
        className="w-full max-w-md p-10 rounded-3xl shadow-xl border animate-fadeInUp relative"
        style={{
          backgroundColor: cardBg,
          borderColor: "#5e2f2f",
          boxShadow: "0px 20px 40px rgba(0,0,0,0.25)",
        }}
      >
        {/* Logo */}
        <h1
          className="text-4xl font-semibold text-center mb-2 tracking-wider"
          style={{ color: lightText, fontFamily: "serif" }}
        >
          STANDARD<span style={{ color: pageBg }}>ZZZ</span>
        </h1>

        <p className="text-center mb-10" style={{ color: "#E7CDB2" }}>
          Create your account
        </p>

        {/* FULL NAME */}
        <label style={{ color: lightText }} className="font-medium">
          Full Name
        </label>
        <input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          placeholder="Enter your full name"
          className="w-full mt-2 mb-6 px-4 py-3 rounded-xl border outline-none"
          style={{
            backgroundColor: inputBg,
            borderColor: mainText,
            color: mainText,
          }}
        />

        {/* MOBILE NUMBER */}
        <label style={{ color: lightText }} className="font-medium">
          Mobile Number
        </label>

        <div className="flex items-center gap-3 mt-2 mb-6">
          <input
            type="number"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            placeholder="10-digit mobile number"
            className="w-full px-4 py-3 rounded-xl border outline-none"
            style={{
              backgroundColor: inputBg,
              borderColor: mainText,
              color: mainText,
            }}
          />

          <button
            onClick={handleSendOtp}
            className="font-semibold text-sm px-3 py-2 rounded-lg"
            style={{
              color: pageBg,
              backgroundColor: "#5e2f2f",
            }}
          >
            Verify
          </button>
        </div>

        {/* OTP SECTION */}
        {showOtp && (
          <div className="animate-fadeIn">
            <label style={{ color: lightText }} className="font-medium">
              Enter OTP
            </label>

            <input
              type="number"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="6-digit OTP"
              className="w-full mt-2 mb-6 px-4 py-3 rounded-xl border outline-none"
              style={{
                backgroundColor: inputBg,
                borderColor: mainText,
                color: mainText,
              }}
            />

            <button
              onClick={handleVerifyOtp}
              className="w-full py-3 rounded-xl transition shadow-md"
              style={{
                backgroundColor: "#E1D0B3",
                color: "#3B1F1F",
                fontWeight: "600",
              }}
            >
              Verify & Continue
            </button>
          </div>
        )}

        {/* Login Link */}
        <p
          className="absolute bottom-4 left-6 text-sm cursor-pointer"
          style={{ color: "#EBD9BD" }}
          onClick={() => navigate("/login")}
        >
          Already a user?
        </p>

        {/* ERROR BOX */}
        {error && (
          <p className="text-red-300 text-center text-sm mt-4">{error}</p>
        )}
      </div>

      {/* ANIMATION */}
      <style>
        {`
          @keyframes fadeInUp {
            0% { opacity: 0; transform: translateY(30px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          .animate-fadeInUp {
            animation: fadeInUp 0.7s ease-out;
          }
        `}
      </style>
    </div>
  );
}
