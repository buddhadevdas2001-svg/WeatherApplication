import { useState, useCallback } from "react";
import { getUrl } from "../api/Api";

function useWeather() {
  const [weather, setWeather] = useState(null);
  const [unit, setUnit] = useState("metric");
  const [error, setError] = useState("");

  const fetchWeather = useCallback(
    async (city) => {
      if (!city || !city.trim()) {
        setError("Please enter a city name");
        return;
      }

      try {
        setError("");
        const res = await getUrl(city.trim(), unit);
        setWeather(res.data);
      } catch {
        setWeather(null);
        setError("City not found");
      }
    },
    [unit]
  );

  const toggleUnit = useCallback(
    async (city) => {
      if (!weather || !city) return;

      const newUnit = unit === "metric" ? "imperial" : "metric";
      setUnit(newUnit);

      try {
        const res = await getUrl(city.trim(), newUnit);
        setWeather(res.data);
      } catch {
        setError("Unable to update temperature unit");
      }
    },
    [unit, weather]
  );

  const resetWeather = useCallback(() => {
    setWeather(null);
    setError("");
    setUnit("metric");
  }, []);

  return { weather, unit, error, fetchWeather, toggleUnit, resetWeather };
}

export default useWeather;
