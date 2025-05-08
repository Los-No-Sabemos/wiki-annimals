import axios from "axios"
import { useNavigate, useParams } from "react-router-dom"
import { API_URL } from "../components/config/api"
import { useEffect, useState } from "react"
import "../styles/AnimalDetails.css"


export default function AnimalDetails() {

    const [animal, setAnimal] = useState([]);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        axios
            .get(`${API_URL}/animals/${id}.json`)
            .then((response) => {
                const animalData = response.data;
                if (animalData) {
                    setAnimal(animalData);
                }
            })
            .catch((error) => {
                console.log("No animals were found", error);
            });
        console.log(setAnimal(id));
    }, [id]);

    const handleDelete = () => {
        const confirmed = window.confirm("Are you sure you want to Delete ? Eliana will be angry ");
        if (!confirmed) return;
        axios
            .delete(`${API_URL}/animals/${id}.json`)
            .then(() => {
                alert("Animal deleted successfully!");
                navigate("/");
            })
            .catch((error) => {
                console.error("Error deleting animal", error);
                alert("Failed to delete animal.");
            });
    };

    const handleUpdate = () => {
        navigate(`/UpdateAnimal/${id}`);
    };


    return (
        <div className="carousel-horizontal">
            <div className="animal-slide" style={{ backgroundImage: `url(${animal.image_Url})` }}>
                <div className="overlay">
                    <h2>{animal.name}</h2>
                    <p>Description: {animal.description}</p>
                    <p>Habitat: {animal.habitat}</p>
                    <p>Diet: {animal.diet}</p>
                    <p>Region: {animal.region}</p>
                    <p className="animal-fact">Fun Fact: {animal.fact}</p>
                    <div className="animal-buttons">
                        <button className="btn update-btn" onClick={handleUpdate}>Update</button>
                        <button className="btn delete-btn" onClick={handleDelete}>Delete</button>
                    </div>
                </div>
            </div>
        </div>
    );
}