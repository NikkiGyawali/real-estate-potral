import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

export default function Navbar({ favCount }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser(decoded);
      } catch {
        console.log("Invalid token");
      }
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div
      className="sticky top-0 z-30 backdrop-blur-md bg-white/70 border-b border-white/40 shadow-sm px-10 py-5 flex justify-between items-center"
      style={{ fontFamily: "Poppins, sans-serif" }}
    >
      <h1
        className="text-xl font-semibold text-gray-800 cursor-pointer hover:text-slate-700 transition"
        onClick={() => (window.location.href = "/dashboard")}
      >
        🏠PropertyHub
      </h1>

      <div className="flex items-center gap-4">
        {user && (
          <span className="text-gray-900 text-sm hidden sm:block">
            Hi, <span className="font-medium">{user.name}</span>
          </span>
        )}

        <button
          className="relative text-gray-700 hover:text-pink-500 transition text-lg"
          onClick={() => (window.location.href = "/favourites")}
        >
          ❤️
          {favCount > 0 && (
            <span className="absolute -top-2 -right-3 bg-pink-500 text-white text-xs px-1.5 rounded-full">
              {favCount}
            </span>
          )}
        </button>

        <button
          className="bg-slate-800 text-white px-4 py-1.5 rounded-lg text-sm hover:bg-slate-600 transition"
          onClick={logout}
        >
          Logout
        </button>
      </div>
    </div>
  );
}