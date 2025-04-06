import React from "react";
import { motion } from "framer-motion";
import "../index.css";

const About = () => {
  return (
    <div className="about-container">
      {/* Hero Section */}
      <section className="hero">
        <motion.h1
          className="hero-title"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          About Bookstore Catalog
        </motion.h1>
        <motion.p
          className="hero-subtitle"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          An intuitive and user-friendly platform for discovering, organizing, and managing books. 
          Easily browse a vast collection, add new titles, categorize books, and keep track of your personal library 
          with powerful search and filtering options.
        </motion.p>
      </section>

      {/* Features Section */}
      <section className="features">
        <h2 className="section-title">Key Features</h2>
        <div className="feature-grid">
          {[
            { title: "Book Management", desc: "Add, remove, and edit books." },
            { title: "Sorting & Filtering", desc: "Sort and filter books easily." },
            { title: "Search Functionality", desc: "Find books instantly by title or author." },
            { title: "Cart System", desc: "Add books to a cart for easy tracking." },
            { title: "Local Storage", desc: "Persist book data across sessions." },
            { title: "Modern UI", desc: "A clean, responsive, and user-friendly design." },
          ].map((feature, index) => (
            <motion.div
              key={index}
              className="feature-card"
              whileHover={{ scale: 1.05 }}
            >
              <h3>{feature.title}</h3>
              <p>{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="tech-stack">
        <h2 className="section-title">Technology Stack</h2>
        <div className="tech-icons">
          {[
            { name: "React", logo: "https://cdn.worldvectorlogo.com/logos/react-2.svg" },
            { name: "Tailwind CSS", logo: "https://cdn.worldvectorlogo.com/logos/tailwind-css-2.svg" },
            { name: "Framer Motion", logo: "https://cdn.worldvectorlogo.com/logos/framer-motion.svg" },
          ].map((tech, index) => (
            <motion.div key={index} className="tech-item" whileHover={{ scale: 1.1 }}>
              <img src={tech.logo} alt={tech.name} />
              <p>{tech.name}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Team Section (Optional) */}
      <section className="team">
        <h2 className="section-title">Meet the Team</h2>
        <div className="team-grid">
          {[
            { name: "Deborah and Emmanuel", role: "Sign-Up and Home Pages" },
            { name: "Chinemerem and Micheal", role: "About and Shopping Pages" },
            { name: "Michael Brown", role: "Book List and Shop Page" },
          ].map((member, index) => (
            <motion.div
              key={index}
              className="team-card"
              whileHover={{ scale: 1.05 }}
            >
              <h3>{member.name}</h3>
              <p>{member.role}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Call-to-Action */}
      <section className="cta">
        <h2>Get Involved</h2>
        <p>Want to contribute? Check out our GitHub repository.</p>
        <a
          href="https://github.com/Emmy-24/Bookstore-Catalog-App"
          className="cta-button"
        >
          Visit GitHub
        </a>
      </section>
    </div>
  );
};

export default About;
