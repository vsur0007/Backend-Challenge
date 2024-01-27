const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' },
  text: { type: String, required: true },
  rating: { type: Number, required: true }
});

module.exports = mongoose.model('Review', reviewSchema);