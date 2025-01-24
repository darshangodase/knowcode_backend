const mongoose = require("mongoose");

const EwasteSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  itemName: { type: String, required: true },
  category: { type: String, required: true },
  condition: { type: String, required: true },
  quantity: { type: Number, required: true },
  location: { type: String, required: true },
  donationOrSale: { type: String, enum: ["donate", "sell"], required: true },
  price: { type: Number },
  biddingEnabled: { type: Boolean },
  biddingEndTime: { type: Date },
  imageUrl: { type: String },
  status: { type: String, default: "pending" },
  bids: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      amount: { type: Number },
    },
  ],
});

module.exports = mongoose.model("Ewaste", EwasteSchema);
