import { useState } from "react";
import API from "../utils/api";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const res = await API.post("/auth/login", form);
      localStorage.setItem("token", res.data.token);
      window.location.href = "/dashboard";
    } catch (err) {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="h-screen flex">

     
      <div className="hidden md:flex w-1/2 bg-orange-900 text-white flex-col justify-center items-center p-10">
        <h1 className="text-4xl font-bold mb-4">🏠PropertyHub</h1>
        <p className="text-lg text-center max-w-md">
          Find your dream home, manage your favourites, and explore properties
          like never before.
        </p>

        <img
          src="https://images.unsplash.com/photo-1560518883-ce09059eeffa"
          alt="real estate"
          className="mt-8 rounded-2xl shadow-lg"
        />
      </div>

      {/* RIGHT SIDE (FORM) */}
      <div className="flex w-full md:w-1/2 items-center justify-center bg-gray-50">
        <div className="bg-white p-10 rounded-2xl shadow-lg w-[400px]">

          <h2 className="text-3xl font-bold mb-2 text-gray-800 justify-center">
            Welcome!
          </h2>
          <p className="text-gray-500 mb-6">
            Login to your account
          </p>

          <input
            className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Email"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          <input
            type="password"
            className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Password"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />

          {error && (
            <p className="text-red-500 text-sm text-center mb-3">{error}</p>
          )}

          <button
            onClick={handleLogin}
            className="w-full py-3 rounded-lg  bg-orange-900 text-white font-semibold hover:bg-orange-600 transition"
          >
            Login
          </button>

          <p className="mt-4 text-center text-gray-500">
            Don’t have an account?{" "}
            <span
              className=" text-orange-900 cursor-pointer hover:underline"
              onClick={() => (window.location.href = "/register")}
            >
              Register
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}