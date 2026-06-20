import { useEffect, useState } from "react";

export interface Announcement {
  id: number;
  title: string;
  description: string;
}

const STORAGE_KEY = "announcements";

export function useAnnouncements() {
  const [announcements, setAnnouncements] =
    useState<Announcement[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(
      STORAGE_KEY
    );

    if (stored) {
      setAnnouncements(
        JSON.parse(stored)
      );
    }
  }, []);

  const save = (
    data: Announcement[]
  ) => {
    setAnnouncements(data);

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(data)
    );
  };

  const addAnnouncement = (
    title: string,
    description: string
  ) => {
    save([
      ...announcements,
      {
        id: Date.now(),
        title,
        description,
      },
    ]);
  };

  const deleteAnnouncement = (
    id: number
  ) => {
    save(
      announcements.filter(
        (item) => item.id !== id
      )
    );
  };

  return {
    announcements,
    addAnnouncement,
    deleteAnnouncement,
  };
}