const express = require('express');
const {
  createEwaste,
  getAllEwaste,
  getEwasteById,
  placeBid,
  updateEwasteStatus,
  deleteEwaste,
} = require('../controllers/ewasteController');
const authMiddleware = require('../middleware/authMiddleware');
const upload = require('../middleware/upload');

const router = express.Router();

// Public routes
router.get('/', getAllEwaste);
router.get('/:id', getEwasteById);

// Protected routes (require authentication)
router.post('/', authMiddleware, upload.single('image'), createEwaste); // Add upload middleware
router.post('/:id/bid', authMiddleware, placeBid);
router.put('/:id/status', authMiddleware, updateEwasteStatus);
router.delete('/:id', authMiddleware, deleteEwaste);

module.exports = router;