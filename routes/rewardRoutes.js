const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { getRewards, claimReward } = require('../controllers/rewardController');

router.get('/', authMiddleware, getRewards);
router.post('/claim', authMiddleware, claimReward);

module.exports = router;
