import type { ReactNode } from "react";

import Navbar from "../components/navigation/Navbar";
import Sidebar from "../components/navigation/Sidebar";

import { useSidebar } from "../context/SidebarContext";

interface StudentLayoutProps {
  children: ReactNode;
}

export default function StudentLayout({
  children,
}: StudentLayoutProps) {

  const { isOpen, closeSidebar } = useSidebar();

  return (
    <div className="flex bg-gray-100 dark:bg-slate-950 dark:text-white min-h-screen">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0">
        <Navbar />

        {isOpen && (
          <div
            // Was previously unclickable: on mobile, opening the sidebar
            // and tapping outside it did nothing - the only way out was
            // finding the hamburger button again.
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

        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
