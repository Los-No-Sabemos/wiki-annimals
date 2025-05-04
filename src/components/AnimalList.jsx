import axios from "axios";
import { useEffect, useState } from "react";

export default function AnimalList() {
    const [animals, setAnimals] = useState([]);

    const API_URL =
        'https://animal-wiki-47b79-default-rtdb.europe-west1.firebasedatabase.app/animals.json';

    useEffect(() => {
        axios
            .get(API_URL)
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
                <div key={animal.id}>{animal.name}</div>
            ))}
        </>
    );
}