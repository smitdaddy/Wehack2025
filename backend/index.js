const express = require("express");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");



const app = express();
const PORT = process.env.PORT;

//connection
mongoose
  .connect(process.env.MONGO_URL)
  .then((e) => console.log("mongoDb connected"));

//middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());



  app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
  });