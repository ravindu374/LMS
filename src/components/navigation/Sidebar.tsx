import { NavLink } from "react-router-dom";

import { useSidebar } from "../../context/SidebarContext";
import { useAuth } from "../../context/AuthContext";

export default function Sidebar() {
  const { isOpen } = useSidebar();
  const { user } = useAuth();
  const menuItems = [
  {
    label: "Dashboard",
    path: "/dashboard",
  },
  {
    label: "Subjects",
    path: "/subjects",
  },
  {
    label: "My Subjects",
    path: "/my-subjects",
  },
  {
    label: "Classes",
    path: "/classes",
  },
  {
    label: "Quizzes",
    path: "/quizzes",
  },
  {
    label: "Announcements",
    path: "/announcements",
  },
];

if (user?.role === "admin") {
  menuItems.push({
    label: "Users",
    path: "/admin/users",
  });
}

  return (
    <aside
  className={`
    fixed md:static
    z-50
    w-64
    min-h-screen
    bg-slate-900
    text-white
    transition-transform
    duration-300
    ${isOpen? "translate-x-0": "-translate-x-full md:translate-x-0"}`}>
      <div className="p-6 text-2xl font-bold">
        LMS
      </div>

      <nav className="p-4">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `block p-3 rounded mb-2 ${
                isActive
                  ? "bg-blue-600"
                  : "hover:bg-slate-700"
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}