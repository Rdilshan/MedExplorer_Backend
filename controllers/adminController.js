const express = require('express');
const Admin = require('../models/admin');
const jwt = require("jsonwebtoken");

//admin login
exports.adminLogin = async (req,res)=>{

    try{
        const {name, password} = req.body;
    const admin = await Admin.findOne(name)
    if(!admin){
        return res.status(400).json({ error: "Invalid email or password" });
    }
    const isMatch = await patient.comparePassword(password);
      if (!isMatch) {
        return res.status(400).json({ error: "Invalid email or password" });
      }
    const token = jwt.sign({ id: patient._id }, secret, { expiresIn: "1h" });
  
      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 3600000, // 1 hour
      });
  
      res.status(200).json({ message: "Login successful", token: token,admin:admin });

    }catch(err){
        res.status(400).json({eror: err.message});
    }
}

//