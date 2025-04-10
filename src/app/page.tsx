"use client";

import { useState } from "react";
import WeatherCard from "@/components/WeatherCard";
import { WeatherData } from "@/types/weather";

export default function Home() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchWeather = async () => {
    if (!city) return;
    setLoading(true);
    setError(null);
    setWeather(null);

    try {
      const res = await fetch(`/api/weather?city=${city}`);
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error);
      }

      setWeather(data);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    }

    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-gradient-to-tr from-sky-500 via-blue-600 to-indigo-700 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-md p-8 rounded-3xl shadow-2xl border border-white/20">
        <h1 className="text-3xl font-bold text-white text-center mb-6">
          🌤️ Weather App
        </h1>

        <div className="flex flex-col sm:flex-row items-center gap-3">
          <input
            type="text"
            placeholder="Search location..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="flex-1 w-full px-4 py-2 rounded-xl border border-white/30 bg-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 transition"
          />
          <button
            onClick={fetchWeather}
            className="px-4 py-2 bg-white text-blue-700 font-semibold rounded-xl hover:bg-gray-100 transition disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? "Loading..." : "Search"}
          </button>
        </div>

        {error && (
          <p className="text-red-200 mt-4 text-center text-sm bg-red-500/10 border border-red-500/20 rounded-xl p-2">
            ⚠️ {error}
          </p>
        )}

        {weather && <WeatherCard weather={weather} />}
      </div>
    </main>
  );
}
