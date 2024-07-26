const express = require('express');
const router = express.Router();
const prescriptionController  = require('../controllers/prescriptionController');
const  {authMiddleware}   = require("../middlware/doctormiddlware")
const {patientauthMiddleware} = require("../middlware/patientmiddlware")




router.post('/create',authMiddleware,prescriptionController.createPrescription );
router.get('/getdoctor',authMiddleware,prescriptionController.getdoctorprescription );
router.get('/getpatient',patientauthMiddleware,prescriptionController.getpatientprescription );
router.get('/get/:id',prescriptionController.getPrescriptionById);


module.exports = router;
