const Doctor = require('../models/doctor');
const jwt = require('jsonwebtoken');
const bucket = require("../config/firebase");

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


exports.doctordetails = async (req, res) => {
    res.json({ user: req.user });
}

exports.profileEdit = async (req, res) => {
    const { img } = req.body;

    try {
        if (!img) {
            return res.status(400).send('Image is required.');
        }

        const buffer = Buffer.from(img, 'base64'); // Assuming the image is sent as a base64 encoded string
        const fileName = `profile_images/${uuidv4()}.jpg`;
        const file = bucket.file(fileName);

        const stream = file.createWriteStream({
            metadata: {
                contentType: 'image/jpeg',
                metadata: {
                    firebaseStorageDownloadTokens: uuidv4(),
                },
            },
        });

        stream.on('error', (err) => {
            console.error('Error uploading image to Firebase:', err);
            res.status(500).send('Failed to upload image.');
        });

        stream.on('finish', async () => {
            const [url] = await file.getSignedUrl({
                action: 'read',
                expires: '03-09-2491',
            });

            // Now you have the URL of the uploaded image
            console.log('Image URL:', url);

            // Save the profile information to your database
            // This is a placeholder. Replace it with your actual database update logic.
            // Example:
            // await updateUserProfile(req.user.id, { img: url, telephone, gender });

            res.status(200).send({ message: 'Profile updated successfully', imageUrl: url });
        });

        stream.end(buffer);
    } catch (error) {
        console.error('Error in profileEdit:', error);
        res.status(500).send('An error occurred while updating the profile.');
    }
};
