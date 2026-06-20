import {
  useEffect,
  useState,
} from "react";

import {
  getUsers,
  createUser,
  deleteUser,
} from "../services/userApi";

export function useUsersApi() {

  const [users, setUsers] =
    useState<any[]>([]);

  const loadUsers =
    async () => {
      const data =
        await getUsers();

      setUsers(data);
    };

  useEffect(() => {
    loadUsers();
  }, []);

  const addUser =
    async (
      name: string,
      email: string,
      password: string,
      role: string
    ) => {

      await createUser(
        name,
        email,
        password,
        role
      );

      await loadUsers();
    };

  const removeUser =
    async (id: number) => {

      await deleteUser(id);

      await loadUsers();
    };

  return {
    users,
    addUser,
    removeUser,
  };
}