import axios from "axios";

const API_URL = "http://localhost:5000/graph"; // Update with your backend URL

export const fetchCurrentWeather = async (city) => {
  const response = await axios.post(API_URL, {
    query: `
      query {
        weather(city: "${city}") {
          city
          temperature
          description
          icon
          date
          feels_like
          sunset
        }
      }
    `,
  });
  return response.data.data.weather;
};

export const fetchHistoricalWeather = async (city, fromDate, toDate) => {
  const response = await axios.post(API_URL, {
    query: `
      query {
        historicalWeather(city: "${city}", fromDate: "${fromDate}", toDate: "${toDate}") {
          city
          temperature
          description
          icon
          date
        }
      }
    `,
  });
  return response.data.data.historicalWeather;
};
