import axios from "axios";

const ApiKey = "68d793e18706c828ab0bf0ed575f4191";
const base_url = "https://api.openweathermap.org/data/2.5/weather";

export const getUrl = (city, unit) => {
  return axios.get(`${base_url}?q=${city}&units=${unit}&appid=${ApiKey}`);
};
