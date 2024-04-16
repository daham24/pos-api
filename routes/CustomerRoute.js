const express = require('express');
const customerController = require('../controller/CustomerController');
const verifyUser = require('../middleware/AuthMiddleware');

const router = express.Router();

router.post('/create', customerController.create);
router.get('/findById/:id', customerController.findById);
router.put('/update/:id', customerController.update);
router.delete('/deleteById/:id', customerController.deleteById);
router.get('/findAll', customerController.findAll);

module.exports = router;