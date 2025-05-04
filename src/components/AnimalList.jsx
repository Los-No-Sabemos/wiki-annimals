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
        <div className="animal-card-grid">
        {animals.map((animal) => (
          <div className="animal-card" key={animal.id}>
            <img src={animal.image_Url} alt={animal.name} className="animal-image" />
            <div className="animal-card-body">
              <h2>{animal.name}</h2>
              <p>Description: {animal.description}</p>
              <p>Habitat {animal.habitat}</p>
              <p>Diet: {animal.diet}</p>
              <p>Region: {animal.region}</p>
              <p className="animal-fact"><strong>Fun Fact:</strong> {animal.fact}</p>
            </div>
          </div>
        ))}
      </div>
    );
}