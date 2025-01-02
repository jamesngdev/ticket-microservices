const express = require('express');
const router = express.Router();
const controller = require('./order.controller');

router.get('/:id', controller.getOrder);
router.post('/create', controller.createOrder);

module.exports = router;