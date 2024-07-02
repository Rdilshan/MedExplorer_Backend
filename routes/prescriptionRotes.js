const express = require('express');
const router = express.Router();
const prescriptionController  = require('../controllers/prescriptionController');
const  {authMiddleware}   = require("../middlware/doctormiddlware")




router.post('/create',authMiddleware,prescriptionController.createPrescription );
router.get('/getdoctor',authMiddleware,prescriptionController.getdoctorprescription );


module.exports = router;
