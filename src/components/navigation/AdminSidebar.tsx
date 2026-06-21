import { Link } from "react-router-dom";

export default function AdminSidebar() {
  return (
    <aside className="w-64 bg-slate-900 text-white min-h-screen">
      <div className="p-6 text-2xl font-bold border-b border-slate-700">
        Admin Panel
      </div>

      <nav className="p-4">
        <ul className="space-y-2">
          <li>
            <Link
              to="/admin/dashboard"
              className="block px-4 py-2 rounded hover:bg-slate-700"
            >
              Dashboard
            </Link>
          </li>

          <li>
            <Link
              to="/admin/subjects"
              className="block px-4 py-2 rounded hover:bg-slate-700"
            >
              Subjects
            </Link>
          </li>

          <li>
            <Link
              to="/admin/classes"
              className="block px-4 py-2 rounded hover:bg-slate-700"
            >
              Classes
            </Link>
          </li>

          <li>
            <Link
              to="/admin/quizzes"
              className="block px-4 py-2 rounded hover:bg-slate-700"
            >
              Quizzes
            </Link>
          </li>

          <li>
            <Link
              to="/admin/announcements"
              className="block px-4 py-2 rounded hover:bg-slate-700"
            >
              Announcements
            </Link>
          </li>
          <li>
            <Link
              to="/admin/payments"
              className="block px-4 py-2 rounded hover:bg-slate-700"
            >
              Payments
            </Link>
          </li>
          <li>
            <Link
              to="/admin/users"
              className="block px-4 py-2 rounded hover:bg-slate-700"
            >
              Users
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}