import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import "../styles/AnimalList.css";
import { API_URL } from "./config/api";
import { Link } from "react-router-dom";

const overlayVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 2, ease: "easeOut" },
  },
};

export default function AnimalList() {
  const [animals, setAnimals] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState("All");
  const carouselRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

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
          setAnimals(animalArr);
        } else {
          setAnimals([]);
        }
      })
      .catch((error) => {
        console.log("No animals were found", error);
      });
  }, []);

  useEffect(() => {
    const handleWheel = (e) => {
      if (!carouselRef.current) return;
      e.preventDefault();
      const direction = e.deltaY > 0 ? 1 : -1;
      setCurrentIndex((prev) => {
        const next = Math.min(
          Math.max(prev + direction, 0),
          animals.length - 1
        );
        scrollToSlide(next);
        return next;
      });
    };

    const scrollToSlide = (index) => {
      if (carouselRef.current) {
        const scrollX = index * window.innerWidth;
        carouselRef.current.scrollTo({
          left: scrollX,
          behavior: "smooth",
        });
      }
    };

    const carousel = carouselRef.current;
    if (carousel) {
      carousel.addEventListener("wheel", handleWheel, { passive: false });
    }

    return () => {
      if (carousel) {
        carousel.removeEventListener("wheel", handleWheel);
      }
    };
  }, [animals]);

  
  const regions = ["All", ...new Set(animals.map((animal) => animal.region))];

  
  const filteredAnimals =
    selectedRegion === "All"
      ? animals
      : animals.filter((animal) => animal.region === selectedRegion);



  return (
    <div>
      
      <div className="filter">
        <select
          id="regionFilter"
          value={selectedRegion}
          onChange={(e) => setSelectedRegion(e.target.value)}
          aria-label="Filter animals by region"
        >
          {regions.map((region) => (
            <option key={region} value={region}>
              {region}
            </option>
          ))}
        </select>
      </div>

      <div ref={carouselRef} className="carousel-horizontal">
        {filteredAnimals.map((animal) => (
          <section
            key={animal.id}
            className="animal-slide"
            style={{ backgroundImage: `url(${animal.image_Url})` }}
          >
            <motion.div
              className="overlay"
              variants={overlayVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.6 }}
            >
              <h2>{animal.name}</h2>
              <p>Habitat: {animal.habitat}</p>
              <p>Region: {animal.region}</p>
              <p className="animal-fact">Fun Fact: {animal.fact}</p>
              <Link to={`/AnimalDetails/${animal.id}`}>More Info</Link>
            </motion.div>
          </section>
        ))}
      </div>
    </div>
  );
}