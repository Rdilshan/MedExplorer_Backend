const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const adminAuthMiddleware = require('../middlware/adminmiddlware');

router.post('/login', adminController.adminLogin);
router.get('/reg', adminController.adminRegister);
router.get('/count',adminAuthMiddleware,adminController.count);



module.exports = router;
