import mongoose from "mongoose";

const patientSchema = new mongoose.Schema({
  
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

}, { timestamps: true });

export default mongoose.model("Patient", patientSchema);
