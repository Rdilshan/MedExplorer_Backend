const mongoose = require('mongoose');

const DocotorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    NIC:{
        type: String,
        required: true
    },
    SIMC:{
        type: String,
        required: true
    },
    ProfileIMG:{
        type: String
    },
    PhoneNumber:{
        type:String
    },
    Gender:{
        type:String
    }
});

module.exports = mongoose.model('Doctor', DocotorSchema);
