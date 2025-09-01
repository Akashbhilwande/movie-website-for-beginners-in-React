import React from "react";

const MovieCard = ({ movie, onClick }) => {
  return (
    <div
      onClick={() => onClick(movie.imdbID)}
      className="cursor-pointer bg-white rounded-2xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition duration-300"
    >
      <img
        src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/300"}
        alt={movie.Title}
        className="w-full h-64 object-cover rounded-t-2xl"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold">{movie.Title}</h3>
        <p className="text-sm text-gray-500">{movie.Year}</p>
      </div>
    </div>
  );
};

export default MovieCard;
