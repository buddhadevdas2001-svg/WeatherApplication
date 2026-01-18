import { useState, useEffect } from "react";
import {
  WiDaySunny,
  WiCloud,
  WiRain,
  WiSnow,
  WiThunderstorm,
  WiDayCloudy,
} from "react-icons/wi";
import { AiOutlineClose } from "react-icons/ai";
import useWeather from "./UseWeather";
import { getCitySuggestions } from "../api/Api";
import "../App.css";

function Weather() {
  const [city, setCity] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [ignoreSuggestions, setIgnoreSuggestions] = useState(false);

  const { weather, unit, error, fetchWeather, toggleUnit, resetWeather } =
    useWeather();

  useEffect(() => {
    if (!city.trim()) {
      const timer = setTimeout(() => {
        setSuggestions([]);
        setShowSuggestions(false);
      }, 0);
      return () => clearTimeout(timer);
    }

    if (ignoreSuggestions) return;

    const timer = setTimeout(async () => {
      try {
        const res = await getCitySuggestions(city + ",IN");
        setSuggestions(res.data);
        setShowSuggestions(true);
      } catch {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [city, ignoreSuggestions]);

  const clearCity = () => {
    setCity("");
    setSuggestions([]);
    setShowSuggestions(false);
    setIgnoreSuggestions(false);
    resetWeather();
  };

  const handleSearch = () => {
    if (!city.trim()) return;
    setSuggestions([]);
    setShowSuggestions(false);
    setIgnoreSuggestions(true);
    fetchWeather(city);
  };

  const getWeatherIcon = () => {
    if (!weather) return null;
    const condition = weather.weather[0].main;
    switch (condition) {
      case "Clear":
        return <WiDaySunny size={50} color="#FFD700" />;
      case "Clouds":
        return <WiCloud size={50} color="#607D8B" />;
      case "Rain":
        return <WiRain size={50} color="#2196F3" />;
      case "Snow":
        return <WiSnow size={50} color="#E0F7FA" />;
      case "Thunderstorm":
        return <WiThunderstorm size={50} color="#8E44AD" />;
      default:
        return <WiDayCloudy size={50} color="#FF8C00" />;
    }
  };

  return (
    <div className="weather-container">
      <h1 className="title">Weather Now {getWeatherIcon()}</h1>

      <div className="input-wrapper">
        <input
          placeholder="Enter City Name"
          value={city}
          onChange={(e) => {
            setCity(e.target.value);
            setIgnoreSuggestions(false);
          }}
        />

        {city && <AiOutlineClose className="clear-icon" onClick={clearCity} />}
        {showSuggestions && suggestions.length > 0 && (
          <ul className="suggestions">
            {suggestions.map((item, index) => (
              <li
                key={`${item.lat}-${item.lon}-${index}`}
                onClick={() => {
                  setCity(item.name);
                  setSuggestions([]);
                  setShowSuggestions(false);
                  setIgnoreSuggestions(true);
                  fetchWeather(item.name);
                }}
              >
                <strong>{item.name}</strong>
                {item.state && `, ${item.state}`} ({item.country})
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="buttons">
        <button onClick={handleSearch} disabled={!city.trim()}>
          Search City
        </button>

        <button
          className="toggle"
          onClick={() => toggleUnit(city)}
          disabled={!weather}
        >
          Switch to °{unit === "metric" ? "F" : "C"}
        </button>
      </div>

      {error && <p className="error">{error}</p>}

      {weather && (
        <div className="weather-info">
          <h2>
            {weather.name} {getWeatherIcon()}
          </h2>
          <p className="temp">
            {Math.round(weather.main.temp)}°{unit === "metric" ? "C" : "F"}
          </p>
          <p>Condition: {weather.weather[0].main}</p>
          <p>Humidity: {weather.main.humidity}%</p>
        </div>
      )}
    </div>
  );
}

export default Weather;
