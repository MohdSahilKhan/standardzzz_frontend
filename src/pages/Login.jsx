import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const BASE_URL = "https://rails-api-3rfk.onrender.com";

  const pageBg = "#E1D0B3";
  const cardBg = "#703B3B";
  const textLight = "#FFF4E0";
  const textDark = "#3B1F1F";
  const accent = "#E1D0B3";

  const [loginType, setLoginType] = useState("mobile");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [timer, setTimer] = useState(0);
  const [resendEnabled, setResendEnabled] = useState(false);

  const startTimer = () => {
    setTimer(120);
    setResendEnabled(false);

    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setResendEnabled(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // SEND OTP
  const handleSendOtp = async () => {
    setError("");
    setLoading(true);

    let url = "";
    let body = {};

    if (loginType === "mobile") {
      if (mobile.length !== 10) {
        setError("Enter valid 10-digit mobile number");
        setLoading(false);
        return;
      }

      url = `${BASE_URL}/api/login_with_mobile`;
      body = { mobile_number: Number(mobile) };
    } else {
      if (!email.includes("@")) {
        setError("Enter valid email");
        setLoading(false);
        return;
      }

      url = `${BASE_URL}/api/verify_email`;
      body = { email };
    }

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      setLoading(false);

      if (res.ok) {
        setShowOtp(true);
        startTimer();
      } else {
        setError(data.message || "Something went wrong.");
      }
    } catch {
      setLoading(false);
      setError("Network error");
    }
  };

  // VERIFY OTP
  const handleVerifyOtp = async () => {
    if (otp.length < 4) return setError("Enter valid OTP");

    const url =
      loginType === "mobile"
        ? `${BASE_URL}/api/verify_mobile`
        : `${BASE_URL}/api/verify_email`;

    const body =
      loginType === "mobile"
        ? { mobile_number: Number(mobile), otp }
        : { email, otp };

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (res.ok) {
        // IMPORTANT ---- SAVE TOKEN + USERNAME ----
        localStorage.setItem("auth", "true");
        localStorage.setItem("authToken", data.token);   // ⭐ VERY IMPORTANT
        localStorage.setItem("username", data.user.full_name);

        navigate("/home");
      } else {
        setError(data.message || "Invalid OTP");
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
      <div
        className="w-full max-w-xl p-12 rounded-3xl shadow-2xl relative"
        style={{
          backgroundColor: cardBg,
          border: `2px solid ${textDark}`,
        }}
      >
        <h1
          className="text-4xl font-bold text-center mb-3 tracking-wide"
          style={{ color: textLight }}
        >
          STANDARD<span style={{ color: accent }}>ZZZ</span>
        </h1>

        <p
          className="text-center mb-10"
          style={{ color: "#EEDCC3" }}
        >
          Login to continue
        </p>

        {/* SWITCH BUTTONS */}
        <div className="flex justify-center gap-6 mb-8">
          {["mobile", "email"].map((type) => (
            <button
              key={type}
              onClick={() => {
                setLoginType(type);
                setShowOtp(false);
              }}
              className="pb-1 text-lg font-medium border-b-2"
              style={{
                borderColor: loginType === type ? accent : "transparent",
                color: loginType === type ? accent : textLight,
              }}
            >
              {type === "mobile" ? "Mobile Login" : "Email Login"}
            </button>
          ))}
        </div>

        {/* MOBILE LOGIN */}
        {loginType === "mobile" && (
          <>
            <label style={{ color: textLight }}>Mobile Number</label>
            <div className="flex items-center gap-3 mt-2 mb-6">
              <input
                type="number"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                placeholder="10-digit mobile number"
                className="w-full px-4 py-3 rounded-xl border outline-none"
                style={{
                  borderColor: accent,
                  backgroundColor: pageBg,
                  color: textDark,
                }}
              />
              <button
                onClick={handleSendOtp}
                disabled={loading}
                style={{ color: accent }}
              >
                {loading ? "Sending..." : "Send OTP"}
              </button>
            </div>
          </>
        )}

        {/* EMAIL LOGIN */}
        {loginType === "email" && (
          <>
            <label style={{ color: textLight }}>Email Address</label>
            <div className="flex items-center gap-3 mt-2 mb-6">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                className="w-full px-4 py-3 rounded-xl border outline-none"
                style={{
                  borderColor: accent,
                  backgroundColor: pageBg,
                  color: textDark,
                }}
              />
              <button
                onClick={handleSendOtp}
                disabled={loading}
                style={{ color: accent }}
              >
                {loading ? "Sending..." : "Send OTP"}
              </button>
            </div>
          </>
        )}

        {/* OTP */}
        {showOtp && (
          <div>
            <label style={{ color: textLight }}>Enter OTP</label>
            <input
              type="number"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="6-digit OTP"
              className="w-full mt-2 mb-3 px-4 py-3 rounded-xl border outline-none"
              style={{
                borderColor: accent,
                backgroundColor: pageBg,
                color: textDark,
              }}
            />

            {!resendEnabled ? (
              <p className="text-sm mb-4" style={{ color: accent }}>
                Resend OTP in <b>{timer}s</b>
              </p>
            ) : (
              <button
                onClick={handleResendOtp}
                className="text-sm mb-4"
                style={{ color: accent }}
              >
                Resend OTP
              </button>
            )}

            <button
              onClick={handleVerifyOtp}
              className="w-full py-3 rounded-xl shadow-md font-semibold"
              style={{
                backgroundColor: accent,
                color: textDark,
              }}
            >
              Verify & Login
            </button>
          </div>
        )}

        {error && (
          <p className="text-center text-sm mt-4" style={{ color: "#ffb3b3" }}>
            {error}
          </p>
        )}

        <p
          onClick={() => navigate("/signup")}
          className="absolute bottom-4 left-6 text-sm cursor-pointer"
          style={{ color: accent }}
        >
          New user? Create account
        </p>
      </div>
    </div>
  );
}
