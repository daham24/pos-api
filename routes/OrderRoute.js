const express = require('express');
const orderController = require('../controller/OrderController');
const verifyUser = require('../middleware/AuthMiddleware');

const router = express.Router();

router.post('/create',verifyUser, orderController.create);
router.get('/findById',verifyUser, orderController.findById);
router.put('/update',verifyUser, orderController.update);
router.delete('/deleteById',verifyUser, orderController.deleteById);
router.get('/findAll',verifyUser, orderController.findAll);

module.exports = router;