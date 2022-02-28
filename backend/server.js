const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const routesUrls = require("./routes/routes");
const cors = require("cors");

// To avoid typing username and password explicitly when connecting
dotenv.config();
// mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.${process.env.DB_IDENTIFIER}.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`)
//     .then(() => console.log("Database connected"))
//     .catch(() => console.log("Connection failed"));
mongoose
  .connect(process.env.DATABASE_ACCESS)
  .then(() => console.log("Database connected. (MPS Beta SP2022)"))
  .then(app.listen(4000, () => console.log("server is up and running")))
  .catch(() => console.log("Connection failed"));

// Body parser to parse incoming and outgoing requests
app.use(express.json());
// Activate cors
app.use(cors());
// Base path: /app
// Whatever is in the routesUrls will be appended to the base path
app.use("/app", routesUrls);
// Literally the server
