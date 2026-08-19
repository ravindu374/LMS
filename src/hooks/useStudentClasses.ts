import { useMemo } from "react";

import { getStudentClasses } from "../services/classApi";

import { useApiResource } from "./useApiResource";

export interface StudentClass {
  id: number;
  title: string;
  date: string;
  time: string;
  zoomLink: string;
  subject_id: number;
}

const EMPTY: any[] = [];

export function useStudentClasses(userId: number) {
  const { data, loading, error, refresh } = useApiResource<any[]>(
    userId ? `classes:student:${userId}` : null,
    () => getStudentClasses(userId),
    EMPTY
  );

  // Map the snake_case API shape once per fetch instead of on every render.
  const classes = useMemo<StudentClass[]>(
    () =>
      data.map((item) => ({
        id: item.id,
        title: item.title,
        date: item.class_date,
        time: item.class_time,
        zoomLink: item.zoom_link,
        subject_id: item.subject_id,
      })),
    [data]
  );

  return { classes, loading, error, refresh };
}
