import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Search from "../components/Search";
import Pagination from "../components/Pagination";

const Characters = ({ refresh, search, setSearch, page, setPage }) => {
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({}); // Permet de stocker la data

  // Lors du chargement de la page, permet de récupérer la data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://swapi.dev/api/people/?page=${page}`
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [refresh, page]);

  // Change en temps réel la data en fonction de la recherche utilisateur
  const handleSubmit = async (event) => {
    try {
      const response = await axios.get(
        `https://swapi.dev/api/people/?search=${search}`
      );
      setData(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      {isLoading ? (
        <div>En cours de chargement ...</div>
      ) : (
        <div>
          <Search
            search={search}
            setSearch={setSearch}
            handleSubmit={handleSubmit}
          />
          {/* Se déplacer d'une page à une autre */}
          {!search && <Pagination page={page} setPage={setPage} data={data} />}
          {/* Afficher la liste des personnages */}
          {data.results.map((character, index) => {
            const handleOnClick = () => {
              const id = character.url.slice(28);
              history.push(`/character/${id}`);
            };
            return (
              <div key={index} className="pointer" onClick={handleOnClick}>
                {character.name}
              </div>
            );
          })}
          {!search && <Pagination page={page} setPage={setPage} data={data} />}
        </div>
      )}
    </div>
  );
};

export default Characters;
