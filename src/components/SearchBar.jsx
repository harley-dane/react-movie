import { useState } from 'react';
import axios from 'axios';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  // Handle input change
  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  // Handle search (for both button click and Enter key)
  const handleSearch = async () => {
    if (!query.trim()) return; // Prevent empty searches
    try {
      const response = await axios.get(
        'https://api.themoviedb.org/3/search/movie',
        {
          params: {
            api_key: import.meta.env.VITE_TMDB_API_KEY,
            language: 'en-US',
            query: query,
            page: 1,
          },
        }
      );
      // Pass the search results to the parent component
      onSearch(response.data.results.slice(0, 6)); // Limit to 6 movies
      setQuery(''); // Clear input after search
    } catch (error) {
      console.error('Error searching movies:', error);
    }
  };

  // Handle Enter key press
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown} // Add Enter key handler
        placeholder="Search for a movie..."
        className="search-input"
      />
      <button onClick={handleSearch} className="search-button">
        Search
      </button>
    </div>
  );
};

export default SearchBar;