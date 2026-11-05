const { Router } = require('express');
const userController = require('../controllers/userController');

const router = Router();
router.get('/:id', userController.getProfile);
router.put('/:id', userController.updateProfile);

module.exports = router;