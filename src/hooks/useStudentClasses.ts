import {
  useEffect,
  useState,
} from "react";

import {
  getStudentClasses,
} from "../services/classApi";

export function useStudentClasses(
  userId: number
) {

  const [classes, setClasses] =
    useState<any[]>([]);

  const loadClasses =
    async () => {

      if (!userId) return;

      const data =
        await getStudentClasses(
          userId
        );

      setClasses(
        data.map(
          (item: any) => ({
            id: item.id,
            title: item.title,
            date: item.class_date,
            time: item.class_time,
            zoomLink: item.zoom_link,
            subject_id:
              item.subject_id,
          })
        )
      );
    };

  useEffect(() => {
    loadClasses();
  }, [userId]);

  return {
    classes,
  };
}