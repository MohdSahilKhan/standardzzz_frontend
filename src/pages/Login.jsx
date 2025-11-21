import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const BASE_URL = "https://rails-api-3rfk.onrender.com";

  const [loginType, setLoginType] = useState("mobile"); // mobile | email

  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");

  const [otp, setOtp] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const [error, setError] = useState("");

  // --------------------------
  // SEND OTP (MOBILE OR EMAIL)
  // --------------------------
  const handleSendOtp = async () => {
    setError("");

    let url = "";
    let body = {};

    if (loginType === "mobile") {
      if (mobile.length !== 10) {
        setError("Enter a valid 10-digit mobile number");
        return;
      }
      url = `${BASE_URL}/api/login_with_mobile`;
      body = { mobile_number: Number(mobile) };
    } else {
      if (!email.includes("@")) {
        setError("Enter a valid email");
        return;
      }
      url = `${BASE_URL}/api/verify_email`;
      body = { email };
    }

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (response.ok) {
        setShowOtp(true);
      } else {
        setError(data.message || "Something went wrong.");
      }
    } catch (err) {
      setError("Network error. Try again.");
    }
  };

  // --------------------------
  // VERIFY OTP
  // --------------------------
  const handleVerifyOtp = async () => {
    if (otp.length < 4) {
      setError("Enter valid OTP");
      return;
    }

    setError("");

    let url = "";
    let body = {};

    if (loginType === "mobile") {
      url = `${BASE_URL}/api/verify_mobile`;
      body = { mobile_number: Number(mobile), otp };
    } else {
      url = `${BASE_URL}/api/verify_email`;
      body = { email, otp };
    }

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (response.ok) {
        navigate("/home");
      } else {
        setError(data.message || "Invalid OTP");
      }
    } catch (err) {
      setError("Network error. Try again.");
    }
  };

  return (
    <div className="min-h-screen bg-white flex justify-center items-center px-6">
      <div className="w-full max-w-xl p-12 rounded-3xl shadow-xl border border-[#d4af37]/30 bg-white relative">

        {/* Already Signup? */}
        <p
          onClick={() => navigate("/signup")}
          className="absolute bottom-4 left-6 text-sm text-gray-600 hover:text-[#d4af37] cursor-pointer"
        >
          New user? Create account
        </p>

        <h1 className="text-4xl font-bold text-center mb-3 tracking-wide text-gray-900">
          STANDARD<span className="text-[#d4af37]">ZZZ</span>
        </h1>

        <p className="text-center text-gray-500 mb-10 font-medium">
          Login to continue
        </p>

        {/* Toggle Login Type */}
        <div className="flex justify-center gap-6 mb-8">
          <button
            onClick={() => { setLoginType("mobile"); setShowOtp(false); }}
            className={`pb-1 border-b-2 text-lg font-medium ${
              loginType === "mobile" ? "border-[#d4af37] text-[#d4af37]" : "border-transparent text-gray-500"
            }`}
          >
            Mobile Login
          </button>

          <button
            onClick={() => { setLoginType("email"); setShowOtp(false); }}
            className={`pb-1 border-b-2 text-lg font-medium ${
              loginType === "email" ? "border-[#d4af37] text-[#d4af37]" : "border-transparent text-gray-500"
            }`}
          >
            Email Login
          </button>
        </div>

        {/* ---------------------- FIELD AREA ---------------------- */}

        {loginType === "mobile" && (
          <>
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
          </>
        )}

        {loginType === "email" && (
          <>
            <label className="text-gray-700 font-medium">Email Address</label>
            <div className="flex items-center gap-3 mt-2 mb-6">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
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
          </>
        )}

        {/* OTP FIELD */}
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
              Verify & Login
            </button>
          </div>
        )}

        {/* ERROR MESSAGE */}
        {error && (
          <p className="text-red-500 text-center text-sm mt-4">{error}</p>
        )}
      </div>
    </div>
  );
}
