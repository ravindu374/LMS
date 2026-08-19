import { useCallback } from "react";

import {
  getClasses,
  createClass,
  deleteClass,
} from "../services/classApi";

import { invalidate, useApiResource } from "./useApiResource";

const EMPTY: any[] = [];

export function useClassesApi() {
  const {
    data: classes,
    loading,
    error,
    refresh,
  } = useApiResource<any[]>("classes", getClasses, EMPTY);

  const addClass = useCallback(
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

      // Also clears the per-student `classes:student:<id>` entries.
      invalidate("classes");
      await refresh();
    },
    [refresh]
  );

  const removeClass = useCallback(
    async (id: number) => {
      await deleteClass(id);

      invalidate("classes");
      await refresh();
    },
    [refresh]
  );

  return {
    classes,
    loading,
    error,
    addClass,
    removeClass,
  };
}
