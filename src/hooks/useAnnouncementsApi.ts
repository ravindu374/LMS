import { useCallback } from "react";

import {
  getAnnouncements,
  createAnnouncement,
  deleteAnnouncement,
} from "../services/announcementApi";

import { invalidate, useApiResource } from "./useApiResource";

const EMPTY: any[] = [];

export function useAnnouncementsApi() {
  const {
    data: announcements,
    loading,
    error,
    refresh,
  } = useApiResource<any[]>(
    "announcements",
    getAnnouncements,
    EMPTY
  );

  const addAnnouncement = useCallback(
    async (
      title: string,
      description: string,
      subject_id: number
    ) => {
      await createAnnouncement(title, description, subject_id);

      invalidate("announcements");
      await refresh();
    },
    [refresh]
  );

  const removeAnnouncement = useCallback(
    async (id: number) => {
      await deleteAnnouncement(id);

      invalidate("announcements");
      await refresh();
    },
    [refresh]
  );

  return {
    announcements,
    loading,
    error,
    addAnnouncement,
    removeAnnouncement,
  };
}
