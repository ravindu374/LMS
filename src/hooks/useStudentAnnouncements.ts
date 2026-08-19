import { getStudentAnnouncements } from "../services/announcementApi";

import { useApiResource } from "./useApiResource";

const EMPTY: any[] = [];

export function useStudentAnnouncements(userId: number) {
  const {
    data: announcements,
    loading,
    error,
    refresh,
  } = useApiResource<any[]>(
    userId ? `announcements:student:${userId}` : null,
    () => getStudentAnnouncements(userId),
    EMPTY
  );

  return { announcements, loading, error, refresh };
}
