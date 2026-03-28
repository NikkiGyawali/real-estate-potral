import { useState } from "react";
import API from "../utils/api";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleRegister = async () => {
    try {
      await API.post("/auth/register", form);
      alert("Registered successfully!");
      window.location.href = "/";
    } catch {
      alert("Error registering");
    }
  };

  return (
    <div className="h-screen flex">

      {/* LEFT SIDE */}
      <div className="hidden md:flex w-1/2 bg-slate-800 text-white flex-col justify-center items-center p-10">
        <h1 className="text-4xl font-bold mb-4">🏠PropertyHub</h1>
        <p className="text-lg text-center max-w-md">
          Join us and explore the best properties tailored just for you.
        </p>

        <img
          src="https://images.unsplash.com/photo-1572120360610-d971b9d7767c"
          alt="real estate"
          className="mt-8 rounded-2xl shadow-lg"
        />
      </div>

      {/* RIGHT SIDE */}
      <div className="flex w-full md:w-1/2 items-center justify-center bg-gray-50">
        <div className="bg-white p-10 rounded-2xl shadow-lg w-[400px]">

          <h2 className="text-3xl font-bold mb-2 text-gray-800">
            Create Account
          </h2>
          <p className="text-gray-500 mb-6">
            Register to get started
          </p>

          <input
            placeholder="Name"
            className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <input
            placeholder="Email"
            className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 border border-gray-300 rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />

          <button
            onClick={handleRegister}
            className="w-full py-3 rounded-lg bg-slate-800 text-white font-semibold hover:bg-slate-500 transition"
          >
            Register
          </button>

          <p className="mt-4 text-center text-gray-500">
            Already have an account?{" "}
            <span
              className="text-slate-800 cursor-pointer hover:underline"
              onClick={() => (window.location.href = "/")}
            >
              Login
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}