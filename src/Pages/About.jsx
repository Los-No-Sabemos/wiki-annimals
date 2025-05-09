import "../styles/About.css";
import AboutVideoHD from "../assets/AboutVideoHD.mp4";
import { motion } from "framer-motion";

const overlayVariants = {
   hidden: { opacity: 0, x: -50 },
   visible: {
     opacity: 1,
     x: 0,
     transition: { duration: 1.4, ease: "easeOut" },
   },
 };

export default function About() {
   return (
       <div className="about-container">
     <div className="video-background-container">
       <video autoPlay loop muted playsInline className="background-video">
         <source src={AboutVideoHD} type="video/mp4" />
       </video>
 
      
       <div className="about-content">
          <motion.div 
            className="about-section main-section"
            variants={overlayVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.6 }}
          >
            <h1>About Us</h1>
            <p>Welcome to <span className="highlight">Animal Wiki</span>! This interactive web application showcases a collection of animals 
            along with interesting facts about each one. Browse through different species, learn about their habitats, diets, and unique 
            characteristics—all in one place!</p>
          </motion.div>
          
          <motion.div 
            className="horizontal-sections"
            variants={overlayVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.6 }}
          >
            <motion.section 
              className="about-section horizontal-section"
              variants={overlayVariants}
            >
              <h2>Team Members</h2>
              <p>We are <span className="highlight">Eliana Depietri</span> and <span className="highlight">Florian Wunsch</span>, two passionate 
              Development Students who created this app as part of our journey in learning React and web development.</p>
            </motion.section>

            <motion.section 
              className="about-section horizontal-section"
              variants={overlayVariants}
            >
              <h2>Technologies Used</h2>
              <p>This project was built using <span className="highlight">React</span>, <span className="highlight">React Router </span>, 
              <span className="highlight">&nbsp; Axios </span>, among others.</p>
            </motion.section>

            <motion.section 
              className="about-section horizontal-section"
              variants={overlayVariants}
            >
              <h2>Our Purpose</h2>
              <p>We wanted to combine our love for animals with our interest in web development.</p>
            </motion.section>

            <motion.section 
              className="about-section horizontal-section"
              variants={overlayVariants}
            >
              <h2>Special Thanks 🐾</h2>
              <p>We are grateful for the support from <span className="highlight">Luis Junco&nbsp; </span> 
              and&nbsp;<span className="highlight">Neko </span>!</p>
            </motion.section>
            </motion.div>
        </div>
      </div>
    </div>
  );
 }
