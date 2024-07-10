const express = require('express');
const router = express.Router();
const doctorController = require('../controllers/doctorController');
const emailController = require('../controllers/emailController');
const  {authMiddleware}   = require("../middlware/doctormiddlware")


router.post('/create',doctorController.createDoctor );
router.post('/login',doctorController.login );

router.get('/profile', authMiddleware, doctorController.doctordetails);
router.post('/uploadimg',doctorController.imageupload);
router.post('/editprofile',authMiddleware,doctorController.profileEdit);
router.get('/:id', doctorController.getDoctorById);

router.post('/forgetpwd', emailController.emailpwd);


module.exports = router;
