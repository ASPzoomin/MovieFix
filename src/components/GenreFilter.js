// src/components/GenreFilter.js
import React, { useEffect, useState } from "react";
import axios from "axios";

const GenreFilter = ({ selectedGenres, setSelectedGenres }) => {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    axios
      .get(
        "https://api.themoviedb.org/3/genre/movie/list?api_key=2dca580c2a14b55200e784d157207b4d"
      )
      .then((response) => {
        setGenres(response.data.genres);
      });
  }, []);

  const toggleGenre = (genreId) => {
    setSelectedGenres((prevGenres) =>
      prevGenres.includes(genreId)
        ? prevGenres.filter((id) => id !== genreId)
        : [...prevGenres, genreId]
    );
  };

  return (
    <div className="genre-filter">
      {genres.map((genre) => (
        <button
          key={genre.id}
          className={selectedGenres.includes(genre.id) ? "selected" : ""}
          onClick={() => toggleGenre(genre.id)}
        >
          {genre.name}
        </button>
      ))}
    </div>
  );
};

export default GenreFilter;
