import { useState, useEffect } from 'react';
import { IMG_BASE } from '../utils/tmdb';

export default function MovieCard({ movie, onDetails, onToggleFav, isFav }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const img = movie.poster_path ? (IMG_BASE + movie.poster_path) : (movie.poster || '/no-image.png');

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition cursor-pointer">
      <img
        src={img}
        alt={movie.title}
        className="w-full h-64 object-cover"
        onClick={() => onDetails && onDetails(movie)}
      />
      <div className="p-4">
        <h3 className="font-bold text-lg truncate">{movie.title}</h3>
        <p className="text-sm text-gray-500 mt-1">{movie.release_date?.slice(0, 4) || movie.release_date}</p>
        <div className="flex items-center justify-between mt-2">
          <span className="text-yellow-500 font-semibold">{movie.vote_average || movie.rating}</span>
          {mounted && (
            <button
              className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              onClick={() => onToggleFav && onToggleFav(movie)}
            >
              {isFav ? 'Remove' : 'Favorite'}
            </button>
          )}
        </div>
        <button
          className="mt-3 w-full py-1 border rounded text-gray-700 hover:bg-gray-100 transition"
          onClick={() => onDetails && onDetails(movie)}
        >
          Details
        </button>
      </div>
    </div>
  );
}
