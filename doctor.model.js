const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  location: { type: String, required: true },
  specialty: { type: String, required: true },
  experiences: [{ type: String }],
  educations: [{ type: String }],
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
  patients: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Patient' }],
});

module.exports = mongoose.model('Doctor', doctorSchema);