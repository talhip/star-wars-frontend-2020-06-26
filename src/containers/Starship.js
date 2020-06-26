import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import PilotPerStarship from "../components/PilotPerStarship";

const Starship = () => {
  const { id } = useParams(); // Récupérer l'id du vaisseau spatial
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({}); // Permet de stocker la data

  // Lors du chargement de la page, permet de récupérer la data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://swapi.dev/api/starships/${id}`
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [id]);

  return (
    <div>
      {isLoading ? (
        <div>En cours de chargement ...</div>
      ) : (
        <div>
          <div>
            <span>Nom du vaisseau :&nbsp;</span>
            <span>{data.name}</span>
          </div>
          <div>
            <span>Modèle :&nbsp;</span>
            <span>{data.model}</span>
          </div>
          <div>
            <span>Fabricant :&nbsp;</span>
            <span>{data.manufacturer}</span>
          </div>
          {/* Affiche les pilotes */}
          {data.pilots.length !== 0 && <div>Pilotes :&nbsp;</div>}
          {/* Composant pour récupérer les noms des pilotes */}
          {data.pilots.length !== 0 &&
            data.pilots.map((pilot, index) => {
              return (
                <PilotPerStarship key={index} pilot={pilot} index={index} />
              );
            })}
        </div>
      )}
    </div>
  );
};

export default Starship;
