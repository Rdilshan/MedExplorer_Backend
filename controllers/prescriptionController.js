const Prescription = require("../models/prescription");

exports.createPrescription = async (req, res) => {
    try {
      const { patientid, doctorid, name, PhoneNumber, image, date } = req.body;
  
      const newPrescription = new Prescription({
        patientid,
        doctorid,
        name,
        PhoneNumber,
        image,
        date
      });
  
      await newPrescription.save();
      res.status(201).json(newPrescription);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };


