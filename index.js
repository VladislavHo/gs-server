const express = require("express")
const cors = require("cors");
const router = require("./router/routers");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser")

const PORT = process.env.PORT || 5000;
const CLIENT_URL = 'http://localhost:8080'
const MONGODB_KEY = process.env.MONGODB_KEY
const app = express()


app.use(express.json())
app.use(cors({ origin: [CLIENT_URL, "*"], credentials: true }));
app.use('/api', router)
app.use('/auth', router)
app.use('/api', cors())
app.use('/api', cookieParser())



const start = async() =>{
  try {
    await mongoose.connect(MONGODB_KEY)
    await app.listen(PORT, console.log(`Server started on port ${PORT}`))
  } catch (error) {
    console.log(error.message)
  }
}

start()