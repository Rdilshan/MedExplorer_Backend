const express = require('express');
const router = express.Router();
const prescriptionController  = require('../controllers/prescriptionController');



router.post('/create',prescriptionController.createPrescription );

module.exports = router;
