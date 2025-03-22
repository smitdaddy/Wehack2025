const express = require("express");
const User = require("../models/user");

const router = express.Router();

router.get("/signin",(req,res)=>{
    res.send("signin");
});

router.get("/signup",(req,res)=>{
    res.send("signup");
});


router.get("/logout",(req,res)=>{
    res.clearCookie("token").redirect("/user/signin")
});