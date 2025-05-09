import { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { API_URL } from "../components/config/api";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import "../styles/CreateNewAnimal.css";
import { motion } from "framer-motion";
import backgroundImage from '../assets/BackgroundCreateNew/CreateNewBackg.jpg';

const overlayVariants = {
   hidden: { opacity: 0, x: -50 },
   visible: {
     opacity: 1,
     x: 0,
     transition: { duration: 1.4, ease: "easeOut" },
   },
 };

export default function CreateNewAnimal () {

    const  [animalName, setAnimalName] = useState("");
    const  [animalDescription, setAnimalDescription] = useState("");
    const  [animalDiet, setAnimalDiet] = useState("");
    const  [animalHabitat, setAnimalHabitat] = useState("");
    const  [animalImageUrl, setAnimalImageUrl] = useState("");
    const [animalRegion, setAnimalRegion] = useState([]);

    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();

        const newAnimal = {
         
            name: animalName,
            description: animalDescription,
            diet: animalDiet,
            habitat: animalHabitat,
            image_Url: animalImageUrl,
            region: animalRegion,
        }
        axios.post(`${API_URL}/animals.json`, newAnimal)
        .then((res) => {
          const newAnimalId = res.data.name; 
          toast.success("🎉 New animal added!");
          setTimeout(() => {
            navigate(`/AnimalDetails/${newAnimalId}`);
          }, 2000);
        })
        .catch((error) => {
          console.error("Error adding animal:", error);
          toast.error("Failed to add your animal. Try again!");
        });
            
 
    }

    return (
        
        <div className="create-animal-container">
            <img src={backgroundImage} alt="background" className="create-new-background" />
            
            <motion.div variants={overlayVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.6 }}
          >
            <h3 >Create New Animal</h3>
            <form className="form" onSubmit={handleSubmit}>
            <label>Animal Name
                <input
                type="text"
                name="animalName"
                value={animalName}
                placeholder="What's the animal name?"
                onChange={(e) => setAnimalName(e.target.value)}
                required
                />
            </label>

            <label>Description
                <input
                type="text"
                name="animalDescription"
                value={animalDescription}
                placeholder="What can you tell us about this animal?"
                onChange={(e) => setAnimalDescription(e.target.value)}
                required
                />
            </label>

            <label>Diet
                <input
                type="text"
                name="animalDiet"
                value={animalDiet}
                placeholder="What does this animal eat?"
                onChange={(e) => setAnimalDiet(e.target.value)} 
                required
                />
            </label>

            <label>Habitat
                <input
                type="text"
                name="animalHabitat"    
                value={animalHabitat}
                placeholder="Where does this animal live?"
                onChange={(e) => setAnimalHabitat(e.target.value)}
                required
                />
            </label>

            <label>Image URL
                <input
                type="url"
                name="animalImageUrl"
                value={animalImageUrl}
                placeholder="What does this animal look like?"
                onChange={(e) => setAnimalImageUrl(e.target.value)}
                required
                />
            </label>

            <div className="form-filter">
            <label>Region (Select one or hold "CTRL" to select more)</label>
            <select
              multiple
              value={animalRegion}
              onChange={(e) => {
                const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
                setAnimalRegion(selectedOptions);
              }}
            >
              <option value="North America">North America</option>
              <option value="South America">South America</option>
              <option value="Central America">Central America</option>
              <option value="Africa">Africa</option>
              <option value="Asia">Asia</option>
              <option value="Australia">Australia</option>
              <option value="Europe">Europe</option>
              <option value="Antarctica">Antarctica</option>
            </select>
          </div>

            <button type="submit">Create Animal</button>
                </form>   

                </motion.div>

                <motion.div className="create-animal-card" variants={overlayVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.6 }}
            >
                <h1>Animal Encyclopedia</h1>
                <h2>Welcome to the Animal Encyclopedia! 🦁</h2>
                <p>Here you can create a new animal entry. Please fill in the details below.</p>
                <p>Once you submit the form, you'll be redirected to the home page.</p>
                <p>Thank you for contributing to our encyclopedia!</p>
                <p>Let's get started! 🐾</p>
                </motion.div>

                <ToastContainer position="bottom-left" autoClose={1800} hideProgressBar={false}> New Animal Added! </ToastContainer>    
                </div>
    )


}