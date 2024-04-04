const express = require('express');
const productController = require('../controller/ProductController');
const verifyUser = require('../middleware/AuthMiddleware');

const router = express.Router();

router.post('/create',verifyUser, productController.create);
router.get('/findById',verifyUser, productController.findById);
router.put('/update',verifyUser, productController.update);
router.delete('/deleteById',verifyUser, productController.deleteById);
router.get('/findAll',verifyUser, productController.findAll);

module.exports = router;