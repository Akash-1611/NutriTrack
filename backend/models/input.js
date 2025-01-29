const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const InputSchema = new mongoose.Schema({
  
  age: { type: Number, required: true },
  gender: { type: String, required: true },
  weight: { type: Number, required: true },
  height: { type: Number, required: true },
  targetweigh: { type: float, required: true },
  dailyactiv: { type: String },
});



module.exports = mongoose.model('Input', InputSchema);