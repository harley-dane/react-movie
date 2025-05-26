import { useState, useEffect } from 'react';
import axios from 'axios';
import MovieCard from './components/MovieCard';
import SearchBar from './components/SearchBar';
import './App.css';

const App = () => {
  const [movies, setMovies] = useState([]);

  // Fetch default popular movies for initial load
  const fetchMovies = async () => {
    try {
      const response = await axios.get(
        'https://api.themoviedb.org/3/movie/popular',
        {
          params: {
            api_key: import.meta.env.VITE_TMDB_API_KEY,
            language: 'en-US',
            page: 1,
          },
        }
      );
      // Select first 6 movies, prioritizing Fast & Furious titles
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

  // Handle search results
  const handleSearch = (searchResults) => {
    setMovies(searchResults);
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <div className="app">
      <h1>Movie App</h1>
      <SearchBar onSearch={handleSearch} />
      <div className="movie-grid">
        {movies.length > 0 ? (
          movies.map((movie) => (
            <MovieCard
              key={movie.id}
              title={movie.title}
              overview={movie.overview}
              poster={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              releaseYear={movie.release_date ? movie.release_date.split('-')[0] : 'N/A'} // Extract year
            />
          ))
        ) : (
          <p>Loading movies...</p>
        )}
      </div>
    </div>
  );
};

export default App;