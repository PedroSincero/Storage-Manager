const express = require('express');
const productsController = require('../controllers/productControllers');

const router = express.Router();

router.post('/', productsController.add);

module.exports = router;