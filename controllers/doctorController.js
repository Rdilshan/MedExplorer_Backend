const Doctor = require('../models/doctor');
const jwt = require('jsonwebtoken');

const secret = 'your_jwt_secret'; 


exports.createDoctor = async (req, res) => {
    try {
        const { name, email, password,NIC,SIMC } = req.body;
        const newDoctor = new Doctor({ name, email, password,NIC,SIMC });
        await newDoctor.save();
        res.status(201).json(newDoctor);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};


exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const doctor = await Doctor.findOne({ email });
        if (!doctor) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }
        const isMatch = await doctor.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        if (doctor.checkingSIMC !== 1) {
            return res.status(403).json({ error: 'Account is not verified. Please contact support.' });
        }
        
        const token = jwt.sign({ id: doctor._id }, secret, { expiresIn: '1h' });
        

        res.cookie('token', token, {
            httpOnly: true, 
            secure: process.env.NODE_ENV === 'production', 
            maxAge: 3600000 // 1 hour
        });
        
        res.status(200).json({ message: 'Login successful',token: token});
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};