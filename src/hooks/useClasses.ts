import { useEffect, useState } from "react";

export interface ClassSession {
  id: number;
  title: string;
  date: string;
  time: string;
  zoomLink: string;
}

const STORAGE_KEY = "classes";

export function useClasses() {
  const [classes, setClasses] = useState<ClassSession[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);

    if (stored) {
      setClasses(JSON.parse(stored));
    } else {
      const initialData = [
        {
          id: 1,
          title: "Computer Networks",
          date: "2026-06-25",
          time: "10:00",
          zoomLink: "https://zoom.us",
        },
      ];

      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(initialData)
      );

      setClasses(initialData);
    }
  }, []);

  const save = (data: ClassSession[]) => {
    setClasses(data);

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(data)
    );
  };

  const addClass = (
    title: string,
    date: string,
    time: string,
    zoomLink: string
  ) => {
    const newClass: ClassSession = {
      id: Date.now(),
      title,
      date,
      time,
      zoomLink,
    };

    save([...classes, newClass]);
  };

  const deleteClass = (id: number) => {
    save(
      classes.filter(
        (item) => item.id !== id
      )
    );
  };

  return {
    classes,
    addClass,
    deleteClass,
  };
}