import type { ReactNode } from "react";
import {
  Moon,
  Sun,
  LogOut,
  Menu,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import { useTheme } from "../hooks/useTheme";
import { useAuth } from "../context/AuthContext";
import { useSidebar } from "../context/SidebarContext";

import AdminSidebar from "../components/navigation/AdminSidebar";

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({
  children,
}: AdminLayoutProps) {

  const {
    darkMode,
    toggleTheme,
  } = useTheme();

  const {
    logout,
  } = useAuth();

  // AdminSidebar previously had no mobile toggle at all - it was a static
  // 256px panel with nothing to collapse it, cramming admin pages on phones.
  const { isOpen, toggleSidebar, closeSidebar } = useSidebar();

  const navigate =
    useNavigate();

  const handleLogout = () => {

    logout();

    navigate("/login");

  };

  return (

    <div
      className="
        flex
        min-h-screen
        bg-slate-100
        dark:bg-slate-950
        transition-colors
      "
    >

      <AdminSidebar />

      {isOpen && (
        <div
          onClick={closeSidebar}
          aria-hidden="true"
          className="
            fixed
            inset-0
            bg-black/40
            md:hidden
            z-40
          "
        />
      )}

      <div className="flex-1 flex flex-col min-w-0">

        <header
          className="
            sticky
            top-0
            z-30
            bg-white/80
            dark:bg-slate-900/80
            backdrop-blur-md
            border-b
            border-slate-200
            dark:border-slate-700
            px-4
            md:px-8
            py-5
          "
        >

          <div className="flex items-center justify-between gap-4">

            <div className="flex items-center gap-3 min-w-0">

              <button
                onClick={toggleSidebar}
                aria-label="Toggle menu"
                className="
                  md:hidden
                  shrink-0
                  w-11
                  h-11
                  rounded-xl
                  border
                  border-slate-200
                  dark:border-slate-700
                  bg-white
                  dark:bg-slate-800
                  hover:bg-slate-100
                  dark:hover:bg-slate-700
                  flex
                  items-center
                  justify-center
                  transition
                "
              >
                <Menu size={20} />
              </button>

              <div className="min-w-0">

                <h1
                  className="
                    text-xl
                    md:text-2xl
                    font-bold
                    text-slate-800
                    dark:text-white
                    truncate
                  "
                >
                  Admin Dashboard
                </h1>

                <p
                  className="
                    mt-1
                    text-sm
                    text-slate-500
                    dark:text-slate-400
                    hidden
                    sm:block
                  "
                >
                  Manage users, subjects and platform resources.
                </p>

              </div>

            </div>

            <div className="flex items-center gap-3 shrink-0">

              <button
                onClick={toggleTheme}
                aria-label={
                  darkMode ? "Switch to light mode" : "Switch to dark mode"
                }
                className="
                  w-11
                  h-11
                  rounded-xl
                  border
                  border-slate-200
                  dark:border-slate-700
                  bg-white
                  dark:bg-slate-800
                  hover:bg-slate-100
                  dark:hover:bg-slate-700
                  flex
                  items-center
                  justify-center
                  transition
                "
              >
                {darkMode ? (
                  <Sun size={20} />
                ) : (
                  <Moon size={20} />
                )}
              </button>

              <button
                onClick={handleLogout}
                className="
                  flex
                  items-center
                  gap-2
                  rounded-xl
                  bg-red-600
                  hover:bg-red-700
                  text-white
                  px-3.5
                  md:px-5
                  py-2.5
                  font-medium
                  transition
                "
              >
                <LogOut size={18} />

                <span className="hidden sm:inline">Logout</span>

              </button>

            </div>

          </div>

        </header>

        <main className="flex-1 p-4 md:p-8">

          {children}

        </main>

      </div>

    </div>

  );

}