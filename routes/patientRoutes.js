const express = require('express');
const router = express.Router();
const patientController  = require('../controllers/patientController');
const {patientauthMiddleware} = require("../middlware/patientmiddlware");
const  {authMiddleware}   = require("../middlware/doctormiddlware");

const emailController = require('../controllers/emailController');



router.post('/create',patientController.createPatient );
router.get('/get/:nic',authMiddleware,patientController.getoneusingnic );
router.post('/login',patientController.login );
router.get('/profile',patientauthMiddleware,patientController.patientdetails );
router.post('/editprofile',patientauthMiddleware,patientController.profileEdit);

router.post('/updatepwd', patientController.updatepwd);
router.post('/otpsend', emailController.patientotpsend);



module.exports = router;
