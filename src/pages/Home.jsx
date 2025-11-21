import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white text-gray-900">

      {/* NAVBAR */}
      <nav className="w-full shadow-md py-4 px-8 flex items-center justify-between bg-white fixed top-0 left-0 z-50 border-b border-[#d4af37]/20">

        {/* Logo */}
        <h1 className="text-3xl font-bold tracking-wide">
          STANDARD<span className="text-[#d4af37]">ZZZ</span>
        </h1>

        {/* Search Bar */}
        <div className="flex items-center w-1/3">
          <input
            type="text"
            placeholder="Search..."
            className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:border-[#d4af37] focus:ring-2 focus:ring-[#d4af37]/40 outline-none transition"
          />
        </div>

        {/* User Section */}
        <div className="flex items-center gap-6">
          <p className="font-medium text-gray-700">Hello, User</p>

          <button
            onClick={() => navigate("/login")}
            className="px-5 py-2 bg-[#d4af37] text-white rounded-xl hover:bg-[#c19d2f] transition shadow-md"
          >
            Logout
          </button>
        </div>
      </nav>

      {/* MAIN CONTENT */}
      <div className="pt-32 px-10">

        {/* BIG BANNER */}
        <div className="w-full bg-gradient-to-r from-[#d4af37] to-[#f7e9b0] rounded-3xl h-48 flex items-center justify-center shadow-xl mb-10">
          <h2 className="text-4xl font-bold text-white drop-shadow">
            MAKE Your OWN Outfit
          </h2>
        </div>

       
      </div>
    </div>
  );
}
