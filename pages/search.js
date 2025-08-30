import NavBar from '../components/NavBar';
import SearchBar from '../components/SearchBar';
import MovieCard from '../components/MovieCard';
import MovieDetailsModal from '../components/MovieDetailsModal';
import { searchMovies, fetchMovieCredits } from '../utils/tmdb';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addFavorite, removeFavorite } from '../store/favoritesSlice';

export default function SearchPage(){
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [selected, setSelected] = useState(null);
  const [credits, setCredits] = useState(null);
  const favs = useSelector(s=>s.favorites.list || []);
  const dispatch = useDispatch();

  const onSearch = async (e) => {
    e && e.preventDefault();
    if (!query.trim()) return;
    const r = await searchMovies(query.trim());
    setResults(r.results || []);
  };

  const openDetails = async (m) => {
    setSelected(m);
    try {
      const c = await fetchMovieCredits(m.id);
      setCredits(c);
    } catch(e){ setCredits(null); }
  };

  const toggleFav = (m) => {
    const exists = favs.find(x=>x.id===m.id);
    if (exists) dispatch(removeFavorite(m.id));
    else dispatch(addFavorite(m));
  };

  const isFav = (id) => favs.some(x=>x.id===id);

  return (
    <div>
      <NavBar />
      <main className="max-w-6xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Search</h1>
        <SearchBar query={query} setQuery={setQuery} onSearch={onSearch} />
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {results.map(m=> <MovieCard key={m.id} movie={m} onDetails={openDetails} onToggleFav={toggleFav} isFav={isFav(m.id)} />)}
        </div>
      </main>
      <MovieDetailsModal movie={selected} credits={credits} onClose={()=>setSelected(null)} onToggleFav={toggleFav} isFav={isFav(selected?.id)} />
    </div>
  );
}
