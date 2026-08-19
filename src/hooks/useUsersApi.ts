import { useCallback } from "react";

import {
  getUsers,
  createUser,
  deleteUser,
} from "../services/userApi";

import { invalidate, useApiResource } from "./useApiResource";

const EMPTY: any[] = [];

export function useUsersApi() {
  const {
    data: users,
    loading,
    error,
    refresh,
  } = useApiResource<any[]>("users", getUsers, EMPTY);

  const addUser = useCallback(
    async (
      name: string,
      email: string,
      password: string,
      role: string
    ) => {
      await createUser(name, email, password, role);

      await refresh();
    },
    [refresh]
  );

  const removeUser = useCallback(
    async (id: number) => {
      await deleteUser(id);

      // A deleted user's enrollments and payment rows go with them.
      invalidate("enrollments:");
      invalidate("payments");

      await refresh();
    },
    [refresh]
  );

  return {
    users,
    loading,
    error,
    refresh,
    addUser,
    removeUser,
  };
}
