import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

const PilotPerStarship = ({ pilot, index }) => {
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({}); // Permet de stocker la data

  // Lors du chargement du composant, permet de récupérer la data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://swapi.dev/api/people/${pilot.slice(28)}`
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [pilot]);

  // Permet de récupérer l'id du pilote et de rediriger l'utilisateur
  const handleOnClick = () => {
    const id = data.url.slice(28);
    history.push(`/character/${id}`);
  };

  return (
    <div>
      {isLoading ? (
        <div>En cours de chargement ...</div>
      ) : (
        <div className="pointer" onClick={handleOnClick}>
          {index + 1}&nbsp;{data.name}
        </div>
      )}
    </div>
  );
};

export default PilotPerStarship;
