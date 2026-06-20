import {
  createContext,
  useContext,
  useState,
} from "react";

interface SidebarContextType {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const SidebarContext =
  createContext<SidebarContextType | null>(
    null
  );

export function SidebarProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] =
    useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <SidebarContext.Provider
      value={{
        isOpen,
        toggleSidebar,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  const context =
    useContext(SidebarContext);

  if (!context) {
    throw new Error(
      "useSidebar must be used inside SidebarProvider"
    );
  }

  return context;
}