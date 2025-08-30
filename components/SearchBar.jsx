export default function SearchBar({ query, setQuery, onSearch }) {
  return (
    <form onSubmit={onSearch} className="flex flex-col sm:flex-row items-center gap-3">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search movies..."
        className="w-full sm:w-80 px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
      />
      <button
        type="submit"
        className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        Search
      </button>
    </form>
  );
}
