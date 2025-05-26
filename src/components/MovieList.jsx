import { useState, useEffect } from 'react';
import axios from 'axios';
import MovieCard from './MovieCard';

const MovieList = ({ searchResults }) => {
  const [movies, setMovies] = useState([]);

  // Fetch default popular movies
  const fetchMovies = async () => {
    try {
      const response = await axios.get(
        'https://api.themoviedb.org/3/movie/popular',
        {
          params: {
            api_key: import.meta.env.VITE_API_KEY,
            language: 'en-US',
            page: 1,
          },
        }
      );
      const selectedMovies = response.data.results
        .filter((movie) =>
          movie.title.toLowerCase().includes('fast') ||
          response.data.results.indexOf(movie) < 6
        )
        .slice(0, 6);
      setMovies(selectedMovies);
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  useEffect(() => {
    if (searchResults && searchResults.length > 0) {
      setMovies(searchResults);
    } else {
      fetchMovies();
    }
  }, [searchResults]);

  return (
    <div className="movie-grid">
      {movies.length > 0 ? (
        movies.map((movie) => (
          <MovieCard
            key={movie.id}
            title={movie.title}
            overview={movie.overview}
            poster={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : 'https://via.placeholder.com/500x750?text=No+Poster'
            }
            releaseYear={movie.release_date ? movie.release_date.split('-')[0] : 'N/A'}
          />
        ))
      ) : (
        <p>Loading movies...</p>
      )}
    </div>
  );
};

export default MovieList;