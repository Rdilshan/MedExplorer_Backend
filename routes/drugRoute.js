const express = require('express');
const router = express.Router();
const drugController = require('../controllers/drugController');

router.get('/name/:name', drugController.getdrug);
module.exports = router;