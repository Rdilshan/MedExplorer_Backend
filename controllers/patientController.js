const Patient = require("../models/patient");
const Prescription = require("../models/prescription");
const Doctor = require("../models/doctor");


const jwt = require("jsonwebtoken");

const secret = "your_jwt_secret";

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

exports.patientdetails = async (req, res) => {
    try {
      const userid = req.user.id;
      const patient = await Patient.findOne({ _id: userid }); 
  
      if (!patient) {
        return res.status(404).json({ message: 'patient not found' });
      }
  
      res.status(200).json({ patient });
    } catch (error) {
      console.error('Error fetching patient details:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  
  exports.profileEdit = async (req ,res) =>{
    try {
      const {img ,telephone ,gender} = req.body;
      const userid = req.user.id;
  
      const patient = await Patient.findById(userid);
  
      if (!patient) {
        return res.status(404).json({ error: 'patient not found' });
      }
  
     
      if (img) patient.ProfileIMG = img;
      if (telephone) patient.PhoneNumber = telephone;
      if (gender) patient.Gender = gender;
  
      await patient.save();
  
      res.status(200).json({ message: 'Profile updated successfully', patient });
  
  
    } catch (error) {
      res.status(400).json({ error: err.message });
    }
  }

  exports.updatepwd = async (req, res) => {
    try {
      const { patientid,newpassword } = req.body;
  
      const patient = await Patient.findById(patientid);
      if (!patient) {
        return res.status(404).json({ error: 'patient not found' });
      } 
      patient.password = newpassword;
      await patient.save();
      res.status(200).json({ message: 'Password updated successfully' });
    } catch (error) {
      console.error('Error updating password:', error);
      res.status(500).json({ error: 'Server error' });
    }
  }

  exports.yourdocotorlist = async (req, res) => {
    try {
      const userid = req.user.id;
      const prescriptions = await Prescription.find({ patientid: userid }).select('doctorid');

      if (!prescriptions) {
        return res.status(404).json({ error: 'Doctor not found' });
      }

      const doctorIds = prescriptions.map(prescription => prescription.doctorid);

      const doctors = await Doctor.find({ _id: { $in: doctorIds } });
  
      res.status(200).json({ doctors });
    } catch (error) {
      console.error('Error fetching patient details:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }