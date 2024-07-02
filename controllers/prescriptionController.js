const Prescription = require("../models/prescription");

exports.createPrescription = async (req, res) => {
    try {
        const doctorid = req.user.id; 

      const { patientid,name, PhoneNumber, image,age} = req.body;
  
      const newPrescription = new Prescription({
        patientid,
        doctorid,
        name,
        PhoneNumber,
        image,
        age
      });
  
      await newPrescription.save();
      res.status(201).json(newPrescription);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };

  exports.getdoctorprescription = async (req, res) => {
    const userId = req.user.id; 


    try {
      const prescriptions = await Prescription.find({ doctorid: userId });
  
      if (!prescriptions) {
        return res.status(404).json({ error: 'Prescriptions not found' });
      }
  
      res.status(200).json(prescriptions);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };