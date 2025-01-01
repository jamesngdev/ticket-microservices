const express = require('express');
const router = express.Router();
const controller = require('./event.controller');

router.post('/create', controller.createEvent);
router.get('/:eventId', controller.getEventById);
router.put('/update', controller.updateEvent);
router.get('/', controller.listEvents); // New route to list all events


module.exports = router;