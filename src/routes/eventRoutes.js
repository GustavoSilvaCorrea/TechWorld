const { Router } = require('express');
const eventController = require('../controllers/eventController');

const router = Router();

router.get('/', eventController.getAllEvents);
router.get('/:id', eventController.getEventById);
router.post('/', eventController.createEvent);
router.post('/:id/register', eventController.registerInEvent);
router.delete('/:id/register', eventController.cancelRegistration);

module.exports = router;