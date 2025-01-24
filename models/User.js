const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  walletAddress: { type: String, required: true, unique: true },
  recycledItems: [{ type: mongoose.Schema.Types.ObjectId, ref: 'EWaste' }],
  rewardsEarned: { type: Number, default: 0 },
});

module.exports = mongoose.model('User', userSchema);