import {
  useEffect,
  useState,
} from "react";

import {
  getClasses,
  createClass,
  deleteClass,
} from "../services/classApi";

export function useClassesApi() {
  const [classes, setClasses] =
    useState<any[]>([]);

  const loadClasses =
    async () => {
      const data =
        await getClasses();

      setClasses(data);
    };

  useEffect(() => {
    loadClasses();
  }, []);

  const addClass =
    async (
      title: string,
      class_date: string,
      class_time: string,
      zoom_link: string,
      subject_id: number
    ) => {

      await createClass(
        title,
        class_date,
        class_time,
        zoom_link,
        subject_id
      );
          await loadClasses();
  };
  const removeClass =
    async (id: number) => {
      await deleteClass(id);

      await loadClasses();
    };

  return {
    classes,
    addClass,
    removeClass,
  };
    }