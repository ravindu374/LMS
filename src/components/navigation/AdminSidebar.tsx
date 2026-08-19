import { Link } from "react-router-dom";

import { prefetchRoute } from "../../routes/prefetch";

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
  return (
    <aside className="w-64 bg-slate-900 text-white min-h-screen">
      <div className="p-6 text-2xl font-bold border-b border-slate-700">
        Admin Panel
      </div>

      <nav className="p-4">
        <ul className="space-y-2">
          {links.map((link) => (
            <li key={link.to}>
              <Link
                to={link.to}
                // Start fetching the route chunk before the click lands.
                onMouseEnter={() => prefetchRoute(link.to)}
                onFocus={() => prefetchRoute(link.to)}
                onTouchStart={() => prefetchRoute(link.to)}
                className="block px-4 py-2 rounded hover:bg-slate-700"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
