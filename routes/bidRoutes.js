const express = require("express");
const { placeBid, getBidsByEwasteId, getAllBids } = require("../controllers/bidController");

const router = express.Router();

// Routes for bids
router.post("/:ewasteId", placeBid); // Place a bid on an e-waste item
router.get("/:ewasteId", getBidsByEwasteId); // Get all bids for a specific e-waste item
router.get("/", getAllBids); // Get all bids (admin or general view)

module.exports = router;
