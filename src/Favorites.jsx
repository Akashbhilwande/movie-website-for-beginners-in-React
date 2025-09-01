import React, { useState, useEffect } from "react";
import "./HomePage.css"; // reuse the same styles
import { Link } from "react-router-dom";

export default function Favorites() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [favorites, setFavorites] = useState([]);

  // Load favorites from localStorage
  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(savedFavorites);
  }, []);

  const removeFavorite = (movie) => {
    const updated = favorites.filter((fav) => fav.imdbID !== movie.imdbID);
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

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

      {/* Overlay */}
      {sidebarOpen && (
        <div className="overlay" onClick={() => setSidebarOpen(false)}></div>
      )}

      {/* Main Content */}
      <main className="content">
        <h1 className="favorites-heading">💖 Favorite Movies</h1>

        {favorites.length === 0 ? (
          <p className="no-favorites">No favorite movies yet!</p>
        ) : (
          <div className="movies-grid">
            {favorites.map((movie) => (
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

                {/* Remove button stays outside the Link */}
                <button
                  className="favorite-btn favorited"
                  onClick={() => removeFavorite(movie)}
                >
                  ❌ Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
