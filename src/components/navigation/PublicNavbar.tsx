import { Link } from "react-router-dom";

export default function PublicNavbar() {
  return (
    <nav
      className="
        sticky
        top-0
        z-30
        bg-white/90
        dark:bg-slate-900/90
        backdrop-blur-md
        border-b
        border-slate-200
        dark:border-slate-700
      "
    >
      <div
        className="
          max-w-7xl
          mx-auto
          h-18
          px-8
          flex
          items-center
          justify-between
        "
      >
        <div>

          <h1 className="text-2xl font-bold text-blue-600">
            LearnHub
          </h1>

          <p className="text-xs text-slate-500 dark:text-slate-400">
            Learning Management System
          </p>

        </div>

        <div className="flex items-center gap-6">

          <Link
            to="/"
            className="
              text-slate-700
              dark:text-slate-300
              hover:text-blue-600
              dark:hover:text-blue-400
              transition
            "
          >
            Home
          </Link>

          <Link
            to="/login"
            className="
              bg-blue-600
              hover:bg-blue-700
              text-white
              px-5
              py-2.5
              rounded-xl
              shadow-sm
              transition
            "
          >
            Login
          </Link>

        </div>

      </div>
    </nav>
  );
}