import { createSlice } from '@reduxjs/toolkit';

const localKey = 'movie_explorer_favs_v2';
const initialState = { list: [] };

if (typeof window !== 'undefined') {
  try {
    const saved = localStorage.getItem(localKey);
    if (saved) initialState.list = JSON.parse(saved);
  } catch(e){}
}

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavorite: (state, action) => {
      const m = action.payload;
      if (!state.list.find(x => x.id === m.id)) state.list.push(m);
    },
    removeFavorite: (state, action) => {
      state.list = state.list.filter(x => x.id !== action.payload);
    }
  }
});

export const { addFavorite, removeFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
