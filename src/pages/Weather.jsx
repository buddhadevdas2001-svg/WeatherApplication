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
import "../App.css";

function Weather() {
  const [city, setCity] = useState("");
  const { weather, unit, error, fetchWeather, toggleUnit, resetWeather } =
    useWeather();

  useEffect(() => {
    if (!city) {
      resetWeather();
    }
  }, [city, resetWeather]);

  function getWeatherIcon() {
    if (!weather) return null;
    const condition = weather.weather[0].main;

    switch (condition) {
      case "Clear":
        return <WiDaySunny size={40} color="#e0c558" />;
      case "Clouds":
        return <WiCloud size={40} color="#6a798b" />;
      case "Rain":
        return <WiRain size={40} color="#418ee7" />;
      case "Snow":
        return <WiSnow size={40} color="#aaf7f7" />;
      case "Thunderstorm":
        return <WiThunderstorm size={40} color="#1b1323" />;
      default:
        return <WiDayCloudy size={40} color="#807e75" />;
    }
  }

  const clearCity = () => {
    setCity("");
    resetWeather();
  };

  return (
    <div className="weather-container">
      <h1>Weather Now{getWeatherIcon()}</h1>

      <div className="input-wrapper">
        <input
          placeholder="Enter City Name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        {city && <AiOutlineClose className="clear-icon" onClick={clearCity} />}
      </div>

      <div className="buttons">
        <button onClick={() => fetchWeather(city)} disabled={!city.trim()}>
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
