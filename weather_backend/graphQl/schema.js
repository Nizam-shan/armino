import axios from "axios";
import dotenv from "dotenv";
import {
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from "graphql";
import weatherSchema from "../schema/weatherSchema.js";

dotenv.config();

var cityCoordinates = {
  Delhi: { lat: 28.6139, lon: 77.209 },
  Moscow: { lat: 55.7558, lon: 37.6173 },
  Paris: { lat: 48.8566, lon: 2.3522 },
  // NewYork: { lat: 40.7128, lon: -74.0060 },
  Sydney: { lat: -33.8688, lon: 151.2093 },
  Riyadh: { lat: 24.7136, lon: 46.6753 },
};

const weatherType = new GraphQLObjectType({
  name: "weather",
  fields: () => ({
    city: { type: GraphQLString },
    temperature: { type: GraphQLString },
    description: { type: GraphQLString },
    icon: { type: GraphQLString },
    date: { type: GraphQLString },
    feels_like: { type: GraphQLString },
    sunset: { type: GraphQLString },
  }),
});

let apiKey = process.env.REACT_MAP_API_KEY;
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    weather: {
      // type define above
      type: weatherType,

      // always value should be there
      args: { city: { type: new GraphQLNonNull(GraphQLString) } },
      async resolve(parent, args) {
        const { city } = args;

        const response = await axios.get(
          `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
        );

        const data = response.data;
        console.log("🚀 ~ resolve ~ data:", data);

        const weatherData = new weatherSchema({
          city: data.name,
          temperature: (data.main.temp - 273.15).toFixed(2),
          icon: data.weather[0].icon,
          date: new Date(),
          description: data?.weather[0].description,
          feels_like: (data?.main.feels_like - 273.15).toFixed(2),
          sunset: data?.sys?.sunsets,
        });
        await weatherData.save();
        return weatherData;
      },
    },

    historicalWeather: {
      type: new GraphQLList(weatherType),
      args: {
        city: { type: GraphQLString },
        fromDate: { type: GraphQLString },
        toDate: { type: GraphQLString },
      },
      async resolve(parent, args) {
        const { city, fromDate, toDate } = args;

        if (city && !cityCoordinates[city]) {
          throw new Error(
            "Invalid city. Allowed cities are: Delhi, Moscow, Paris, Sydney, Riyadh."
          );
        }

        if (fromDate && toDate) {
          const from = new Date(fromDate);
          const to = new Date(toDate);
          const diffDays = Math.ceil((to - from) / (1000 * 60 * 60 * 24));
          if (diffDays > 30) {
            throw new Error("Date range cannot be more than 30 days.");
          }
        }

        const { lat, lon } = cityCoordinates[city];
        const historicalData = [];
        let currentDate = new Date(fromDate);
        console.log("🚀 ~ resolve ~ currentDate:", currentDate);
        console.log("API Key:", process.env.REACT_MAP_API_KEY);
        while (currentDate <= new Date(toDate)) {
          const timestamp = Math.floor(currentDate.getTime() / 1000);
          console.log("🚀 ~ resolve ~ timestamp:", timestamp);
          try {
            const response = await axios.get(
              `http://api.openweathermap.org/data/2.5/onecall/timemachine?lat=${lat}&lon=${lon}&dt=${timestamp}&appid=${apiKey}`
            );
            console.log(
              `URL: http://api.openweathermap.org/data/2.5/onecall/timemachine?lat=${lat}&lon=${lon}&appid=106801ede41385545601026d1af2fd3b`
            );
            historicalData.push({
              city,
              temperature: (response.data.current.temp - 273.15).toFixed(2),
              description: response.data.current.weather[0].description,
              icon: response.data.current.weather[0].icon,
              date: currentDate.toISOString(),
            });
          } catch (error) {
            console.error(
              `Error fetching data for ${currentDate.toISOString()}:`,
              error.response ? error.response.data : error.message
            );
          }
          currentDate.setDate(currentDate.getDate() + 1);
        }
        return historicalData;
        // const query = {};

        // if (city) {
        //   query.city = city;
        // }

        // if (fromDate) {
        //   query.date = query.date || {};
        //   query.date.$gte = new Date(fromDate);
        // }

        // if (toDate) {
        //   query.date = query.date || {};
        //   query.date.$lte = new Date(toDate);
        // }

        // return weatherSchema.find(query);
      },
    },
  },
});

const schema = new GraphQLSchema({
  query: RootQuery,
});

export default schema;
