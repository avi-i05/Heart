<<<<<<< HEAD
import mongoose from 'mongoose';

const patientSchema = new mongoose.Schema({
=======
import mongoose from "mongoose";

const patientSchema = new mongoose.Schema({
  
>>>>>>> b0d913907118750f2a3eda276a4881900df8c2f9
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
<<<<<<< HEAD
  prediction: Number,
});

const Patient = mongoose.model('Patient', patientSchema);

export default Patient;
=======

}, { timestamps: true });

export default mongoose.model("Patient", patientSchema);
>>>>>>> b0d913907118750f2a3eda276a4881900df8c2f9
