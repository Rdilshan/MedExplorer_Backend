const express = require('express');
const router = express.Router();
const patientController  = require('../controllers/patientController');
const {patientauthMiddleware} = require("../middlware/patientmiddlware");

router.post('/create',patientController.createPatient );
router.get('/get/:nic',patientController.getoneusingnic );
router.post('/login',patientController.login );


module.exports = router;
