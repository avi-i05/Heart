import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import styles from "./HeartPrediction.module.css";
import FeedbackForm from "./FeedbackForm";

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
      console.log("Sending features:", featureValues);  
      

     
      const predictResponse = await axios.post(
        "https://flask-api-1-4ij8.onrender.com/predict",  
        {
          features: featureValues,
          prediction: predictResponse.data.prediction,  
        }
      );

      console.log("Prediction Response:", predictResponse.data);
      setPrediction(predictResponse.data.prediction);

      
      const saveResponse = await axios.post(
        "https://node-api-v9i2.onrender.com/save-patient",  
        features
      );

      console.log("Save Patient Response:", saveResponse.data);
    } catch (err) {
      console.error("Error:", err);
      setError(
        `Something went wrong: ${err.response ? err.response.data : err.message}. Please check input values and try again.`
      );
    } finally {
      setLoading(false);
    }
  };


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
        <h1 className={styles.heading}>
          <span className={styles.headingUnderline}>
            Health Status at a Glance
          </span>
        </h1>
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
            <label htmlFor="sex" className={styles.label}>
              Sex
            </label>
            <select
              id="sex"
              name="sex"
              value={features.sex}
              onChange={handleChange}
              className={styles.select}
              required
            >
              <option value="">Select</option>
              {["0: Female", "1: Male"].map((option, index) => (
                <option key={index} value={option.split(":")[0]}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="cp" className={styles.label}>
              Chest Pain Type
            </label>
            <select
              id="cp"
              name="cp"
              value={features.cp}
              onChange={handleChange}
              className={styles.select}
              required
            >
              <option value="">Select</option>
              {["0", "1", "2", "3"].map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
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
            <label htmlFor="fbs" className={styles.label}>
              Fasting Blood Sugar
            </label>
            <select
              id="fbs"
              name="fbs"
              value={features.fbs}
              onChange={handleChange}
              className={styles.select}
              required
            >
              <option value="">Select</option>
              {["0: ≤120mg/dl", "1: >120mg/dl"].map((option, index) => (
                <option key={index} value={option.split(":")[0]}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="restecg" className={styles.label}>
              Rest ECG
            </label>
            <select
              id="restecg"
              name="restecg"
              value={features.restecg}
              onChange={handleChange}
              className={styles.select}
              required
            >
              <option value="">Select</option>
              {["0", "1", "2"].map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
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
            <label htmlFor="exang" className={styles.label}>
              Exercise Angina
            </label>
            <select
              id="exang"
              name="exang"
              value={features.exang}
              onChange={handleChange}
              className={styles.select}
              required
            >
              <option value="">Select</option>
              {["0: No", "1: Yes"].map((option, index) => (
                <option key={index} value={option.split(":")[0]}>
                  {option}
                </option>
              ))}
            </select>
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
          <div className={styles.inputGroup}>
            <label htmlFor="slope" className={styles.label}>
              ST Slope
            </label>
            <select
              id="slope"
              name="slope"
              value={features.slope}
              onChange={handleChange}
              className={styles.select}
              required
            >
              <option value="">Select</option>
              {["0", "1", "2"].map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="ca" className={styles.label}>
              Major Vessels
            </label>
            <select
              id="ca"
              name="ca"
              value={features.ca}
              onChange={handleChange}
              className={styles.select}
              required
            >
              <option value="">Select</option>
              {["0", "1", "2", "3"].map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="thal" className={styles.label}>
              Thalassemia
            </label>
            <select
              id="thal"
              name="thal"
              value={features.thal}
              onChange={handleChange}
              className={styles.select}
              required
            >
              <option value="">Select</option>
              {["0", "1", "2", "3"].map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

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
      <hr className={styles.sectionDivider} />
      <div id="about"></div>
      <motion.div
        className={styles.modelInfo}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <h2 className={styles.headingUnderline}>Model Insights</h2>
        <p>
          This model uses an ensemble of machine learning algorithms—Random
          Forest, XGBoost, and Gradient Boosting—trained on the UCI Heart
          Disease dataset. It predicts the likelihood of heart disease with an
          accuracy of 98.5%.
        </p>

        <div className={styles.cardContainer}>
          <div className={styles.card}>
            <h3 className={styles.subHeading}>Overview</h3>
            <p>
              The model combines various classifiers, including Random Forest,
              XGBoost, and Gradient Boosting, to make robust predictions.
            </p>
          </div>

          <div className={styles.card}>
            <h3 className={styles.subHeading}>Performance</h3>
            <p>
              Accuracy achieved: <strong>98.5%</strong>
            </p>
          </div>

          <div className={styles.card}>
            <h3 className={styles.subHeading}>Technologies Used</h3>
            <p>
              <strong>Python, Scikit-learn, XGBoost, Flask, React</strong>
            </p>
          </div>
        </div>
      </motion.div>
      <hr className={styles.sectionDivider} />

      <div className={styles.developerSection} id="developers">
        <h2 className={styles.devHeading}>
          <span className={styles.headingUnderline}>
            The Team That Built This
          </span>
        </h2>
        <div className={styles.devCards}>
          {[
            {
              name: "Avi Sharma",
              image: "/avi.jpg",
              desc: "Avi was responsible for the entire backend infrastructure of the project. He handled the integration of the machine learning model, database design, and deployment of the complete system, ensuring everything functioned smoothly behind the scenes.",
              contributions: [
                "Key Contributions:",
                "Developed RESTful APIs to connect the frontend with the machine learning model.",
                "Integrated the trained model into the backend for real-time prediction handling.",
                "Designed and implemented the database to store patient data, model inputs, and results.",
                "Managed deployment of the full application, including hosting, environment setup, and model serving.",
                "Ensured backend performance, security, and scalability throughout development."
              ],
              gmail: "mailto:avisharmaaa373@gmail.com",
              github: "https://github.com/avi-i05",
              linkedin: "https://www.linkedin.com/in/avi-sharma-4189b1278/"
            },
            {
              name: "Aditya",
              image: "/aditya.jpg",
              desc: "Aditya led the development and training of the machine learning model. He was responsible for building the core predictive engine that powers the application.",
              contributions: [
                "Key Contributions:",
                "Collected, cleaned, and prepared the dataset for model training.",
                "Engineered relevant features and selected appropriate algorithms for the prediction task.",
                "Trained the initial version of the model and validated its performance using suitable metrics.",
                "Documented the training process and collaborated with the team for seamless integration."
              ],
              gmail: "mailto:adityadixitaadi@gmail.com",
              github: "https://github.com/aadidxt",
              linkedin: "https://www.linkedin.com/in/aditya-dixit-1431a0312"
            },
            {
              name: "Udit Tiwari",
              image: "/udit1.jpg",
              desc: "Udit focused on improving the performance and accuracy of the machine learning model developed by Aditya. His work ensured the model met high standards for reliability and precision.",
              contributions: [
                "Key Contributions:",
                "Conducted in-depth performance analysis and identified areas for improvement.",
                "Tuned hyperparameters and applied advanced optimization techniques.",
                "Evaluated the model using metrics like accuracy, precision, recall, and F1-score.",
                "Ensured the final model was efficient, robust, and production-ready."
              ],
              gmail: "mailto:uditt6758@gmail.com",
              github: "https://github.com/Udit-Tiwari",
              linkedin: "https://www.linkedin.com/in/udit-tiwari-30291824a"
            },
            {
              name: "Yash Dutt Sharma",
              image: "/yash1.jpg",
              desc: "Yash played a key role in the frontend development and visual design of the project. His responsibilities focused on crafting an intuitive user interface and ensuring that the model’s results were presented in a clear, visually appealing, and user-friendly manner.",
              contributions: [
                "Key Contributions:",
                "Designed and implemented the frontend layout using modern web technologies.",
                "Developed responsive and accessible UI components for user interaction with the prediction model.",
                "Integrated the model’s output into the interface for real-time and accurate result visualization.",
                "Ensured consistency in design, color schemes, and branding across all pages."
              ],
              gmail: "mailto:ys107989@gmail.com",
              github: "https://github.com/Yash-Dutt-Sharma",
              linkedin: "https://www.linkedin.com/in/yash-dutt-sharma-yds"
            },
          ].map((dev, index) => (
            <motion.div
              className={styles.devCard}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <img src={dev.image} alt={dev.name} className={styles.devImage} />
              <h3 className={styles.devName}>{dev.name}</h3>
              <p className={styles.devDesc}>{dev.desc}</p>

              <ul className={styles.devHoverList}>
                {dev.contributions?.map((point, i) => (
                  <li key={i}>{point}</li>
                ))}
              </ul>

              <div className={styles.socialIcons}>
                <a href={dev.gmail} target="_blank" rel="noopener noreferrer">
                  <img
                    src="/gmail-icon.png"
                    alt="Gmail"
                    className={styles.socialIcon}
                  />
                </a>
                <a href={dev.github} target="_blank" rel="noopener noreferrer">
                  <img
                    src="/github-icon.jpeg"
                    alt="GitHub"
                    className={styles.socialIcon}
                  />
                </a>
                <a
                  href={dev.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="/linkedin-icon.png"
                    alt="LinkedIn"
                    className={styles.socialIcon}
                  />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <hr className={styles.sectionDivider} />
      <div id="contact"></div>
      <motion.div
        className={styles.contactSection}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <h2 className={styles.contactHeading}>
          <span className={styles.headingUnderline} style={{ color: "white" }}>
            Connect With Us
          </span>
        </h2>
        <p className={styles.contactSubheading}>
          We would love to hear from you!
        </p>

        <div className={styles.contactContent}>
          <div className={styles.contactDetails}>
            <p>
              <strong>Email:</strong> avisharmaaa373@gmail.com,
              adityadixitaadi@gmail.com
            </p>
            <p>
              <strong>Phone:</strong> +91 70841 40032, +91 9258247887
            </p>
            <p>
              <strong>Address:</strong> Bareilly, India
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
          <FeedbackForm />
        </div>
      </motion.div>
      <motion.footer
        className={styles.footer}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <p className={styles.footerText}>
          © {new Date().getFullYear()} Your Heart. All Rights Reserved.
        </p>
      </motion.footer>
    </>
  );
}
