const Ewaste = require('../models/Ewaste');
const User = require('../models/User');
const { cloudinary } = require('../utils/cloudinary');

// Create E-Waste Item
const createEwaste = async (req, res) => {
  const { user, itemName, category, condition, quantity, location, donationOrSale, price, biddingEnabled, biddingEndTime } = req.body;
  try {
    // Validate required fields

    if (!user || !itemName || !category || !condition || !quantity || !location || !donationOrSale) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // If selling, validate price
    if (donationOrSale === 'sell' && !price) {
      return res.status(400).json({ error: 'Price is required for selling' });
    }

    // If bidding is enabled, validate bidding end time
    if (biddingEnabled && !biddingEndTime) {
      return res.status(400).json({ error: 'Bidding end time is required if bidding is enabled' });
    }

    // Upload image to Cloudinary
 
    let imageUrl = 'test';
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      imageUrl = result.secure_url; // Get the secure URL of the uploaded image
    }

    // Create new e-waste item
    const ewaste = new Ewaste({
      user,
      itemName,
      category,
      condition,
      quantity,
      location,
      donationOrSale,
      price: donationOrSale === 'sell' ? price : undefined,
      biddingEnabled,
      biddingEndTime: biddingEnabled ? biddingEndTime : undefined,
      imageUrl, // Save the Cloudinary image URL
    });
    
    await ewaste.save();
    res.status(201).json({ message: 'E-Waste created successfully', ewaste });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get All E-Waste Items
const getAllEwaste = async (req, res) => {
  try {
    const ewasteItems = await Ewaste.find()
      .populate('user', 'walletAddress')
      .populate('bids.user', 'walletAddress');
    res.status(200).json(ewasteItems);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get E-Waste Item by ID
const getEwasteById = async (req, res) => {
  const { id } = req.params;

  try {
    const ewaste = await Ewaste.findById(id)
      .populate('user', 'walletAddress')
      .populate('bids.user', 'walletAddress');
    if (!ewaste) {
      return res.status(404).json({ error: 'E-Waste item not found' });
    }
    res.status(200).json(ewaste);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Place a Bid on an E-Waste Item
const placeBid = async (req, res) => {
  const { id } = req.params;
  const { user, amount } = req.body;

  try {
    const ewaste = await Ewaste.findById(id);
    if (!ewaste) {
      return res.status(404).json({ error: 'E-Waste item not found' });
    }

    // Check if bidding is enabled and not expired
    if (!ewaste.biddingEnabled) {
      return res.status(400).json({ error: 'Bidding is not enabled for this item' });
    }
    if (ewaste.biddingEndTime && ewaste.biddingEndTime < new Date()) {
      return res.status(400).json({ error: 'Bidding has ended for this item' });
    }

    // Add the bid
    ewaste.bids.push({ user, amount });
    await ewaste.save();

    res.status(201).json({ message: 'Bid placed successfully', ewaste });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update E-Waste Status (e.g., approve, reject, mark as sold)
const updateEwasteStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const ewaste = await Ewaste.findById(id);
    if (!ewaste) {
      return res.status(404).json({ error: 'E-Waste item not found' });
    }

    // Validate status
    if (!['pending', 'approved', 'rejected', 'sold'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    // Update status
    ewaste.status = status;
    await ewaste.save();

    res.status(200).json({ message: 'E-Waste status updated successfully', ewaste });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete E-Waste Item
const deleteEwaste = async (req, res) => {
  const { id } = req.params;

  try {
    const ewaste = await Ewaste.findByIdAndDelete(id);
    if (!ewaste) {
      return res.status(404).json({ error: 'E-Waste item not found' });
    }
    res.status(200).json({ message: 'E-Waste item deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createEwaste,
  getAllEwaste,
  getEwasteById,
  placeBid,
  updateEwasteStatus,
  deleteEwaste
};