import { useNavigate } from "react-router-dom";
import { Menu } from "lucide-react";

import { useTheme } from "../../hooks/useTheme";
import { useSidebar } from "../../context/SidebarContext";
import { useAuth } from "../../context/AuthContext";

export default function Navbar() {

  const { toggleSidebar } =
    useSidebar();

  const navigate =
    useNavigate();

  const {
    logout: authLogout,
  } = useAuth();

  const {
    darkMode,
    toggleTheme,
  } = useTheme();

  const handleLogout = () => {
    authLogout();
    navigate("/login");
  };

  return (
    <header className="bg-white dark:bg-slate-900 dark:text-white border-b px-6 py-4 flex items-center justify-between">

      <div className="flex items-center gap-4">

        <button
          onClick={toggleSidebar}
          className="md:hidden"
        >
          <Menu size={24} />
        </button>

        <h1 className="font-bold text-xl">
          Learning Platform
        </h1>

      </div>

      <div className="flex gap-3">

        <button
          onClick={toggleTheme}
          className="px-4 py-2 rounded bg-slate-200 dark:bg-slate-700"
        >
          {darkMode ? "☀️" : "🌙"}
        </button>

        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button>

      </div>

    </header>
  );
}