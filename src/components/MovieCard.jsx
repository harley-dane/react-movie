const MovieCard = ({ title, overview, poster, releaseYear }) => (
  <div className="movie-card">
    <img src={poster} alt={`${title} poster`} className="movie-poster" />
    <h2>{title} ({releaseYear})</h2>
    <p>{overview.length > 100 ? `${overview.substring(0, 100)}...` : overview}</p>
  </div>
);
  
  export default MovieCard;