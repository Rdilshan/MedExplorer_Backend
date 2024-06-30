const express = require('express');
const router = express.Router();
const patientController  = require('../controllers/patientController');


router.post('/create',patientController.createPatient );
router.get('/get/:nic',patientController.getoneusingnic );


module.exports = router;
