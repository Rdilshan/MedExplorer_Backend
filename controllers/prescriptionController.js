const Prescription = require("../models/prescription");
const axios = require('axios');

exports.createPrescription = async (req, res) => {
  try {
    const doctorid = req.user.id;

    const { patientid, name, PhoneNumber, image, age,prediction } = req.body;

    const newPrescription = new Prescription({
      patientid,
      doctorid,
      name,
      PhoneNumber,
      image,
      age,
      prediction
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

    console.log('image'.image);
    const formData = new FormData();
    formData.append('file', image);

    const response = await axios.post('https://randika123-prescription-predict.hf.space/predict', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    console.log(response.data);

    const predictions = response.data.predictions;

    res.status(200).json({ data: predictions });

  } catch (error) {
    console.log('error'.error)
    res.status(500).json({ error: error.message });
  }
};


exports.getPrescriptionById = async (req, res) => {
  try {
    const id = req.params.id;
    const PrescriptionData = await Prescription.findOne({ _id: id });
    if (!PrescriptionData) {
      return res.status(404).json({ error: "Prescription not found" });
    }
    res.status(200).json(PrescriptionData);
    
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
