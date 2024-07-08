const Doctor = require("../models/doctor");
const jwt = require("jsonwebtoken");
const bucket = require("../config/firebase");
const multer = require("multer");
const doctor = require("../models/doctor");
const storage = multer.memoryStorage(); 
const upload = multer({ storage: storage });


const secret = "your_jwt_secret";

// this function uses to create docotor 
exports.createDoctor = async (req, res) => {
  try {
    const { name, email, password, NIC, SIMC } = req.body;
    const newDoctor = new Doctor({ name, email, password, NIC, SIMC });
    await newDoctor.save();
    res.status(201).json(newDoctor);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


// this function uses to login docotor 
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const doctor = await Doctor.findOne({ email });
    if (!doctor) {
      return res.status(400).json({ error: "Invalid email or password" });
    }
    const isMatch = await doctor.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    if (doctor.checkingSIMC !== 1) {
      return res
        .status(403)
        .json({ error: "Account is not verified. Please contact support." });
    }

    const token = jwt.sign({ id: doctor._id }, secret, { expiresIn: "1h" });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 3600000, // 1 hour
    });

    res.status(200).json({ message: "Login successful", token: token,doctor:doctor });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// this function used to testing docotor middlware work
exports.doctordetails = async (req, res) => {
  try {
    const userid = req.user.id;
    const doctor = await Doctor.findOne({ _id: userid }); 

    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    res.status(200).json({ doctor });
  } catch (error) {
    console.error('Error fetching doctor details:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


//this function used to image save in firebase
exports.imageupload = [
  upload.single("image"), 
  async (req, res) => {
    console.log("Running this function...");

    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const file = req.file;
    const { originalname, buffer } = file;

    const blob = bucket.file(originalname);

    const blobStream = blob.createWriteStream({
      metadata: {
        contentType: file.mimetype,
      },
    });

    blobStream.on("error", (err) => {
      console.error(err);
      res
        .status(500)
        .json({ error: "Failed to upload file to Firebase Storage" });
    });

    blobStream.on("finish", () => {
      
      blob
        .getSignedUrl({
          action: "read",
          expires: "03-09-2025",
        })
        .then((signedUrls) => {
          const fileUrl = signedUrls[0];

       
          res
            .status(200)
            .json({ message: "File uploaded successfully", fileUrl });
        })
        .catch((err) => {
          console.error("Error generating signed URL:", err);
          res.status(500).json({ error: "Failed to generate signed URL" });
        });
    });

    blobStream.end(buffer);
  },
];

//this function used to doctor profile edit
exports.profileEdit = async (req ,res) =>{
  try {
    const {img ,telephone ,gender} = req.body;
    const userid = req.user.id;

    const doctor = await Doctor.findById(userid);

    if (!doctor) {
      return res.status(404).json({ error: 'Doctor not found' });
    }

   
    if (img) doctor.ProfileIMG = img;
    if (telephone) doctor.PhoneNumber = telephone;
    if (gender) doctor.Gender = gender;

    await doctor.save();

    res.status(200).json({ message: 'Profile updated successfully', doctor });


  } catch (error) {
    res.status(400).json({ error: err.message });
  }
}


exports.getDoctorById = async (req, res) => {
  try {
    const doctorId = req.params.id;
    const doctor = await Doctor.findById(doctorId).select("-password");

    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    res.status(200).json({ doctor });
  } catch (error) {
    console.error('Error fetching doctor details:', error);
    res.status(500).json({ message: 'Server error' });
  }
};