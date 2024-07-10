const Doctor = require("../models/doctor");
var nodemailer = require('nodemailer');


exports.emailpwd = async (req, res) => {
  try {
    const { SIMC } = req.body;

    const doctor = await Doctor.findOne({ SIMC });

    if (!doctor) {
      return res.status(404).json({ error: 'Doctor not found' });
    }

    const id = doctor._id;

    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'rd118755@gmail.com',
        pass: 'auoouryzgaxckvws'
      }
    });
    
    var mailOptions = {
      from: 'MedExplorer',
      to: 'rdilshan077788@gmail.com',
      subject: 'Forgot Your MedExplorer Password? Lets Fix That!',
      html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Password Reset</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .container {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        h1 {
            color: #333333;
        }
        p {
            color: #666666;
        }
        .pin {
            display: inline-block;
            font-size: 24px;
            color: #ffffff;
            background-color: #007bff;
            padding: 10px 20px;
            border-radius: 5px;
            margin: 20px 0;
        }
        .footer {
            margin-top: 20px;
            color: #999999;
            font-size: 12px;
            text-align: center;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Welcome</h1>
        <p>Your password reset pin is below:</p>
        <div class="pin">123456</div>
        <p>This pin is valid for only 5 minutes.</p>
        <div class="footer">
            <p>If you did not request a password reset, please ignore this email.</p>
        </div>
    </div>
</body>
</html>
`
    };
    
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        res.status(400).json({ error: error });
      } else {
        res.status(200).json({ msg: info.response });
      }
    });


  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
