import { useEffect, useState } from "react";

export interface User {
  email: string;
  role: "admin" | "student";
}

const STORAGE_KEY = "currentUser";

export function useAuth() {
  const [user, setUser] =
    useState<User | null>(null);

  useEffect(() => {
    const stored =
      localStorage.getItem(STORAGE_KEY);

    if (stored) {
      setUser(JSON.parse(stored));
    }
  }, []);

  const login = (
    email: string,
    password: string
  ) => {
    if (
      email === "admin@lms.com" &&
      password === "admin123"
    ) {
      const adminUser = {
        email,
        role: "admin" as const,
      };

      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(adminUser)
      );

      setUser(adminUser);

      return adminUser;
    }

    if (
      email === "student@lms.com" &&
      password === "student123"
    ) {
      const studentUser = {
        email,
        role: "student" as const,
      };

      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(studentUser)
      );

      setUser(studentUser);

      return studentUser;
    }

    return null;
  };

  const logout = () => {
    localStorage.removeItem(
      STORAGE_KEY
    );

    setUser(null);
  };

  return {
    user,
    login,
    logout,
  };
}