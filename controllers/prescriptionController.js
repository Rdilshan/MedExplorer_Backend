const Prescription = require("../models/prescription");

exports.createPrescription = async (req, res) => {
  try {
    const doctorid = req.user.id;

    const { patientid, name, PhoneNumber, image, age } = req.body;

    const newPrescription = new Prescription({
      patientid,
      doctorid,
      name,
      PhoneNumber,
      image,
      age,
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
      return res.status(404).json({ error: "Prescriptions not found" });
    }

    res.status(200).json(prescriptions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getpatientprescription = async (req, res) => {
  const userId = req.user.id;

  try {
    const prescriptions = await Prescription.find({ patientid: userId });

    if (!prescriptions) {
      return res.status(404).json({ error: "Prescriptions not found" });
    }

    res.status(200).json(prescriptions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getimageandprediction = async (req, res) => {
  try {
    const { image } = req.body;

    if (!image) {
      return res.status(404).json({ error: "Send the prescription" });
    }

    // Placeholder for integrating your machine learning model
    // Assuming your ML model takes an image and returns a prediction
    // You can replace this part with actual ML model integration
    const prediction = ['Gentamicin', 'Penicillin V','Amoxicillin','Clavulanic acid'];

    res.status(200).json({data:prediction});

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
