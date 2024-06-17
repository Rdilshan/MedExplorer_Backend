const jwt = require('jsonwebtoken');
const Doctor = require('../models/doctor');

const secret = 'your_jwt_secret'; 

exports.authMiddleware = async (req, res, next) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({ error: 'Access denied. No token provided.' });
        }

        const decoded = jwt.verify(token, secret);
        req.doctor = await Doctor.findById(decoded.id);

        if (!req.doctor) {
            return res.status(401).json({ error: 'Access denied. Invalid token.' });
        }

        next();
    } catch (err) {
        res.status(400).json({ error: 'Invalid token.' });
    }
};
