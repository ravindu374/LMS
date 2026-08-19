import { useCallback } from "react";

import {
  getSubjects,
  createSubject,
  updateSubject,
  deleteSubject,
} from "../services/subjectApi";

import { invalidate, useApiResource } from "./useApiResource";

export interface Subject {
  id: number;
  name: string;
  lecturer: string;
}

const EMPTY: Subject[] = [];

export function useSubjectsApi() {
  const {
    data: subjects,
    loading,
    error,
    refresh,
  } = useApiResource<Subject[]>(
    "subjects",
    getSubjects,
    EMPTY
  );

  // Editing a subject changes what enrolled students see, so their cached
  // enrollment rows are stale too.
  const invalidateDependents = useCallback(() => {
    invalidate("enrollments:");
  }, []);

  const addSubject = useCallback(
    async (name: string, lecturer: string) => {
      await createSubject(name, lecturer);

      invalidateDependents();
      await refresh();
    },
    [refresh, invalidateDependents]
  );

  const editSubject = useCallback(
    async (id: number, name: string, lecturer: string) => {
      await updateSubject(id, name, lecturer);

      invalidateDependents();
      await refresh();
    },
    [refresh, invalidateDependents]
  );

  const removeSubject = useCallback(
    async (id: number) => {
      await deleteSubject(id);

      invalidateDependents();
      await refresh();
    },
    [refresh, invalidateDependents]
  );

  return {
    subjects,
    loading,
    error,
    refresh,
    addSubject,
    editSubject,
    removeSubject,
  };
}
