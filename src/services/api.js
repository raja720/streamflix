const API_KEY = import.meta.env.VITE_OMDB_API_KEY;
const BASE_URL = "https://www.omdbapi.com/";
const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const TMDB_IMAGE_URL = "https://image.tmdb.org/t/p/w1280";

export const searchMovies = async (query, page = 1) => {
  const response = await fetch(`${BASE_URL}?apikey=${API_KEY}&s=${query}&page=${page}`);
  const data = await response.json();
  return data;
};

export const getMovieById = async (id) => {
  const response = await fetch(`${BASE_URL}?apikey=${API_KEY}&i=${id}`);
  const data = await response.json();
  return data;
};
export const getPopularMovies = async (page = 1) => {
  const response = await fetch(`${TMDB_BASE_URL}/movie/popular?api_key=${TMDB_API_KEY}&page=${page}`);
  const data = await response.json();
  return data;
};
export const getTrendingMovies = async () => {
  const response = await fetch(`${TMDB_BASE_URL}/trending/movie/week?api_key=${TMDB_API_KEY}`);
  const data = await response.json();
  return data.results.slice(0, 5).map(movie => ({
    ...movie,
    Poster: `${TMDB_IMAGE_URL}${movie.backdrop_path}`,
    Title: movie.title,
    Plot: movie.overview,
    imdbRating: movie.vote_average.toFixed(1),
    Year: movie.release_date?.split('-')[0],
    Genre: ''
  }));
};
