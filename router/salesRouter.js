const express = require('express');
const salesController = require('../controllers/salesControllers');

const router = express.Router();

router.post('/', salesController.add);

router.get('/', salesController.getAll);

router.get('/:id', salesController.getById);

router.put('/:id');

router.delete('/:id');

module.exports = router;