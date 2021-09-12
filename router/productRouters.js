const express = require('express');
const productsController = require('../controllers/productControllers');

const router = express.Router();

router.post('/', productsController.add);

router.get('/', productsController.getAll);

router.get('/:id', productsController.getById);

module.exports = router;
