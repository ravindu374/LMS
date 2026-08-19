import { NavLink } from "react-router-dom";

import { prefetchRoute } from "../../routes/prefetch";
import { useSidebar } from "../../context/SidebarContext";

const links = [
  { to: "/admin/dashboard", label: "Dashboard" },
  { to: "/admin/subjects", label: "Subjects" },
  { to: "/admin/classes", label: "Classes" },
  { to: "/admin/quizzes", label: "Quizzes" },
  { to: "/admin/announcements", label: "Announcements" },
  { to: "/admin/payments", label: "Payments" },
  { to: "/admin/users", label: "Users" },
];

export default function AdminSidebar() {
  // Was a static `w-64` block with no responsive behavior at all, unlike
  // the student Sidebar - on a phone it just sat next to the page content
  // and squeezed it into a sliver. Now it follows the same off-canvas
  // drawer pattern as the student side, sharing the same SidebarContext.
  const { isOpen, closeSidebar } = useSidebar();

  return (
    <aside
      className={`
        fixed
        md:static
        z-50
        w-64
        min-h-screen
        bg-slate-900
        text-white
        transition-transform
        duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
      `}
    >
      <div className="p-6 text-2xl font-bold border-b border-slate-700">
        Admin Panel
      </div>

      <nav className="p-4">
        <ul className="space-y-2">
          {links.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                // Start fetching the route chunk before the click lands.
                onMouseEnter={() => prefetchRoute(link.to)}
                onFocus={() => prefetchRoute(link.to)}
                onTouchStart={() => prefetchRoute(link.to)}
                onClick={closeSidebar}
                className={({ isActive }) =>
                  `block px-4 py-2 rounded transition-colors ${
                    isActive ? "bg-blue-600" : "hover:bg-slate-700"
                  }`
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
