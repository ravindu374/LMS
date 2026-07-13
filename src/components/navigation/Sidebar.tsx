import { NavLink } from "react-router-dom";

import {
  LayoutDashboard,
  BookOpen,
  GraduationCap,
  Video,
 ClipboardList,
  Bell,
  User,
} from "lucide-react";

import { useSidebar } from "../../context/SidebarContext";
import { useAuth } from "../../context/AuthContext";

export default function Sidebar() {

  const { isOpen } = useSidebar();

  const { user } = useAuth();

  const menuItems = [

    {
      label: "Dashboard",
      path: "/dashboard",
      icon: LayoutDashboard,
    },

    {
      label: "Subjects",
      path: "/subjects",
      icon: BookOpen,
    },

    {
      label: "My Subjects",
      path: "/my-subjects",
      icon: GraduationCap,
    },

    {
      label: "Classes",
      path: "/classes",
      icon: Video,
    },

    {
      label: "Quizzes",
      path: "/quizzes",
      icon: ClipboardList,
    },

    {
      label: "Announcements",
      path: "/announcements",
      icon: Bell,
    },

  ];

  if (user?.role === "admin") {

    menuItems.push({

      label: "Users",

      path: "/admin/users",

      icon: User,

    });

  }

  return (

    <aside
      className={`
        fixed
        md:static
        z-50
        w-72
        min-h-screen
        bg-white
        dark:bg-slate-900
        border-r
        border-slate-200
        dark:border-slate-700
        transition-transform
        duration-300
        ${
          isOpen
            ? "translate-x-0"
            : "-translate-x-full md:translate-x-0"
        }
      `}
    >

      {/* Logo */}

      <div className="px-8 pt-8 pb-6">

        <div
          className="
            w-14
            h-14
            rounded-2xl
            bg-blue-600
            text-white
            flex
            items-center
            justify-center
            text-2xl
            font-bold
            shadow-lg
          "
        >
          L
        </div>

        <h2
          className="
            mt-5
            text-2xl
            font-bold
            text-slate-800
            dark:text-white
          "
        >
          LearnHub
        </h2>

        <p
          className="
            text-sm
            text-slate-500
            dark:text-slate-400
          "
        >
          Learning Management System
        </p>

      </div>

      {/* Navigation */}

      <nav className="px-4">

        {menuItems.map((item) => {

          const Icon = item.icon;

          return (

            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>

                `
                  flex
                  items-center
                  gap-4
                  px-5
                  py-3.5
                  rounded-2xl
                  mb-2
                  transition-all
                  ${
                    isActive

                    ? `
                      bg-blue-600
                      text-white
                      shadow-md
                    `

                    : `
                      text-slate-600
                      dark:text-slate-300
                      hover:bg-slate-100
                      dark:hover:bg-slate-800
                    `
                  }
                `

              }
            >

              <Icon size={20} />

              <span className="font-medium">

                {item.label}

              </span>

            </NavLink>

          );

        })}

      </nav>

      {/* User */}

      <div
        className="
          absolute
          bottom-8
          left-4
          right-4
        "
      >

        <div
          className="
            rounded-2xl
            border
            border-slate-200
            dark:border-slate-700
            bg-slate-50
            dark:bg-slate-800
            p-4
          "
        >

          <p
            className="
              font-semibold
              text-slate-800
              dark:text-white
            "
          >
            {user?.name}
          </p>

          <p
            className="
              text-sm
              text-slate-500
              dark:text-slate-400
              capitalize
            "
          >
            {user?.role}
          </p>

        </div>

      </div>

    </aside>

  );

}