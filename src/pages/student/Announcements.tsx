import StudentLayout from "../../layouts/StudentLayout";
import AnnouncementCard from "../../components/cards/AnnouncementCard";
import DataState from "../../components/ui/DataState";

import { useAuth } from "../../context/AuthContext";
import { useStudentAnnouncements } from "../../hooks/useStudentAnnouncements";

export default function Announcements() {

  const { user } = useAuth();

  const { announcements, loading, error, refresh } =
    useStudentAnnouncements(user?.id || 0);

  return (
    <StudentLayout>

      <div className="mb-10">

        <h1 className="text-4xl font-bold text-slate-800 dark:text-white">
          Announcements
        </h1>

        <p className="mt-2 text-slate-500 dark:text-slate-400">
          Stay updated with the latest course notices and important information.
        </p>

      </div>

      <DataState
        loading={loading}
        error={error}
        isEmpty={announcements.length === 0}
        emptyMessage="New announcements from your lecturers will appear here."
        onRetry={refresh}
        skeletonCount={2}
      >

        <div className="space-y-6">

          {announcements.map((item) => (

            <AnnouncementCard
              key={item.id}
              title={item.title}
              description={item.description}
            />

          ))}

        </div>

      </DataState>

    </StudentLayout>
  );
}