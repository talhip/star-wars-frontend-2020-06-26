import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import StarshipPerCharacter from "../components/StarshipPerCharacter";

// Afficher les dates avec une syntaxe lisible pour l'utilisateur
const formatDate = (date) => {
  return moment(date).format("DD/MM/YYYY à HH:mm");
};

const Character = () => {
  const { id } = useParams(); // Récupérer l'id du personnage
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({}); // Permet de stocker la data

  // Lors du chargement de la page, permet de récupérer la data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`//swapi.dev/api/people/${id}`);
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
            <span>Nom :&nbsp;</span>
            <span>{data.name}</span>
          </div>
          <div>
            <span>Couleur des yeux :&nbsp;</span>
            <span>{data.eye_color}</span>
          </div>
          <div>
            <span>Date de naissance :&nbsp;</span>
            <span>{data.birth_year}</span>
          </div>
          <div>
            <span>Genre :&nbsp;</span>
            <span>{data.gender}</span>
          </div>
          {/* Affiche les vaisseaux spatiaux */}
          {data.starships.length !== 0 && (
            <div>Vaisseaux spatiaux pilotés :&nbsp;</div>
          )}
          {/* Composant pour récupérer les noms des vaisseaux spatiaux */}
          {data.starships.length !== 0 &&
            data.starships.map((starship, index) => {
              return (
                <StarshipPerCharacter
                  key={index}
                  starship={starship}
                  index={index}
                />
              );
            })}
          <div>
            <span>Créé le&nbsp;</span>
            <span>{formatDate(data.created)}</span>
          </div>
          <div>
            <span>Modifié le&nbsp;</span>
            <span>{formatDate(data.edited)}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Character;
