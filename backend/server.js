const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const routesUrls = require('./routes/routes')
const cors = require('cors')

// To avoid typing username and password explicitly when connecting
dotenv.config()

mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.n1ftt.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`, () => console.log("Database connected"))

// Body parser to parse incoming and outgoing requests
app.use(express.json())
// Activate cors
app.use(cors())
// Base path: /app
// Whatever is in the routesUrls will be appended to the base path
app.use('/app', routesUrls)
// Literally the server
app.listen(4000, () => console.log("server is up and running"))