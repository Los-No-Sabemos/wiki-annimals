import axios from "axios";
import { useEffect, useState } from "react";
import { API_URL } from "../components/config/api";

export default function AnimalList() {
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
                    setAnimals(animalArr);
                } else {
                    setAnimals([]);
                }
            })
            .catch((error) => {
                console.log("No animals were found", error);
            });
    }, []);

    return (
        <>
            {animals.map((animal) => (
                <div key={animal.id}>
                    
                    <p>{animal.name}</p>
                    <p>{animal.description}</p>
                    <img src={animal.image_Url} alt="animal pic" />


                    
                    </div>
            ))}
        </>
    );
}