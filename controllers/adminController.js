const Admin = require('../models/admin');
const Doctor = require('../models/doctor');
const Patient = require('../models/patient');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');




//login
exports.adminLogin = async (req, res) => {
  try {
    const { username, password } = req.body;

    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res.status(400).json({ error: 'Invalid username or password' });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid username or password' });
    }

    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 3600000, // 1 hour
    });

    res.status(200).json({ message: 'Login successful', token, admin });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

//admin register
exports.adminRegister = async (req,res) => {
  try {
    const { username, password} = req.body;
    const newAdmin = new Admin({ username, password});
    await newAdmin.save();
    res.status(201).json(newAdmin);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

//count
exports.count = async (req,res) => {
  try {
    const patientCount = await Patient.countDocuments();
    const doctorCount = await Doctor.countDocuments();
    res.json({ doctorCount, patientCount });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
}

//doctor edit
exports.doctorEdit = async (req,res) => {
  const{doctorname,  } = req.body;
}