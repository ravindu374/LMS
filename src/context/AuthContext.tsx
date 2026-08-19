import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

interface User {
  id: number;
  name: string;
  role: string;
  is_paid: boolean;
}

interface AuthContextType {
  user: User | null;
  login: (token: string, user: User) => void;
  logout: () => void;
}

const AuthContext =
  createContext<AuthContextType | null>(null);

/**
 * Read the stored user synchronously so the very first render already knows
 * who is logged in. Reading it in a useEffect instead meant every data hook
 * saw `user === null` on mount, skipped its fetch, and only started loading
 * after a second render - an extra round trip on top of the API latency.
 */
function readStoredUser(): User | null {
  try {
    const stored = localStorage.getItem("user");

    return stored ? (JSON.parse(stored) as User) : null;
  } catch {
    // Corrupt JSON or storage disabled - treat as logged out.
    return null;
  }
}

export function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] =
    useState<User | null>(readStoredUser);

  const login = useCallback(
    (token: string, nextUser: User) => {
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(nextUser));

      setUser(nextUser);
    },
    []
  );

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setUser(null);
  }, []);

  // Without this the provider hands down a brand new object on every render,
  // re-rendering every consumer (sidebar, navbar, all pages) for nothing.
  const value = useMemo(
    () => ({ user, login, logout }),
    [user, login, logout]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
}
