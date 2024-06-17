const express = require('express');
const router = express.Router();
const doctorController = require('../controllers/doctorController');
// const { authMiddleware } = require('../middlewares/doctormiddleware');




router.post('/create',doctorController.createDoctor );
router.post('/login',doctorController.login );


module.exports = router;
