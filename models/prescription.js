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
    }
});

module.exports = mongoose.model('Prescription', PrescriptionSchema);
