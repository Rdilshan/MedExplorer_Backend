const express = require('express');
const router = express.Router();
const doctorController = require('../controllers/doctorController');

router.post('/create',doctorController.createDoctor );

module.exports = router;
