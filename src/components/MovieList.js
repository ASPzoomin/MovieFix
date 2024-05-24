import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import MovieCard from "./MovieCard";

const API_KEY = "2dca580c2a14b55200e784d157207b4d";

const MovieList = ({ selectedGenres, genres }) => {
  const [movies, setMovies] = useState([]);
  const [year, setYear] = useState(2012);
  const [loading, setLoading] = useState(false);
  const listRef = useRef(null);

  useEffect(() => {
    setMovies([]);
    fetchMovies(2012, selectedGenres);
    setYear(2012);
  }, [selectedGenres]);

  const fetchMovies = async (year, genres) => {
    setLoading(true);
    try {
      const genreParam =
        genres.length > 0 ? `&with_genres=${genres.join(",")}` : "";
      const response = await axios.get(
        `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&sort_by=popularity.desc&primary_release_year=${year}&vote_count.gte=100${genreParam}`
      );
      setMovies((prevMovies) => [...prevMovies, ...response.data.results]);
    } catch (error) {
      console.error("Error fetching movies:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleScroll = () => {
    if (loading) return;

    const { scrollTop, scrollHeight, clientHeight } = listRef.current;

    if (scrollTop === 0) {
      const newYear = year - 1;
      setYear(newYear);
      fetchMovies(newYear, selectedGenres);
    } else if (scrollTop + clientHeight >= scrollHeight - 50) {
      const newYear = year + 1;
      setYear(newYear);
      fetchMovies(newYear, selectedGenres);
    }
  };

  useEffect(() => {
    const listElement = listRef.current;
    listElement.addEventListener("scroll", handleScroll);

    return () => {
      listElement.removeEventListener("scroll", handleScroll);
    };
  }, [loading, year, selectedGenres]);

  return (
    <div
      ref={listRef}
      className="movie-list"
      style={{ height: "80vh", overflowY: "auto" }}
    >
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} genres={genres} />
      ))}
      {loading && <p>Loading...</p>}
    </div>
  );
};

export default MovieList;
