const express = require("express");
const cookieParser = require("cookie-parser");
const userRoute = require("./routes/user");
const lawyerRoute = require("./routes/lawyer.routes")
const mongoose = require("mongoose");
const cors = require("cors");
const { restrictTo, checkforAuthenticationCookie } = require("./middlewear/auth");



const app = express();
const PORT = 7500;

//connection
mongoose
  .connect("mongodb+srv://vishxcodes:PnPeX$690@clusterone.dy97w.mongodb.net/LawEase", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));


//middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(checkforAuthenticationCookie("token"));
app.use(cookieParser());
app.use(cors());


app.get("/", (req, res) => {
    res.send("Welcome user");
});


//public routes
app.use("/user/signup", userRoute);
app.use("/user/signin", userRoute);
app.use("/lawyer/verify", lawyerRoute);
// app.use("/lawyer/signin", lawyerRoute);

//protected routes
app.use("/user",restrictTo(["USER"]), userRoute);
app.use("/lawyer",restrictTo(["LAWYER"]),lawyerRoute);



  app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
  });