import React from "react";

const MovieCard = ({ movie, genres }) => {
  const movieGenres = movie.genre_ids
    .map((id) => {
      const genre = genres.find((g) => g.id === id);
      return genre ? genre.name : "";
    })
    .join(", ");

  return (
    <div className="movie-card">
      <img
        src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
        alt={movie.title}
      />
      <h2>{movie.title}</h2>
      <p>Rating: {movie.vote_average.toFixed(1)}</p>
      <p>Genres: {movieGenres}</p>
      <p>{movie.overview}</p>
    </div>
  );
};

export default MovieCard;
