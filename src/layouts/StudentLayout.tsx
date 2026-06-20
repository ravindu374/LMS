import { ReactNode } from "react";

import Navbar from "../components/navigation/Navbar";
import Sidebar from "../components/navigation/Sidebar";

import { useSidebar } from "../context/SidebarContext";

interface StudentLayoutProps {
  children: ReactNode;
}

export default function StudentLayout({
  children,
}: StudentLayoutProps) {

  const { isOpen } = useSidebar();

  return (
    <div className="flex bg-gray-100 dark:bg-slate-950 dark:text-white min-h-screen">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Navbar />

        {isOpen && (
          <div
            className="
              fixed
              inset-0
              bg-black/40
              md:hidden
              z-40
            "
          />
        )}

        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
}