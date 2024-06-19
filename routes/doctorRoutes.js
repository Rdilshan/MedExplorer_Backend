const express = require('express');
const router = express.Router();
const doctorController = require('../controllers/doctorController');
const  {authMiddleware}   = require("../middlware/doctormiddlware")


router.post('/create',doctorController.createDoctor );
router.post('/login',doctorController.login );

router.get('/profile', authMiddleware, doctorController.doctordetails);
router.post('/profileEdit',doctorController.profileEdit);



module.exports = router;
