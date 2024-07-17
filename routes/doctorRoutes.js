const express = require('express');
const router = express.Router();
const doctorController = require('../controllers/doctorController');
const prescriptionController  = require('../controllers/prescriptionController');

const emailController = require('../controllers/emailController');
const  {authMiddleware}   = require("../middlware/doctormiddlware")


router.post('/create',doctorController.createDoctor );
router.post('/login',doctorController.login );

router.get('/profile', authMiddleware, doctorController.doctordetails);
router.post('/uploadimg',doctorController.imageupload);
router.post('/editprofile',authMiddleware,doctorController.profileEdit);
router.get('/:id', doctorController.getDoctorById);
router.post('/prediction',authMiddleware,prescriptionController.getimageandprediction);

router.post('/forgetpwd', emailController.emailpwd);
router.post('/pwdpinget', emailController.doctorpwdreset);
router.post('/updatepwd', doctorController.updatepwd);



module.exports = router;
