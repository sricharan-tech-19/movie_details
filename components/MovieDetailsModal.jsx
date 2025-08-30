import { useState, useEffect } from 'react';
import { IMG_BASE } from '../utils/tmdb';

export default function MovieDetailsModal({ movie, credits, onClose, onToggleFav, isFav }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!movie) return null;

  const img = movie.poster_path
    ? `${IMG_BASE}${movie.poster_path}`
    : movie.poster || '/no-image.png';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(2,6,23,0.5)' }}
    >
      <div className="bg-white rounded-lg max-w-4xl w-full p-4">
        <div className="flex gap-4">
          <img src={img} className="w-44 h-64 object-cover rounded" alt={movie.title} />
          <div className="flex-1">
            <h2 className="text-2xl font-bold">
              {movie.title}{' '}
              <span className="small-muted">({movie.release_date?.slice(0, 4)})</span>
            </h2>
            <p className="small-muted mt-1">Rating: {movie.vote_average || movie.rating}</p>
            <p className="mt-3">{movie.overview}</p>

            <h4 className="mt-4 font-semibold">Top Cast</h4>
            <div className="flex gap-3 mt-2 overflow-auto">
              {(credits?.cast || movie.cast || []).slice(0, 8).map((c, idx) => (
                <div key={idx} className="text-xs w-28">
                  <div className="font-medium">{c.name || c}</div>
                  <div className="small-muted">{c.character || ''}</div>
                </div>
              ))}
            </div>

            <div className="mt-4 flex gap-2">
              {mounted && (
                <button
                  className="px-3 py-1 border rounded"
                  onClick={() => onToggleFav && onToggleFav(movie)}
                >
                  {isFav ? 'Remove from Favorites' : 'Add to Favorites'}
                </button>
              )}
              <button className="px-3 py-1 border rounded" onClick={onClose}>
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
