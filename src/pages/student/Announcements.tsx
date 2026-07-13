import StudentLayout from "../../layouts/StudentLayout";
import AnnouncementCard from "../../components/cards/AnnouncementCard";

import { useAuth } from "../../context/AuthContext";
import { useStudentAnnouncements } from "../../hooks/useStudentAnnouncements";

export default function Announcements() {

  const { user } = useAuth();

  const { announcements } =
    useStudentAnnouncements(
      user?.id || 0
    );

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

      {announcements.length === 0 ? (

        <div
          className="
            rounded-3xl
            border
            border-dashed
            border-slate-300
            dark:border-slate-700
            bg-white
            dark:bg-slate-800
            p-14
            text-center
            shadow-sm
          "
        >

          <h2 className="text-2xl font-semibold text-slate-800 dark:text-white">
            No Announcements
          </h2>

          <p className="mt-3 text-slate-500 dark:text-slate-400">
            New announcements from your lecturers will appear here.
          </p>

        </div>

      ) : (

        <div className="space-y-6">

          {announcements.map((item) => (

            <AnnouncementCard
              key={item.id}
              title={item.title}
              description={item.description}
            />

          ))}

        </div>

      )}

    </StudentLayout>
  );
}