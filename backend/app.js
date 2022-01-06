import express from "express";
// const routes = require('./routes')
import allRoutes from "./routes/all_routes.js"
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import winston from "winston";



const app = express()
dotenv.config();


app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());


// All routes
app.use("", allRoutes);

/**
 * Get port from environment and store in Express.
 */
let port = normalizePort(process.env.PORT || '5000');

function normalizePort(val) {
  let port = parseInt(val, 10);
  if (isNaN(port)) {
    // named pipe
    return val;
  }
  if (port >= 0) {
    // port number
    return port;
  }
  return false;
}

mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true,
  })
  .then(() =>
    app.listen(port, () =>
      winston.info(
        `Server Running in ${process.env.NODE_ENV} mode on Port: ${port}`
      )
    )
  )
  .catch((error) => console.log(`${error} did not connect`));
// mongoose.set("useFindAndModify", false);

