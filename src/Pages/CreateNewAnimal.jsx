import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../components/config/api";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import "../styles/CreateNewAnimal.css";
import { motion } from "framer-motion";

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
            .then(() => {
                console.log("Animal added!");
                toast.success("🎉 New animal added!");
                 setTimeout(() => {
                 navigate("/");
                }, 2000); 
            })
            .catch((error) => {
                console.error("Error adding animal:", error);
            });

            
 
    }

    return (
        
        <div className="create-animal-container">
            <img src="src\assets\BackgroundCreateNew\CreateNewBackg.jpg" alt="background" className="create-new-background" />
            <motion.div  className="create-animal-form" variants={overlayVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.6 }}
          >
            <h2>Create New Animal</h2>
            <form onSubmit={handleSubmit}>
            <label>Animal Name
                <input
                type="text"
                name="animalName"
                value={animalName}
                placeholder="What's the animal name?"
                onChange={(e) => setAnimalName(e.target.value)}
                />
            </label>

            <label>Description
                <input
                type="text"
                name="animalDescription"
                value={animalDescription}
                placeholder="What can you tell us about this animal?"
                onChange={(e) => setAnimalDescription(e.target.value)}
                />
            </label>

            <label>Diet
                <input
                type="text"
                name="animalDiet"
                value={animalDiet}
                placeholder="What does this animal eat?"
                onChange={(e) => setAnimalDiet(e.target.value)} 
                />
            </label>

            <label>Habitat
                <input
                type="text"
                name="animalHabitat"    
                value={animalHabitat}
                placeholder="Where does this animal live?"
                onChange={(e) => setAnimalHabitat(e.target.value)}
                />
            </label>

            <label>Image URL
                <input
                type="text"
                name="animalImageUrl"
                value={animalImageUrl}
                placeholder="What does this animal look like?"
                onChange={(e) => setAnimalImageUrl(e.target.value)}
                />
            </label>

<label>Region (Select one or more)
  <select
    multiple
    value={animalRegion}
    onChange={(e) =>
      setAnimalRegion(Array.from(e.target.selectedOptions, option => option.value))
    }
    style={{ height: "100px" }} 
  >
    <option value="North America">North America</option>
    <option value="South America">South America</option>
    <option value="Africa">Africa</option>
    <option value="Asia">Asia</option>
    <option value="Australia">Australia</option>
    <option value="Europe">Europe</option>
    <option value="Antarctica">Antarctica</option>
  </select>
</label>

            <button type="submit">Create Animal</button>
                </form>   

                </motion.div>
                <ToastContainer position="bottom-left" autoClose={1800} hideProgressBar={false} />    
                </div>
    )


}