import { Link } from "react-router-dom";
import { Home } from "lucide-react";

/**
 * AppRoutes previously had no catch-all - an unmatched path (typo, stale
 * bookmark, a deep link to a page that moved) rendered nothing at all
 * inside <Routes>, i.e. a blank body with the navbar/sidebar chrome missing
 * too since no layout matched. This gives lost users a way back.
 */
export default function NotFound() {
  return (
    <div
      className="
        min-h-screen
        flex
        items-center
        justify-center
        bg-slate-100
        dark:bg-slate-950
        px-6
        text-center
      "
    >
      <div>
        <p className="text-7xl font-bold text-blue-600">404</p>

        <h1 className="mt-4 text-2xl font-bold text-slate-800 dark:text-white">
          Page not found
        </h1>

        <p className="mt-3 text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
          The page you're looking for doesn't exist or may have been moved.
        </p>

        <Link
          to="/"
          className="
            mt-8
            inline-flex
            items-center
            gap-2
            rounded-xl
            bg-blue-600
            hover:bg-blue-700
            text-white
            px-6
            py-3
            font-medium
            transition
          "
        >
          <Home size={18} />
          Back to home
        </Link>
      </div>
    </div>
  );
}
