import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { API_URL } from "../components/config/api";
import { Link } from "react-router-dom";
import "../styles/WikkiDictionary.css";

const overlayVariants = {
    hidden: { 
      opacity: 0, 
      x: -50 
    },
    visible: (index) => ({
      opacity: 1,
      x: 0,
      transition: { 
        delay: index * 0.1, 
        duration: 0.8, 
        ease: "easeOut" 
      }
    })
  };

export default function WikkiDictionary() {

  const [animals, setAnimals] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_URL}/animals.json`)
      .then((response) => {
        const animalData = response.data;
        if (animalData) {
          const animalArr = Object.keys(animalData).map((id) => ({
            id,
            ...animalData[id],
          }));
          
          const sortedAnimals = animalArr.sort((a, b) => 
            a.name.localeCompare(b.name)
          );
          
          setAnimals(sortedAnimals);
        } else {
          setAnimals([]);
        }
      })
      .catch((error) => {
        console.log("No animals were found", error);
      });
  }, []);

  return (
    <div className="wikki-dictionary-container">
      <img className="wikki-background-image"
        src="https://cdn.pixabay.com/video/2021/10/07/91186-626005206_tiny.jpg"
        alt="Background" />

      <h1>Wiki Dictionary</h1>
      <h2>Find your animal here: </h2>
      <div>
        {animals.map((animal, index) => {
          return (
            <section
              key={animal.id}
              className="animal-list-item"
            >
              <motion.div
                className="wikki-overlay"
                variants={overlayVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.6 }}
                custom={index} // Pass the index as a custom prop
                transition={{ 
                  duration: 0.8, 
                  ease: "easeOut",
                  delay: index * 0.1 // Each element delays by 0.1s more than the previous
                }}
              >
                <Link to={`/AnimalDetails/${animal.id}`}>{animal.name}</Link>
              </motion.div>
            </section>
          );
        })}
      </div>
    </div>
  );
}