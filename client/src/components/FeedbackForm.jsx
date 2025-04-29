import { useState } from "react";
import axios from "axios";
import styles from "./HeartPrediction.module.css"; 

export default function FeedbackForm() {
  const [formData, setFormData] = useState({
    user_name: "",
    user_email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("https://node-api-v9i2.onrender.com/send-feedback", formData);
      alert("Feedback sent successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to send feedback.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.contactForm}>
      <h3 className={styles.feedbackHeading}>Feedback</h3>
      <input
        type="text"
        name="user_name"
        value={formData.user_name}
        onChange={handleChange}
        placeholder="Your Name"
        className={styles.contactInput}
        required
      />
      <input
        type="email"
        name="user_email"
        value={formData.user_email}
        onChange={handleChange}
        placeholder="Your Email"
        className={styles.contactInput}
        required
      />
      <textarea
        name="message"
        value={formData.message}
        onChange={handleChange}
        placeholder="Your Feedback"
        className={styles.contactTextarea}
        rows="5"
        required
      ></textarea>
      <button type="submit" className={styles.contactButton}>
        Submit Feedback
      </button>
    </form>
  );
}
