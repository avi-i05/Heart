import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import styles from "./HeartPrediction.module.css";

export default function HeartPrediction() {
  const [features, setFeatures] = useState({
    age: "",
    sex: "",
    cp: "",
    trestbps: "",
    chol: "",
    fbs: "",
    restecg: "",
    thalach: "",
    exang: "",
    oldpeak: "",
    slope: "",
    ca: "",
    thal: "",
  });

  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFeatures({ ...features, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const featureValues = Object.values(features).map(Number);

      const response = await axios.post("http://localhost:8000/predict", {
        features: featureValues,
      });

      console.log("API Response:", response.data);
      setPrediction(response.data.prediction);
    } catch (err) {
      console.error("API Error:", err);
      setError("Prediction failed. Please check input values and try again.");
    } finally {
      setLoading(false);
    }
  };

  const dropdownFields = [
    { name: "sex", label: "Sex", options: ["0: Female", "1: Male"] },
    { name: "cp", label: "Chest Pain Type", options: ["0", "1", "2", "3"] },
    {
      name: "fbs",
      label: "Fasting Blood Sugar",
      options: ["0: ≤120mg/dl", "1: >120mg/dl"],
    },
    { name: "restecg", label: "Rest ECG", options: ["0", "1", "2"] },
    { name: "exang", label: "Exercise Angina", options: ["0: No", "1: Yes"] },
    { name: "slope", label: "ST Slope", options: ["0", "1", "2"] },
    { name: "ca", label: "Major Vessels", options: ["0", "1", "2", "3"] },
    { name: "thal", label: "Thalassemia", options: ["0", "1", "2", "3"] },
  ];

  return (
    <>
      <nav className={styles.navbar}>
        <motion.div
          className={styles.navLogo}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          style={{ cursor: "pointer" }}
        >
          Your Heart
        </motion.div>

        <motion.ul
          className={styles.navLinks}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <motion.li whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <a href="#checkup">Check Up</a>
          </motion.li>
          <motion.li whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <a href="#about">About</a>
          </motion.li>
          <motion.li whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <a href="#developers">Developers</a>
          </motion.li>
          <motion.li whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <a href="#contact">Contact</a>
          </motion.li>
        </motion.ul>
      </nav>

      <div className={styles.intro}>
        <div className={styles.introContent}>
          <h1 className={styles.introHead}>
            Know Your <br /> Heart <div className={styles.heart}>❤️</div>
          </h1>
          <p className={styles.quote}>
            "A place that lets you know your Heart's Health"
          </p>
        </div>
      </div>

      <div className={styles.formContainer} id="checkup">
        <h1 className={styles.heading}>Quick Check Up</h1>
        <motion.form
          onSubmit={handleSubmit}
          className={styles.formWrapper}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <div className={styles.inputGroup}>
            <label htmlFor="age" className={styles.label}>
              Age
            </label>
            <input
              id="age"
              name="age"
              type="number"
              value={features.age}
              onChange={handleChange}
              min={18}
              max={120}
              className={styles.input}
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="trestbps" className={styles.label}>
              Resting BP (mm Hg)
            </label>
            <input
              id="trestbps"
              name="trestbps"
              type="number"
              value={features.trestbps}
              onChange={handleChange}
              min={80}
              max={200}
              className={styles.input}
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="chol" className={styles.label}>
              Cholesterol (mg/dl)
            </label>
            <input
              id="chol"
              name="chol"
              type="number"
              value={features.chol}
              onChange={handleChange}
              min={100}
              max={600}
              className={styles.input}
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="thalach" className={styles.label}>
              Max Heart Rate Achieved
            </label>
            <input
              id="thalach"
              name="thalach"
              type="number"
              value={features.thalach}
              onChange={handleChange}
              min={60}
              max={250}
              className={styles.input}
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="oldpeak" className={styles.label}>
              ST Depression (Oldpeak)
            </label>
            <input
              id="oldpeak"
              name="oldpeak"
              type="number"
              step="0.1"
              value={features.oldpeak}
              onChange={handleChange}
              min={0}
              max={10}
              className={styles.input}
              required
            />
          </div>
          {dropdownFields.map(({ name, label, options }) => (
            <div key={name} className={styles.inputGroup}>
              <label htmlFor={name} className={styles.label}>
                {label}
              </label>
              <select
                id={name}
                name={name}
                value={features[name]}
                onChange={handleChange}
                className={styles.select}
                required
              >
                <option value="">Select</option>
                {options.map((option, index) => (
                  <option key={index} value={option.split(":")[0]}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          ))}

          <motion.button
            whileTap={{ scale: 0.95 }}
            type="submit"
            className={styles.button}
            disabled={loading}
          >
            {loading ? "Predicting..." : "Predict"}
          </motion.button>
        </motion.form>

        {prediction !== null && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={styles.result}
          >
            <p>
              Prediction:{" "}
              {prediction === 1
                ? "High risk of heart disease"
                : "Low risk of heart disease"}
            </p>

            {prediction === 1 ? (
              <motion.div
                className={styles.remedies}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <h3>Recommended Remedies ❤️‍🩹</h3>
                <ul>
                  <li>🧘‍♂️ Manage stress with meditation and relaxation</li>
                  <li>🏃‍♂️ Exercise regularly (at least 30 min/day)</li>
                  <li>
                    🥗 Eat a heart-healthy diet (low salt, low fat, lots of
                    veggies)
                  </li>
                  <li>🚭 Avoid smoking and secondhand smoke</li>
                  <li>🩺 Regularly monitor blood pressure and cholesterol</li>
                </ul>
              </motion.div>
            ) : (
              <motion.div
                className={styles.positive}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <h3>Great Job! 🌟</h3>
                <p>You're at low risk! Keep maintaining a healthy lifestyle:</p>
                <ul>
                  <li>🏃‍♂️ Stay active with regular exercise</li>
                  <li>🥗 Keep eating nutritious foods</li>
                  <li>💧 Stay hydrated and sleep well</li>
                  <li>🧘‍♀️ Continue managing stress effectively</li>
                  <li>🩺 Don't skip routine health checkups</li>
                </ul>
              </motion.div>
            )}
          </motion.div>
        )}

        {error && <p className={styles.error}>{error}</p>}
      </div>
      <div id="about"></div>
      <motion.div
        className={styles.modelCard}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <h2>Model Information</h2>
        <p>
          This model is trained on the UCI Heart Disease dataset using an
          ensemble of classifiers including Random Forest, XGBoost, and Gradient
          Boosting.
        </p>
        <p>
          Accuracy achieved: <strong>98.5%</strong>
        </p>
        <p>
          Technologies used:{" "}
          <strong>Python, Scikit-learn, XGBoost, Flask, React</strong>
        </p>
      </motion.div>
      <div className={styles.developerSection} id="developers">
        <h2 className={styles.devHeading}>Meet the Developers</h2>
        <div className={styles.devCards}>
          {[
            {
              name: "avi   Sharma",
              image: "/",
              desc: "",
            },
            {
              name: "aditya",
              image: "/",
              desc: "",
            },
            {
              name: "udit tiwari",
              image: "/",
              desc: "Team lead -- Data Scientist who trained the model and optimized its accuracy.",
            },
            {
              name: "Yash dutt sharma",
              image: "/",
              desc: "",
            },
          ].map((dev, index) => (
            <motion.div
              className={styles.devCard}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{
                scale: 1.05,
                boxShadow: "0px 12px 24px rgba(0, 0, 0, 0.2)",
              }}
            >
              <img src={dev.image} alt={dev.name} className={styles.devImage} />
              <h3 className={styles.devName}>{dev.name}</h3>
              <p className={styles.devDesc}>{dev.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
      <div id="contact"></div>
      <motion.div
        className={styles.contactSection}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <h2 className={styles.contactHeading}>Contact Us</h2>
        <p className={styles.contactSubheading}>
          We would love to hear from you!
        </p>

        {/* Two-column layout */}
        <div className={styles.contactContent}>
          {/* Left Side: Contact Details */}
          <div className={styles.contactDetails}>
            <p>
              <strong>Email:</strong> your-email@example.com
            </p>
            <p>
              <strong>Phone:</strong> +91 12345 67890
            </p>
            <p>
              <strong>Address:</strong> Your City, Your Country
            </p>
            <p>
              <strong>Instagram:</strong>{" "}
              <a
                href="https://instagram.com/yourprofile"
                target="_blank"
                rel="noopener noreferrer"
              >
                Follow Us
              </a>
            </p>
          </div>

          {/* Right Side: Feedback Form */}
          <form className={styles.contactForm}>
            <h3 className={styles.feedbackHeading}>Feedback</h3>
            <input
              type="text"
              placeholder="Your Name"
              className={styles.contactInput}
              required
            />
            <input
              type="email"
              placeholder="Your Email"
              className={styles.contactInput}
              required
            />
            <textarea
              placeholder="Your Feedback"
              className={styles.contactTextarea}
              rows="5"
              required
            ></textarea>
            <button type="submit" className={styles.contactButton}>
              Submit Feedback
            </button>
          </form>
        </div>
      </motion.div>
    </>
  );
}
