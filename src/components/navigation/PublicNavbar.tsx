import { Link } from "react-router-dom";

export default function PublicNavbar() {
  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <h1 className="font-bold text-xl text-blue-600">
          LearnHub
        </h1>

        <div className="flex gap-4">
          <Link
            to="/"
            className="hover:text-blue-600"
          >
            Home
          </Link>

          <Link
            to="/login"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
}