// src/api.js
import axios from "axios";

const API_KEY = "2dca580c2a14b55200e784d157207b4d";
const BASE_URL = "https://api.themoviedb.org/3";

export const fetchMovies = (year) => {
  return axios.get(`${BASE_URL}/discover/movie`, {
    params: {
      api_key: API_KEY,
      sort_by: "popularity.desc",
      primary_release_year: year,
      vote_count_gte: 100,
    },
  });
};

export const fetchGenres = () => {
  return axios.get(`${BASE_URL}/genre/movie/list`, {
    params: {
      api_key: API_KEY,
    },
  });
};
