const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

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


// Pre-save hook to hash the password before saving
DoctorSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (err) {
        next(err);
    }
});

// Method to compare password
DoctorSchema.methods.comparePassword = function(candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};



module.exports = mongoose.model('Doctor', DocotorSchema);
