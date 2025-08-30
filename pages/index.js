import NavBar from '../components/NavBar';
import MovieCard from '../components/MovieCard';
import MovieDetailsModal from '../components/MovieDetailsModal';
import predefined from '../utils/predefinedMovies';
import { fetchTrending, fetchMovieCredits } from '../utils/tmdb';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addFavorite, removeFavorite } from '../store/favoritesSlice';

export default function Home({ trending }){
  const [selected, setSelected] = useState(null);
  const [credits, setCredits] = useState(null);
  const dispatch = useDispatch();
  const favs = useSelector(s=>s.favorites.list || []);

  const openDetails = async (m) => {
    setSelected(m);
    if (!m.cast) {
      try {
        const c = await fetchMovieCredits(m.id);
        setCredits(c);
      } catch(e){ setCredits(null); }
    } else setCredits(null);
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
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-3">🎬 Featured Movies</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {predefined.map(m=>(
              <MovieCard key={m.id} movie={m} onDetails={openDetails} onToggleFav={toggleFav} isFav={isFav(m.id)} />
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-3">🔥 Trending This Week</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {trending.results.map(m=>(
              <MovieCard key={m.id} movie={m} onDetails={openDetails} onToggleFav={toggleFav} isFav={isFav(m.id)} />
            ))}
          </div>
        </section>
      </main>

      <MovieDetailsModal movie={selected} credits={credits} onClose={()=>setSelected(null)} onToggleFav={toggleFav} isFav={isFav(selected?.id)} />
    </div>
  );
}

export async function getServerSideProps(){
  const t = await fetchTrending();
  return { props: { trending: t } };
}
