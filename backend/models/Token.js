// models/Token.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

const tokenSchema = new Schema({
  token: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now, expires: '1h' }
});

module.exports = mongoose.model('Token', tokenSchema);
