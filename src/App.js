import { useEffect, useState } from "react";

import "./App.css";
import searchIcon from "./search.svg";

import MovieCard from "./MovieCard";

const API_URL = "http://www.omdbapi.com?apikey=57c4316";

const movie1 = {
  Title: "Pulp Fiction",
  Year: "1994",
  imdbID: "tt0110912",
  Type: "movie",
  Poster:
    "https://m.media-amazon.com/images/M/MV5BNGNhMDIzZTUtNTBlZi00MTRlLWFjM2ItYzViMjE3YzI5MjljXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg",
};

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  //API FETCH
  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);

    const data = await response.json();
    setMovies(data.Search);
  };

  //Usage of hook (useEffect), executes when the page is loaded
  useEffect(() => {
    searchMovies("Superman");
  }, []);

  return (
    <div className="app">
      <h1>MovieLand</h1>

      <div className="search">
        <input
          placeholder="Search for any movie"
          value= {searchTerm}
          onChange={(e) => {setSearchTerm(e.target.value)}}
        />

        <img src={searchIcon}
         alt="search"
         onClick={() => {searchMovies(searchTerm)}} />
      </div>

      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard movie={movie} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No movies found</h2>
        </div>
      )}
    </div>
  );
};

export default App;
