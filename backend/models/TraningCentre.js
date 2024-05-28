// models/TrainingCentre.js
const mongoose = require('mongoose');

const trainCentreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  capacity: {
    type: Number,
    required: true,
  },
  availableSeats: {
    type: Number,
    required: true,
  },
  contactInfo: {
    type: String,
    required: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, {
  timestamps: true,
});

const TrainCentre = mongoose.model('TrainCentre', trainCentreSchema);

module.exports = TrainCentre;
