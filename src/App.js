import './App.css';
import SeachIcon from './search.svg';
import MovieCard from './MovieCard';
import { useState, useEffect } from "react";


const API_URL = 'http://www.omdbapi.com?apikey=4cb2e582';

const App = () => {
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const searchMovies = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();
        setMovies(data.Search);
    }

    useEffect(() => {
        searchMovies('Spiderman');
    }, [])

    return (
        <div className="app">
            <h1>MovieBuzz</h1>

            <div className="search">
                <input
                    placeholder='Search for movies'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyPress={(e) => {
                        if (e.key === "Enter") {
                            setSearchTerm(e.target.value);
                            searchMovies(searchTerm);
                        }
                    }}
                />

                <img src={SeachIcon}
                    alt="search"
                    onClick={() => searchMovies(searchTerm)}
                />
            </div>

            {
                movies?.length > 0
                    ? (
                        <div className="container">
                            {movies.map((movie) => (
                                <MovieCard movie={movie} />
                    ))}
                        </div>
                    ) : (
                        <div className="empty">
                            <h2>No movies found!</h2>
                        </div>
                    )
            }
        </div>
    );
}

export default App;