const express = require('express');
const {
  createEwaste
} = require('../controllers/ewasteController');
// const authMiddleware = require('../middleware/authMiddleware');
const upload = require('../middleware/upload');

const router = express.Router();

// Public routes
// router.get('/', getAllEwaste);
// router.get('/:id', getEwasteById);

// Protected routes (require authentication)
router.post('/', upload.single('image'), createEwaste); // Add upload middleware
// router.post('/:id/bid', authMiddleware, placeBid);
// router.put('/:id/status', authMiddleware, updateEwasteStatus);
// router.delete('/:id', authMiddleware, deleteEwaste);

module.exports = router;