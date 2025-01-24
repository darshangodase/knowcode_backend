const express = require('express');
const {
  createEwaste
} = require('../controllers/ewasteController');
const upload = require('../middleware/upload');

const router = express.Router();

// Public routes
// router.get('/', getAllEwaste);
// router.get('/:id', getEwasteById);

// Protected routes (require authentication)
router.post('/', upload.single('image'), createEwaste); 
// router.post('/:id/bid', placeBid);
// router.put('/:id/status', updateEwasteStatus);
// router.delete('/:id', deleteEwaste);

module.exports = router;