import express from "express";
import connectDB from "./src/db/connectDB.js";
// require("dotenv").config();

import dotenv from "dotenv";
import routes from "./src/Routes/routes.js";
import cors from "cors";
dotenv.config();
const PORT = process.env.PORT || 3000;
const DATA_URI = process.env.DATA_URI;

const app = express();
app.use(cors());
app.use(express.json());
app.use("/user", routes);
connectDB(DATA_URI);

app.listen(PORT, () => {
  console.log(`Your server is listing at http://localhost:${PORT}`);
});
