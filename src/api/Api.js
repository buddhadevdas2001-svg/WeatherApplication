import axios from "axios";

const API_KEY = "68d793e18706c828ab0bf0ed575f4191";

export const getUrl = (city, unit) => {
  return axios.get("https://api.openweathermap.org/data/2.5/weather", {
    params: {
      q: city,
      units: unit,
      appid: API_KEY,
    },
  });
};

export const getCitySuggestions = (query) => {
  return axios.get("https://api.openweathermap.org/geo/1.0/direct", {
    params: {
      q: query,
      limit: 5,
      appid: API_KEY,
    },
  });
};
