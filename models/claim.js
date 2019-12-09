const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ClaimSchema = new Schema({
  type: String,
  filed: Date,
  shipped: Date,
  received: Date,
  workOrder: String,
  turnaround: Number,
  status: String
});

const Claim = mongoose.model('Claim', ClaimSchema);

module.exports = Claim;
