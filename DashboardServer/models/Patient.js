const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  name: String,
  age: Number,
  sex: Number,
  cp: Number,
  trestbps: Number,
  chol: Number,
  fbs: Number,
  restecg: Number,
  thalach: Number,
  exang: Number,
  oldpeak: Number,
  slope: Number,
  ca: Number,
  thal: Number,
  prediction: Number,
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Patient', patientSchema);
