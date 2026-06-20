import type { ReactNode } from "react";
import AdminSidebar from "../components/navigation/AdminSidebar";

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({
  children,
}: AdminLayoutProps) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar />

      <div className="flex-1">
        <header className="bg-white border-b px-6 py-4">
          <h1 className="font-bold text-xl">
            Learning Platform Admin
          </h1>
        </header>

        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
}