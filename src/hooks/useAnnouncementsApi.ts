import {
  useEffect,
  useState,
} from "react";

import {
  getAnnouncements,
  createAnnouncement,
  deleteAnnouncement,
} from "../services/announcementApi";

export function useAnnouncementsApi() {
  const [
    announcements,
    setAnnouncements,
  ] = useState<any[]>([]);

  const loadAnnouncements =
    async () => {
      const data =
        await getAnnouncements();

      setAnnouncements(data);
    };

  useEffect(() => {
    loadAnnouncements();
  }, []);

  const addAnnouncement =
    async (
      title: string,
      description: string,
      subject_id: number
    ) => {
      await createAnnouncement(
        title,
        description,
        subject_id
      );

      await loadAnnouncements();
    };

  const removeAnnouncement =
    async (id: number) => {
      await deleteAnnouncement(id);

      await loadAnnouncements();
    };

  return {
    announcements,
    addAnnouncement,
    removeAnnouncement,
  };
}