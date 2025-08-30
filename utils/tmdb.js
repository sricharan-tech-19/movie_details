import axios from "axios";

export const TMDB_BASE = "https://api.themoviedb.org/3";
export const IMG_BASE = "https://image.tmdb.org/t/p/w500";
const TMDB_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

if (!TMDB_KEY) throw new Error("TMDB_KEY not found in env variables!");

export async function fetchTrending(page = 1) {
  try {
    const res = await axios.get(`${TMDB_BASE}/trending/movie/week`, {
      params: { api_key: TMDB_KEY, page },
    });
    return res.data;
  } catch (err) {
    console.error("fetchTrending error:", err.response?.data || err.message);
    throw err;
  }
}

export async function searchMovies(query, page = 1) {
  try {
    const res = await axios.get(`${TMDB_BASE}/search/movie`, {
      params: { api_key: TMDB_KEY, query, page },
    });
    return res.data;
  } catch (err) {
    console.error("searchMovies error:", err.response?.data || err.message);
    throw err;
  }
}

export async function fetchMovieDetails(id) {
  try {
    const res = await axios.get(`${TMDB_BASE}/movie/${id}`, {
      params: { api_key: TMDB_KEY },
    });
    return res.data;
  } catch (err) {
    console.error("fetchMovieDetails error:", err.response?.data || err.message);
    throw err;
  }
}

export async function fetchMovieCredits(id) {
  try {
    const res = await axios.get(`${TMDB_BASE}/movie/${id}/credits`, {
      params: { api_key: TMDB_KEY },
    });
    return res.data;
  } catch (err) {
    console.error("fetchMovieCredits error:", err.response?.data || err.message);
    throw err;
  }
}
