const { Router } = require('express');
const teamController = require('../controllers/teamController');

const router = Router();
router.post('/', teamController.createTeam);
router.post('/join', teamController.joinTeamByCode);

module.exports = router;