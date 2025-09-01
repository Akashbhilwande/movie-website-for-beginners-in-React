import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const API_KEY = "your_api_key"; // replace with OMDb API key

const MovieModal = ({ imdbID, onClose }) => {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!imdbID) return;

    const fetchDetails = async () => {
      setLoading(true);
      try {
        const res = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&i=${imdbID}&plot=full`);
        const data = await res.json();
        setMovie(data);
      } catch (err) {
        console.error("Error fetching details:", err);
      }
      setLoading(false);
    };

    fetchDetails();
  }, [imdbID]);

  return (
    <AnimatePresence>
      {imdbID && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-2xl shadow-2xl p-6 max-w-2xl w-full relative overflow-y-auto max-h-[90vh]"
            initial={{ y: "-100vh", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100vh", opacity: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full hover:bg-red-600 transition"
            >
              ✖
            </button>

            {loading ? (
              <div className="flex justify-center items-center h-60">
                <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : (
              movie && (
                <div className="flex flex-col md:flex-row gap-6">
                  <img
                    src={movie.Poster}
                    alt={movie.Title}
                    className="w-40 md:w-56 rounded-xl shadow-md"
                  />
                  <div>
                    <h2 className="text-2xl font-bold mb-2">{movie.Title}</h2>
                    <p className="text-gray-600 mb-1"><b>Year:</b> {movie.Year}</p>
                    <p className="text-gray-600 mb-1"><b>Genre:</b> {movie.Genre}</p>
                    <p className="text-gray-600 mb-1"><b>Director:</b> {movie.Director}</p>
                    <p className="text-gray-600 mb-1"><b>IMDB Rating:</b> ⭐ {movie.imdbRating}</p>
                    <p className="mt-4 text-gray-800">{movie.Plot}</p>
                  </div>
                </div>
              )
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MovieModal;
