import { API_URL } from "../components/config/api";
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import axios from "axios"
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import "../styles/UpdateAnimal.css";

export default function UpdateAnimal() {

const [animalName, setAnimalName] = useState("");
const [animalDescription, setAnimalDescription] = useState("");
const [animalDiet, setAnimalDiet] = useState("");
const [animalHabitat, setAnimalHabitat] = useState("");
const [animalImageUrl, setAnimalImageUrl] = useState("");
const [animalRegion, setAnimalRegion] = useState("");

const navigate = useNavigate();
const { id } = useParams();


useEffect(() => {
    axios.get(`${API_URL}/animals/${id}.json`)
        .then((response) => {
            setAnimalName(response.data.name);
            setAnimalDescription(response.data.description);
            setAnimalDiet(response.data.diet);
            setAnimalHabitat(response.data.habitat);
            setAnimalImageUrl(response.data.image_Url);
            setAnimalRegion(response.data.region);
        })
        .catch((error) => {
            console.error("Error fetching animal:", error);
        });
}, [id]);

const handleSubmit = (e) => {
    e.preventDefault();

    const updatedAnimal = {
        "name": animalName,
        "description": animalDescription,
        "diet": animalDiet,
        "habitat": animalHabitat,
        "image_Url": animalImageUrl,
        "region": animalRegion,
    };

    axios.put(`${API_URL}/animals/${id}.json`, updatedAnimal)
        .then(response => {
            console.log("Animal updated!");
            toast.success("🎉 Animal updated!");
            setTimeout(() => {
            navigate(`/AnimalDetails/${id}`);
            }, 2000); 
        })
        .catch((error) => {
            console.error("Error updating animal:", error);
        });
};

    return (
        <>
        <div className="update-animal-container">
            <img className  = "update-animal-background" src="https://images.pexels.com/photos/2606532/pexels-photo-2606532.jpeg?cs=srgb&dl=pexels-tomfisk-2606532.jpg&fm=jpg" alt="background" />
            <h2 className="update-title">Update Animal</h2>
            <form className="update-form" onSubmit={handleSubmit}>
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
                type="url"
                name="animalImageUrl"
                value={animalImageUrl}
                placeholder="Animal Image URL"
                onChange={(e) => setAnimalImageUrl(e.target.value)}
                />
            </label>

            <div className="form-filter-update">
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
              <option value="Central America">Central America</option>
              <option value="South America">South America</option>
              <option value="Africa">Africa</option>
              <option value="Asia">Asia</option>
              <option value="Australia">Australia</option>
              <option value="Europe">Europe</option>
              <option value="Antarctica">Antarctica</option>
            </select>
          </div>

            <button type="submit">Update Animal</button>
            </form>

            </div>
            <ToastContainer position="bottom-left" autoClose={1800} hideProgressBar={false}> Animal Updated! </ToastContainer> 
            </> 
        );
    }

