const express = require("express");
const cors = require("cors");
const router = require("./router/routers");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const PORT = process.env.PORT || 5000;
// const CLIENT_URL = 'https://hopeful-pasteur-d710ff.netlify.app/'
const MONGODB_KEY = process.env.MONGODB_KEY;
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: '*',
    allowedHeaders: ["Access-Control-Allow-Origin", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"],
    
    methods: ["GET", "POST"],
    credentials: true,
  })
);
app.use("/api", cors());
app.options("/api", cors);
app.use("/api", cookieParser());
app.use("/api", router);
app.use("/auth", router);

const start = async () => {
  try {
    await mongoose.connect(MONGODB_KEY);
    app.listen(PORT, console.log(`Server started on port ${PORT}`));
  } catch (error) {
    console.log(error.message);
  }
};

start();
