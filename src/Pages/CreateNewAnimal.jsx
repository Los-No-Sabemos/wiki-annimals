import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../components/config/api";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function CreateNewAnimal () {

    const  [animalName, setAnimalName] = useState("");
    const  [animalDescription, setAnimalDescription] = useState("");
    const  [animalDiet, setAnimalDiet] = useState("");
    const  [animalHabitat, setAnimalHabitat] = useState("");
    const  [animalImageUrl, setAnimalImageUrl] = useState("");
    const  [animalRegion, setAnimalRegion] = useState("");

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
        <>
        <div className="create-animal-form">
            <h2>Create New Animal</h2>
            <form onSubmit={handleSubmit}>
            <label>Animal Name
                <input
                type="text"
                name="animalName"
                value={animalName}
                placeholder="Animal Name"
                onChange={(e) => setAnimalName(e.target.value)}
                />
            </label>

            <label>Animal Description
                <input
                type="text"
                name="animalDescription"
                value={animalDescription}
                placeholder="Animal Description"
                onChange={(e) => setAnimalDescription(e.target.value)}
                />
            </label>

            <label>Animal Diet
                <input
                type="text"
                name="animalDiet"
                value={animalDiet}
                placeholder="Animal Diet"
                onChange={(e) => setAnimalDiet(e.target.value)} 
                />
            </label>

            <label>Animal Habitat
                <input
                type="text"
                name="animalHabitat"    
                value={animalHabitat}
                placeholder="Animal Habitat"
                onChange={(e) => setAnimalHabitat(e.target.value)}
                />
            </label>

            <label>Animal Image URL
                <input
                type="text"
                name="animalImageUrl"
                value={animalImageUrl}
                placeholder="Animal Image URL"
                onChange={(e) => setAnimalImageUrl(e.target.value)}
                />
            </label>

            <label>Animal Region
                <input
                type="text"
                name="animalRegion"
                value={animalRegion}
                placeholder="Animal Region" 
                onChange={(e) => setAnimalRegion(e.target.value)}
                />
            </label>

            <button type="submit">Create Animal</button>
                </form>   

                </div>
                <ToastContainer position="bottom-left" autoClose={1800} hideProgressBar={false} />    
                </> 
    )


}