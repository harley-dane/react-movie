import { useState } from 'react';
import SearchBar from './components/SearchBar';
import MovieList from './components/MovieList';
import './App.css';

const App = () => {
  const [searchResults, setSearchResults] = useState([]);

  return (
    <div className="app">
      <h1>Movie App</h1>
      <SearchBar onSearch={setSearchResults} />
      <MovieList searchResults={searchResults} />
    </div>
  );
};

export default App;