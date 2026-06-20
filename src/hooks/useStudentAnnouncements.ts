import {
  useEffect,
  useState,
} from "react";

import {
  getStudentAnnouncements,
} from "../services/announcementApi";

export function useStudentAnnouncements(
  userId: number
) {

  const [
    announcements,
    setAnnouncements,
  ] = useState<any[]>([]);

  const loadAnnouncements =
    async () => {

      if (!userId) return;

      const data =
        await getStudentAnnouncements(
          userId
        );

      setAnnouncements(data);
    };

  useEffect(() => {
    loadAnnouncements();
  }, [userId]);

  return {
    announcements,
  };
}