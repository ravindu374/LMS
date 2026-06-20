import {
  useEffect,
  useState,
} from "react";

import {
  getSubjects,
  createSubject,
  updateSubject,
  deleteSubject,
} from "../services/subjectApi";

export interface Subject {
  id: number;
  name: string;
  lecturer: string;
}

export function useSubjectsApi() {
  const [subjects, setSubjects] =
    useState<Subject[]>([]);

  const loadSubjects =
    async () => {
      const data =
        await getSubjects();

      setSubjects(data);
    };

  useEffect(() => {
    loadSubjects();
  }, []);

  const addSubject =
    async (
      name: string,
      lecturer: string
    ) => {
      await createSubject(
        name,
        lecturer
      );

      await loadSubjects();
    };

  const editSubject =
    async (
      id: number,
      name: string,
      lecturer: string
    ) => {
      await updateSubject(
        id,
        name,
        lecturer
      );

      await loadSubjects();
    };

  const removeSubject =
    async (id: number) => {
      await deleteSubject(id);

      await loadSubjects();
    };

  return {
    subjects,
    addSubject,
    editSubject,
    removeSubject,
  };
}