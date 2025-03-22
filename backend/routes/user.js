const express = require("express");
const User = require("../models/user.models");

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

router.post("/signin",async (req,res)=>{
    const {email,password} = req.body;
  try {
    const token = await User.matchPasswordAndGenerateToken(email,password);
    return res.cookie("token",token).redirect("/");
  } catch (error) {
    res.render("signin",{error:error.message});
  }
  });


router.post("/signup",async (req,res)=>{
    const {fullName,email,phoneNumber,password} = req.body;   
    await User.create({
        fullName,
        email,
        phoneNumber,
        password,
    });
   return res.redirect("/user/signin");
});