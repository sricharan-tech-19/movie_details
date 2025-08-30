import NavBar from '../components/NavBar';
import MovieCard from '../components/MovieCard';
import MovieDetailsModal from '../components/MovieDetailsModal';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { removeFavorite, addFavorite } from '../store/favoritesSlice';

export default function FavoritesPage(){
  const favs = useSelector(s=>s.favorites.list || []);
  const dispatch = useDispatch();
  const [selected, setSelected] = useState(null);

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
        <h1 className="text-2xl font-bold mb-4">Saved Favorites</h1>
        {favs.length===0 ? <div className="small-muted">No favorites yet. Add some from Home or Search.</div> : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {favs.map(m=> <MovieCard key={m.id} movie={m} onDetails={(mm)=>setSelected(mm)} onToggleFav={toggleFav} isFav={isFav(m.id)} />)}
          </div>
        )}
      </main>
      <MovieDetailsModal movie={selected} credits={null} onClose={()=>setSelected(null)} onToggleFav={toggleFav} isFav={isFav(selected?.id)} />
    </div>
  );
}
