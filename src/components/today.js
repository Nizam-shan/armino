import { formatDate } from "../utils/date";

const Today = ({ weatherData }) => {
  if (!weatherData) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div>
        <div class="m-0 items-center flex flex-col md:flex-row md:justify-center text-black">
          <div class="w-72  md:mr-20 mb-10 transition duration-500 ease-in-out transform bg-[#FFA38F] rounded-xl hover:scale-105 cursor-pointer border flex flex-col justify-center items-center text-center p-6">
            <div class="text-md font-bold flex flex-col">
              <span class="uppercase">Today</span>{" "}
            </div>
            <div class="w-32 h-32 flex items-center justify-center">
              <img
                src={`https://openweathermap.org/img/wn/${weatherData?.icon}.png`}
                alt="icon"
              />
              <h1 class="text-4xl font-bold">{weatherData?.temperature}º</h1>
            </div>
            <p class="text-gray-700 mb-0 uppercase font-semibold">
              {weatherData?.description}
            </p>
            <p class="text-gray-700 mb-0 mt-2 ">{weatherData?.city}</p>
            <p class="text-gray-700 mb-0 mt-2 ">
              {formatDate(weatherData?.date)}
            </p>
            <p class="text-gray-700 mt-2 mb-5">{`feels like  ${weatherData?.feels_like}    sunset  ${weatherData?.sunset}`}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Today;
