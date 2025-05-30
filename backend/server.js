import express from "express";
import nodemailer from "nodemailer";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import Patient from "./models/Patient.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || "https://myapp-client.onrender.com";


const corsOptions = {
  origin: "https://myapp-client.onrender.com",
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsOptions));
app.use(express.json());


app.post("/send-feedback", async (req, res) => {
  const { user_name, user_email, message } = req.body;

  if (!user_name || !user_email || !message) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_RECEIVER,
      subject: "New Feedback from Your Heart App ❤️",
      html: `
      <h3>New Feedback Received</h3>
      <p><strong>Name:</strong> ${user_name}</p>
      <p><strong>Email:</strong> ${user_email}</p>
      <p><strong>Message:</strong><br/>${message}</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.json({ success: true, message: "Feedback sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ success: false, message: "Failed to send feedback." });
  }
});


mongoose.connect(process.env.MONGODB_URI)

  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));


app.post("/save-patient", async (req, res) => {
  try {
    const newPatient = new Patient(req.body);
    await newPatient.save();
    res.status(201).json({ message: "Patient data saved successfully!" });
  } catch (error) {
    console.error("Error saving patient:", error);
    res.status(500).json({ message: "Failed to save patient data." });
  }
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
