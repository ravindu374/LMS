import { useNavigate } from "react-router-dom";
import {
  Menu,
  Sun,
  Moon,
  LogOut,
} from "lucide-react";

import { useTheme } from "../../hooks/useTheme";
import { useSidebar } from "../../context/SidebarContext";
import { useAuth } from "../../context/AuthContext";

export default function Navbar() {
  const { toggleSidebar } = useSidebar();

  const navigate = useNavigate();

  const { logout: authLogout } =
    useAuth();

  const {
    darkMode,
    toggleTheme,
  } = useTheme();

  const handleLogout = () => {
    authLogout();
    navigate("/login");
  };

  return (
    <header
      className="
        sticky
        top-0
        z-30
        flex
        items-center
        justify-between
        px-8
        py-4
        border-b
        border-slate-200
        dark:border-slate-700
        bg-white/90
        dark:bg-slate-900/90
        backdrop-blur-md
      "
    >
      <div className="flex items-center gap-4">

        <button
          onClick={toggleSidebar}
          className="
            md:hidden
            p-2
            rounded-lg
            hover:bg-slate-100
            dark:hover:bg-slate-800
            transition
          "
        >
          <Menu size={22} />
        </button>

        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white">
            LearnHub
          </h1>

          <p className="text-sm text-slate-500 dark:text-slate-400">
            Learning Management System
          </p>
        </div>

      </div>

      <div className="flex items-center gap-3">

        <button
          onClick={toggleTheme}
          className="
            w-11
            h-11
            rounded-xl
            border
            border-slate-200
            dark:border-slate-700
            bg-slate-50
            dark:bg-slate-800
            hover:bg-slate-100
            dark:hover:bg-slate-700
            transition
            flex
            items-center
            justify-center
          "
        >
          {darkMode
            ? <Sun size={20} />
            : <Moon size={20} />}
        </button>

        <button
          onClick={handleLogout}
          className="
            flex
            items-center
            gap-2
            bg-red-500
            hover:bg-red-600
            text-white
            px-5
            py-2.5
            rounded-xl
            transition
          "
        >
          <LogOut size={18} />

          Logout
        </button>

      </div>

    </header>
  );
}