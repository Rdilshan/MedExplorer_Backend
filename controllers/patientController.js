const Patient = require("../models/patient");


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