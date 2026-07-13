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

      <div className="mb-10">

        <h1 className="text-4xl font-bold text-slate-800 dark:text-white">
          Welcome, Admin 👋
        </h1>

        <p className="mt-3 text-slate-500 dark:text-slate-400">
          Monitor your learning platform and manage courses, users and learning resources.
        </p>

      </div>

      {/* Statistics */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">

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

      {/* Platform Summary */}

      <div
        className="
          mt-10
          rounded-3xl
          border
          border-slate-200
          dark:border-slate-700
          bg-white
          dark:bg-slate-800
          shadow-sm
          p-8
        "
      >

        <h2 className="text-2xl font-bold text-slate-800 dark:text-white">
          Platform Summary
        </h2>

        <p className="mt-2 text-slate-500 dark:text-slate-400">
          A quick overview of the current learning platform.
        </p>

        <div className="grid md:grid-cols-2 gap-8 mt-8">

          <div
            className="
              rounded-2xl
              bg-blue-50
              dark:bg-blue-900/20
              p-6
            "
          >

            <p className="text-sm uppercase tracking-wide text-blue-600 dark:text-blue-300">
              Total Learning Resources
            </p>

            <h3 className="mt-3 text-5xl font-bold text-slate-800 dark:text-white">
              {classes.length + quizzes.length + announcements.length}
            </h3>

          </div>

          <div
            className="
              rounded-2xl
              bg-emerald-50
              dark:bg-emerald-900/20
              p-6
            "
          >

            <p className="text-sm uppercase tracking-wide text-emerald-600 dark:text-emerald-300">
              Active Subjects
            </p>

            <h3 className="mt-3 text-5xl font-bold text-slate-800 dark:text-white">
              {subjects.length}
            </h3>

          </div>

        </div>

      </div>

    </AdminLayout>
  );
}