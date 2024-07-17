const mongoose = require('mongoose');

const PrescriptionSchema = new mongoose.Schema({
    patientid: {
        type: String,
        required: true
    },
    doctorid: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    PhoneNumber: {
        type: String,
        required: true
    },
    image: {
        type: String, 
        required: true
    },
    date: {
        type: Date, 
        required: true,
        default: Date.now 
    },
    prediction: {
        type: [String], 
        // required: true
    }
});

module.exports = mongoose.model('Prescription', PrescriptionSchema);
