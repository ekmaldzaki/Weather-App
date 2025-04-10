import { WeatherData } from "@/types/weather";

type Props = {
  weather: WeatherData;
};

export default function WeatherCard({ weather }: Props) {
  return (
    <div className="mt-8 bg-white/10 border border-white/20 backdrop-blur-xl rounded-2xl p-6 text-white text-center shadow-lg">
      <h2 className="text-2xl font-bold">{weather.name}</h2>
      <p className="text-lg capitalize mt-1">
        {weather.weather[0].description}
      </p>

      <div className="flex flex-col items-center mt-4">
        <img
          src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}
          alt="weather icon"
          className="w-24 h-24"
        />
        <p className="text-4xl font-semibold mt-2">
          {Math.round(weather.main.temp)}°C
        </p>
      </div>
    </div>
  );
}
