import { useEffect, useState } from "react";

export interface Subject {
  id: number;
  name: string;
  lecturer: string;
}

const STORAGE_KEY = "subjects";

export function useSubjects() {
  const [subjects, setSubjects] = useState<Subject[]>([]);

  useEffect(() => {
    const storedSubjects = localStorage.getItem(STORAGE_KEY);

    if (storedSubjects) {
      setSubjects(JSON.parse(storedSubjects));
    } else {
      const defaultSubjects = [
        {
          id: 1,
          name: "Computer Networks",
          lecturer: "Dr. Silva",
        },
        {
          id: 2,
          name: "Database Systems",
          lecturer: "Dr. Perera",
        },
      ];

      setSubjects(defaultSubjects);

      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(defaultSubjects)
      );
    }
  }, []);

  const saveSubjects = (newSubjects: Subject[]) => {
    setSubjects(newSubjects);

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(newSubjects)
    );
  };

  const addSubject = (
    name: string,
    lecturer: string
  ) => {
    const newSubject: Subject = {
      id: Date.now(),
      name,
      lecturer,
    };

    saveSubjects([...subjects, newSubject]);
  };

  const deleteSubject = (id: number) => {
    saveSubjects(
      subjects.filter((subject) => subject.id !== id)
    );
  };

  const updateSubject = (
    id: number,
    name: string,
    lecturer: string
  ) => {
    const updatedSubjects =
      subjects.map((subject) =>
        subject.id === id
          ? {
              ...subject,
              name,
              lecturer,
            }
          : subject
      );

    saveSubjects(updatedSubjects);
  };

  return {
    subjects,
    addSubject,
    deleteSubject,
    updateSubject,
  };
}