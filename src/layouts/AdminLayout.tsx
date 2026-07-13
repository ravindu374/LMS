import type { ReactNode } from "react";
import {
  Moon,
  Sun,
  LogOut,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import { useTheme } from "../hooks/useTheme";
import { useAuth } from "../context/AuthContext";

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

      <div className="flex-1 flex flex-col">

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
            px-8
            py-5
          "
        >

          <div className="flex items-center justify-between">

            <div>

              <h1
                className="
                  text-2xl
                  font-bold
                  text-slate-800
                  dark:text-white
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
                "
              >
                Manage users, subjects and platform resources.
              </p>

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
                  px-5
                  py-2.5
                  font-medium
                  transition
                "
              >
                <LogOut size={18} />

                Logout

              </button>

            </div>

          </div>

        </header>

        <main className="flex-1 p-8">

          {children}

        </main>

      </div>

    </div>

  );

}