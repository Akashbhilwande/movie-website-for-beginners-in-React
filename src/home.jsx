import React, { useState, useEffect } from "react";
import "./HomePage.css";
import { Link } from "react-router-dom";

const API_KEY = process.env.REACT_APP_OMDB_API_KEY;

export default function HomePage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // pagination state
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  // filters
  const [type, setType] = useState(""); // "movie", "series", "episode"
  const [year, setYear] = useState(""); // e.g. 2023

  const searchMovies = async (newPage = 1) => {
    if (!query) return;
    setLoading(true);
    setError("");

    try {
      let url = `https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}&page=${newPage}`;
      if (type) url += `&type=${type}`;
      if (year) url += `&y=${year}`;

      const res = await fetch(url);
      const data = await res.json();

      if (data.Response === "True") {
        setMovies(data.Search);
        setTotalResults(parseInt(data.totalResults, 10));
        setPage(newPage);
      } else {
        setError(data.Error || "No movies found");
        setMovies([]);
      }
    } catch {
      setError("Network error. Try again!");
    } finally {
      setLoading(false);
    }
  };

  const toggleFavorite = (movie) => {
    setFavorites((prev) => {
      let updated;
      if (prev.find((fav) => fav.imdbID === movie.imdbID)) {
        updated = prev.filter((fav) => fav.imdbID !== movie.imdbID);
      } else {
        updated = [...prev, movie];
      }
      localStorage.setItem("favorites", JSON.stringify(updated));
      return updated;
    });
  };

  useEffect(() => {
    const fetchDefaultMovies = async () => {
      setLoading(true);
      try {
        // Example: Fetch movies from current year
        const currentYear = new Date().getFullYear();
        let url = `https://www.omdbapi.com/?apikey=${API_KEY}&s=movie&y=${currentYear}&page=1`;

        const res = await fetch(url);
        const data = await res.json();

        if (data.Response === "True") {
          setMovies(data.Search);
          setTotalResults(parseInt(data.totalResults, 10));
          setPage(1);
        } else {
          // fallback: show some predefined movies if no results
          let fallbackUrl = `https://www.omdbapi.com/?apikey=${API_KEY}&s=avengers&page=1`;
          const res2 = await fetch(fallbackUrl);
          const data2 = await res2.json();
          if (data2.Response === "True") {
            setMovies(data2.Search);
            setTotalResults(parseInt(data2.totalResults, 10));
            setPage(1);
          }
        }
      } catch (err) {
        setError("Could not load default movies");
      } finally {
        setLoading(false);
      }
    };

    fetchDefaultMovies();
  }, []);

  const isFavorite = (movie) =>
    favorites.some((fav) => fav.imdbID === movie.imdbID);

  // Calculate total pages (OMDb returns 10 results per page)
  const totalPages = Math.ceil(totalResults / 10);

  return (
    <div className="homepage">
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-left">
          <button
            className="hamburger"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            ☰
          </button>
        </div>
        <div className="navbar-center">
          <h1 className="logo">🎬 Movie Explorer</h1>
        </div>
      </nav>

      {/* Sidebar */}
      <div className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/favorites">Favorites ({favorites.length})</Link>
          </li>
        </ul>
      </div>

      {sidebarOpen && (
        <div className="overlay" onClick={() => setSidebarOpen(false)}></div>
      )}

      {/* Main Content */}
      <main className="content">
        {/* Search */}
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search movies..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button onClick={() => searchMovies(1)}>Search</button>
        </div>

        {/* Filters */}
        <div className="filters">
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="">All Types</option>
            <option value="movie">Movies</option>
            <option value="series">Series</option>
            <option value="episode">Episodes</option>
          </select>

          <input
            type="number"
            placeholder="Year"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          />

          <button onClick={() => searchMovies(1)}>Apply Filters</button>
        </div>

        {loading && <div className="loader">Loading...</div>}
        {error && <p className="error">{error}</p>}

        <div className="movies-grid">
          {movies.map((movie) => (
            <div key={movie.imdbID} className="movie-card">
              <Link
                to={`/movie/${movie.imdbID}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <img
                  src={
                    movie.Poster !== "N/A"
                      ? movie.Poster
                      : "https://via.placeholder.com/300x450?text=No+Image"
                  }
                  alt={movie.Title}
                />
                <div className="movie-card-content">
                  <h3>{movie.Title}</h3>
                  <p>{movie.Year}</p>
                </div>
              </Link>

              <button
                className={`favorite-btn ${
                  isFavorite(movie) ? "favorited" : ""
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFavorite(movie);
                }}
              >
                {isFavorite(movie) ? "❤️" : "🤍"} Favorite
              </button>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="pagination">
            <button
              onClick={() => searchMovies(page - 1)}
              disabled={page === 1}
            >
              ⬅ Prev
            </button>
            <span>
              Page {page} of {totalPages}
            </span>
            <button
              onClick={() => searchMovies(page + 1)}
              disabled={page === totalPages}
            >
              Next ➡
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
