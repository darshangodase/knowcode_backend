const express = require('express');
const {
  createEwaste,
  getAllEwaste,
  getEwasteById,
  deleteEwaste
} = require('../controllers/ewasteController');
// const authMiddleware = require('../middleware/authMiddleware');
const upload = require('../middleware/upload');

const router = express.Router();

// Public routes
router.get('/', getAllEwaste);
router.get('/:id', getEwasteById);
router.post('/', upload.single('file'), createEwaste); 
router.delete('/:id', deleteEwaste);

module.exports = router;