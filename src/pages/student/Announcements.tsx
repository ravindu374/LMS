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

      <h1 className="text-3xl font-bold mb-6">
        Announcements
      </h1>

      <div className="space-y-4">

        {announcements.map((item) => (

          <AnnouncementCard
            key={item.id}
            title={item.title}
            description={item.description}
          />

        ))}

      </div>

    </StudentLayout>
  );
}