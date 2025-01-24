const express = require('express');
const { createEwaste } = require('../controllers/ewasteController');
const upload = require('../middleware/upload');

const router = express.Router();

// Public routes
// Uncomment these if needed for additional functionality:
// router.get('/', getAllEwaste);
// router.get('/:id', getEwasteById);

// Protected routes
router.post('/', upload.single('image'), createEwaste); 
// Uncomment and implement these routes if needed for functionality:
// router.post('/:id/bid', authMiddleware, placeBid);
// router.put('/:id/status', authMiddleware, updateEwasteStatus);
// router.delete('/:id', authMiddleware, deleteEwaste);

module.exports = router;
