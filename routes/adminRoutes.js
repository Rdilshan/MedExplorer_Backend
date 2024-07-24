const express = require('express');
const router = express.Router();
const adminController = require("../controllers/adminController");
const {adminMiddleware} = require("../middlware/adminmiddlware");



router.post('/login',adminController.adminLogin );



module.exports = router;