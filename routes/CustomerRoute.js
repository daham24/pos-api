const express = require('express');
const customerController = require('../controller/CustomerController');
const verifyUser = require('../middleware/AuthMiddleware');

const router = express.Router();

router.post('/create', customerController.create);
router.get('/findById',verifyUser, customerController.findById);
router.put('/update',verifyUser, customerController.update);
router.delete('/deleteById',verifyUser, customerController.deleteById);
router.get('/findAll',verifyUser, customerController.findAll);

module.exports = router;