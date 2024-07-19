import express from "express";
import { graphqlHTTP } from "express-graphql";
import mongoose from "mongoose";
import schema from "./graphQl/schema.js";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

mongoose
  .connect(
    "mongodb+srv://shan:QOH6tu0IldMEERgt@cluster0.a8e3wje.mongodb.net/",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Connected to MongoDB database");
  })
  .catch((err) => {
    console.error("Connection Error", err);
  });

app.use(
  "/graph",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
