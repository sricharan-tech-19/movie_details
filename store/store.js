import { configureStore } from '@reduxjs/toolkit';
import favoritesReducer from './favoritesSlice';

export const store = configureStore({
  reducer: { favorites: favoritesReducer }
});

store.subscribe(() => {
  try {
    const s = store.getState();
    localStorage.setItem('movie_explorer_favs_v2', JSON.stringify(s.favorites.list));
  } catch(e) {}
});
