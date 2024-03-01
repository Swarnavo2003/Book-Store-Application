import express from "express";
import mongoose from "mongoose";
import { PORT, mongoDBURL } from "./config.js";
import booksRoute from "./routes/books.routes.js";
import cors from "cors";

const app = express();

// Middleware for parsing body
// Option 1 : Allow all origins with default of cors(*)
app.use(express.json());
// Option 2 : All Custom Origins
// app.use(
//   cors({
//     origin: "http://localhost:3000",
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Type"],
//   })
// );

// Midleware for handling CORS Policy
app.use(cors());

app.get("/", (req, res) => {
  // console.log(req);
  return res.status(200).send("Welcoem to MERN Stack Tutorial");
});

app.use("/books", booksRoute);

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("App connected to database");
    app.listen(PORT, () => {
      console.log(`App is listening to port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
