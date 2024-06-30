const Patient = require("../models/patient");
const jwt = require("jsonwebtoken");


exports.createPatient = async (req, res) => {
    try {
      const { name, email, password, NIC } = req.body;
      const newPatient = new Patient({ name, email, password, NIC });
      await newPatient.save();
      res.status(201).json(newPatient);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };
  

exports.getoneusingnic = async (req, res) => {
    try {
      const nic = req.params.nic;
      const patient = await Patient.findOne({ NIC: nic });
      if (!patient) {
        return res.status(404).json({ error: "Patient not found" });
      }
      res.status(200).json(patient);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };


exports.login = async (req, res) => {
    try {
      const { email, password } = req.body;
      const patient = await Patient.findOne({ email });
      if (!patient) {
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
  
      res.status(200).json({ message: "Login successful", token: token,patient:patient });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };