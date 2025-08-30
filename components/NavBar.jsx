import Link from 'next/link';

export default function NavBar() {
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex items-center justify-between p-4">
        <Link href="/" legacyBehavior>
          <a className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition">Movie Explorer</a>
        </Link>
        <div className="flex items-center gap-6">
          <Link href="/" legacyBehavior>
            <a className="text-gray-700 hover:text-blue-600 transition">Home</a>
          </Link>
          <Link href="/search" legacyBehavior>
            <a className="text-gray-700 hover:text-blue-600 transition">Search</a>
          </Link>
          <Link href="/favorites" legacyBehavior>
            <a className="text-gray-700 hover:text-blue-600 transition">Favorites</a>
          </Link>
        </div>
      </div>
    </nav>
  );
}
