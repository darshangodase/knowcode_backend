const mongoose = require('mongoose');

const EwasteSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  itemName: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  condition: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  donationOrSale: {
    type: String,
    enum: ['donate', 'sell'],
    required: true,
  },
  price: {
    type: Number,
    required: function () {
      return this.donationOrSale === 'sell';
    },
  },
  biddingEnabled: {
    type: Boolean,
    default: false,
  },
  biddingEndTime: {
    type: Date,
  },
  bids: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
      amount: {
        type: Number,
        required: true,
      },
      bidTime: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected', 'sold'],
    default: 'pending',
  },
  imageUrl: {
    type: String, // Store the Cloudinary image URL
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Ewaste', EwasteSchema);