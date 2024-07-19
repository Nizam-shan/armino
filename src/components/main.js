import { useEffect, useState } from "react";
import Today from "./today";
import { fetchCurrentWeather, fetchHistoricalWeather } from "../api/service";
import Hourly from "./hourly";

function Main() {
  const [city, setCity] = useState("kerala");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [historicalData, setHistoricalData] = useState([]);
  const [weatherData, setWeatherData] = useState();
  console.log("🚀 ~ Main ~ weatherData:", weatherData);

  useEffect(() => {
    const getCurrentWeather = async () => {
      const currentWeather = await fetchCurrentWeather(city)
        .then((res) => {
          console.log("🚀 ~ .then ~ res:", res);
          setWeatherData(res);
        })
        .catch((err) => {
          console.log("errr", err);
        });
    };
    getCurrentWeather();
  }, [city]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (fromDate && toDate) {
      const historicalData = await fetchHistoricalWeather(
        city,
        fromDate,
        toDate
      );
      setHistoricalData(historicalData);
    } else {
      const currentWeather = await fetchCurrentWeather(city);
      setWeatherData(currentWeather);
    }
  };
  return (
    <>
      <div
        style={{
          backgroundImage:
            'url("https://png.pngtree.com/thumb_back/fh260/back_pic/00/05/33/86562656f65b38e.png")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "100vh",
          padding: "20px",
        }}
        className="flex flex-col sm:flex-row justify-center items-center"
      >
        <Today weatherData={weatherData} />
        <Hourly />
      </div>
    </>
  );
}

export default Main;
