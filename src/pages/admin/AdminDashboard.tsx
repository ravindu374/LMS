import AdminLayout from "../../layouts/AdminLayout";

import StatCard from "../../components/cards/StatCard";

import { useSubjectsApi } from "../../hooks/useSubjectsApi";
import { useClassesApi } from "../../hooks/useClassesApi";
import { useQuizzesApi } from "../../hooks/useQuizzesApi";
import { useAnnouncementsApi } from "../../hooks/useAnnouncementsApi";

export default function AdminDashboard() {
  const { subjects } = useSubjectsApi();
  const { classes } = useClassesApi();
  const { quizzes } = useQuizzesApi();
  const { announcements } = useAnnouncementsApi();

  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold mb-6">
        Admin Dashboard
      </h1>

      <div className="grid md:grid-cols-4 gap-6">
        <StatCard
          title="Subjects"
          value={subjects.length}
        />

        <StatCard
          title="Classes"
          value={classes.length}
        />

        <StatCard
          title="Quizzes"
          value={quizzes.length}
        />

        <StatCard
          title="Announcements"
          value={announcements.length}
        />
      </div>
    </AdminLayout>
  );
}