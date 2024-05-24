import React, { useState, useEffect } from "react";
import GenreFilter from "./components/GenreFilter";
import MovieList from "./components/MovieList";
import axios from "axios";
import "./App.css";

const API_KEY = "2dca580c2a14b55200e784d157207b4d";

const App = () => {
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`
        );
        setGenres(response.data.genres);
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    };

    fetchGenres();
  }, []);

  return (
    <div className="App">
      <header>
        <h1>MovieFix</h1>
        <GenreFilter
          selectedGenres={selectedGenres}
          setSelectedGenres={setSelectedGenres}
        />
      </header>
      <MovieList selectedGenres={selectedGenres} genres={genres} />
    </div>
  );
};

export default App;
