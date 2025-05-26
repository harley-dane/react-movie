import axios from 'axios';

const API_URL = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

// Fetch movies based on search query
export const fetchMovies = async (query) => {
    try {
        const { data } = await axios.get(`${API_URL}/search/movie`, {
            params: { api_key: API_KEY, query }
        });
        return data.results.map(movieData => new Movie(movieData));
    } catch (error) {
        console.error('Error fetching movies:', error);
        return [];
    }
};

// Fetch default movie (Blue-themed)
export const fetchDefaultMovie = async () => {
    try {
        const { data } = await axios.get(`${API_URL}/movie/550`, { // Example: Fight Club
            params: { api_key: API_KEY }
        });
        return new Movie(data);
    } catch (error) {
        console.error('Error fetching default movie:', error);
        return null;
    }
};

// Movie Prototype
function Movie(data) {
    this.title = data.title;
    this.poster = `https://image.tmdb.org/t/p/w500${data.poster_path}`;
}

Movie.prototype.getCard = function () {
    return `<div class="movie-card">
                <img src="${this.poster}" alt="${this.title}" />
                <h3>${this.title}</h3>
            </div>`;
};
