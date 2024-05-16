import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Search() {
  const [moviesList, setMoviesList] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/popular?api_key=e49e2b95b409e6167ed696b23e40241c&page=${activePage}`
        );
        setMoviesList(response.data.results);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    if (!searchTerm) {
      fetchMovies();
    }
  }, [activePage, searchTerm]);

  const movieSearch = async (page) => {
    setActivePage(page);
    const fetchMovies = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/popular?api_key=e49e2b95b409e6167ed696b23e40241c&page=${page}`
        );
        setMoviesList(response.data.results);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMovies();
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <>
      <div className="p-4 container my-2" style={{ backgroundColor: 'rgb(224, 222, 222)' }}>
        <div className="row p-3">
          <h1>Welcome to our movie app</h1>
          <p>Millions of movies, Tv shows and people to discover. Explore now.</p>
          <form className="row">
            <div className="col-md-11">
              <input
                type="text"
                className="form-control"
                id="searchInp"
                placeholder="Search and explore"
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
            <div className="col-md-1">
              <button type="button" className="btn btn-warning" onClick={() => movieSearch(1)}>
                Search
              </button>
            </div>
          </form>
        </div>
        {isLoading && <p>Loading movies...</p>}
        {error && <p>Error fetching movies: {error.message}</p>}
      </div>
    </>
  );
}
